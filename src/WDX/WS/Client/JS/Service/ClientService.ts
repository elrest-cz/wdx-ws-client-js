/**
 * eDesign - Runtime - Web Socket Server Package
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */

'use strict';

import {DataService} from './DataService';
import {ScriptService} from './ScriptService';
import {InstanceService} from './InstanceService';
import {RuntimeService} from './RuntimeService';
import {AlarmService} from './AlarmService';
import {Configuration} from '../Configuration/Configuration';
import * as WDXWS from 'websocket';
import http = require('http');
import * as WDXSchema from '@wago/wdx-schema';
import {BehaviorSubject, Subject} from 'rxjs';
import {TrendService} from './TrendService';

/**
 * @todo Multiple connect create isolated subscription on status,
 */
export enum Status {
  CONNECTED = 'CONNECTED',
  CONNECTING = 'CONNECTING',
  DISCONNECTED = 'DISCONNECTED',
}
export class ClientService {
  private __keepAliveTimeout: NodeJS.Timeout|undefined;

  private readonly __KEEPALIVE_INTERVAL: number = 60000;

  private readonly __RECONNECT_TIMEOUT: number = 1000;

  private readonly __status: BehaviorSubject<Status> =
      new BehaviorSubject<Status>(Status.DISCONNECTED);

  private __wsClientConfiguration: Configuration;

  private __wsClient: WDXWS.client|undefined;

  private __connection: WDXWS.connection|undefined;

  private __dataService: DataService;

  private __scriptService: ScriptService;

  private __instanceService: InstanceService;

  private __runtimeService: RuntimeService;

  private __alarmService: AlarmService;

  private __trendService: TrendService;

  private __incommingMessages:
      Subject<WDXSchema.WDX.Schema.Message.AbstractMessage> =
          new Subject<WDXSchema.WDX.Schema.Message.AbstractMessage>();

  constructor(
      wsClientConfiguration: Configuration,
  ) {
    this.__wsClientConfiguration = wsClientConfiguration;
  }

  public async connect(): Promise<void> {
    return new Promise<void>(
        (resolve, reject) => {
          try {
            if (Status.CONNECTED === this.status.getValue()) {
              resolve();
              return;
            } else if (Status.CONNECTING === this.status.getValue()) {
              this.status.subscribe(
                  {
                    next: (status: Status) => {
                      if (Status.CONNECTED === status) {
                        resolve();
                      } else if (Status.DISCONNECTED === status) {
                        reject('Not connected');
                      }
                    },
                    error: (error: any) => {
                      reject(error);
                    }
                  },
              );
              return;
            }

            this.__status.next(Status.CONNECTING);

            this.__wsClient = new WDXWS.client();
            this.__wsClient.on(
                'connect',
                (connection: WDXWS.connection) => {
                  this.__onOpen(connection);
                  resolve();
                },
            );

            this.__wsClient.on(
                'connectFailed',
                (error: any) => {
                  this.__onError(error);
                  reject(error);
                },
            );

            this.__wsClient.connect(this.__getWsClientUrl());

          } catch (error) {
            reject(error);
          }
        },
    );
  }

  private __getWsClientUrl(): string {
    return (this.__wsClientConfiguration?.url) ?
        this.__wsClientConfiguration?.url :
        `${this.__wsClientConfiguration?.protocol}://${
            this.__wsClientConfiguration?.host}:${
            this.__wsClientConfiguration?.port}${
            this.__wsClientConfiguration?.path ?? ''}`;
  }

  private async __sendKeepAlive() {
    await this.sendMessage(new WDXSchema.WDX.Schema.Message.KeepAlive());
  }

  private __startKeepAlive() {
    if (undefined === this.__keepAliveTimeout) {
      this.__keepAliveTimeout = setInterval(
          async () => {
            await this.__sendKeepAlive();
          },
          this.__KEEPALIVE_INTERVAL,
      );

      this.__keepAliveTimeout.unref();
    }
  }

  private __stopKeepAlive() {
    if (undefined !== this.__keepAliveTimeout) {
      clearTimeout(this.__keepAliveTimeout);
      this.__keepAliveTimeout = undefined;
    }
  }

  private __onOpen(connection: WDXWS.connection): void {
    this.__connection = connection;
    this.__connection.on('error', (error) => {});

    this.__connection.on(
        'close',
        (code: number, desc: string) => {
          this.__status.next(Status.DISCONNECTED);
          this.__stopKeepAlive();
          if (1000 !== code) {
            this.__reconnect();
          }
        },
    );

    this.__connection.on(
        'message',
        (message: WDXWS.Message) => {
          this.__onMessage(message);
        },
    );

    this.__status.next(Status.CONNECTED);

    this.__startKeepAlive();
  }



  private __reconnect(): void {
    console.error(`Reconnecting after ${this.__RECONNECT_TIMEOUT}ms`);

    setTimeout(
        async () => {
          try {
            await this.connect();
          } catch (error: any) {
            this.__reconnect();
          }
        },
        this.__wsClientConfiguration?.reconnectTimeout ??
            this.__RECONNECT_TIMEOUT,
    );
  }

  private __onError(error: any) {
    this.__status.next(Status.DISCONNECTED);
    console.error('Client error ' + error.message);
  }

  private __onMessage(message: WDXWS.Message): void {
    this.__incommingMessages.next(
        JSON.parse((message as WDXWS.IUtf8Message).utf8Data),
    );
  }

  public async sendMessage(
      message: WDXSchema.WDX.Schema.Message.AbstractMessage,
      ): Promise<void> {
    return new Promise<void>(
        (resolve, reject) => {
          try {
            const data: string = JSON.stringify(message);
            console.log(data);
            this.__connection?.send(
                data,
                () => {
                  resolve();
                },
            );

          } catch (err) {
            reject();
          }
        },
    );
  }

  public async disconnect() {
    this.__connection?.close();
    this.__connection = undefined;
    this.__wsClient = undefined;
  }

  public get status(): BehaviorSubject<Status> {
    return this.__status;
  }

  public get incommingMessages():
      Subject<WDXSchema.WDX.Schema.Message.AbstractMessage> {
    return this.__incommingMessages;
  }

  public get alarmService(): AlarmService {
    if (undefined === this.__alarmService) {
      this.__alarmService = new AlarmService(this);
    }
    return this.__alarmService;
  }

  public get trendService(): TrendService {
    if (undefined === this.__trendService) {
      this.__trendService = new TrendService(this);
    }
    return this.__trendService;
  }

  public get dataService(): DataService {
    if (undefined === this.__dataService) {
      this.__dataService = new DataService(this);
    }
    return this.__dataService;
  }

  public get scriptService(): ScriptService {
    if (undefined === this.__scriptService) {
      this.__scriptService = new ScriptService(this);
    }
    return this.__scriptService;
  }

  public get instanceService(): InstanceService {
    if (undefined === this.__instanceService) {
      this.__instanceService = new InstanceService(this);
    }
    return this.__instanceService;
  }

  public get runtimeService(): RuntimeService {
    if (undefined === this.__runtimeService) {
      this.__runtimeService = new RuntimeService(this);
    }
    return this.__runtimeService;
  }
}