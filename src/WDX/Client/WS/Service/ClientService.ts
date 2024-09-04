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

export enum Status {
  CONNECTED = 'CONNECTED',
  CONNECTING = 'CONNECTING',
  DISCONNECTED = 'DISCONNECTED',
}
export class ClientService {
  private __debug: boolean;

  private readonly __RECONNECT_TIMEOUT: number = 5000;

  private readonly __status: BehaviorSubject<Status> =
      new BehaviorSubject<Status>(Status.DISCONNECTED);

  private __wsClientConfiguration?: Configuration;

  private __wsClient: WDXWS.client|undefined;

  private __connection: WDXWS.connection|undefined;

  private __dataService: DataService;

  private __scriptService: ScriptService;

  private __instanceService: InstanceService;

  private __runtimeService: RuntimeService;

  private __alarmService: AlarmService;

  private __incommingMessages:
      Subject<WDXSchema.WDX.Schema.Message.AbstractMessage> =
          new Subject<WDXSchema.WDX.Schema.Message.AbstractMessage>();

  constructor(debug: boolean = false) {
    this.__debug = debug;
  }

  public async connect(
      configuration: Configuration,
      ): Promise<void> {
    return new Promise<void>(
        (resolve, reject) => {
          try {
            this.__status.next(Status.CONNECTING);
            this.__wsClientConfiguration = configuration;
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
    return `${this.__wsClientConfiguration?.protocol}://${
        this.__wsClientConfiguration?.host}:${
        this.__wsClientConfiguration?.port}${
        this.__wsClientConfiguration?.path ?? ''}`;
  }

  private __onOpen(connection: WDXWS.connection): void {
    this.__connection = connection;
    this.__connection.on('error', (error) => {});

    this.__connection.on(
        'close',
        (code: number, desc: string) => {
          console.error(
              `Connection Closed - Code: ${code} - Description: ${desc}`,
              this.__connection?.state,
          );

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
  }

  private __reconnect(): void {
    console.error(`Reconnecting after ${this.__RECONNECT_TIMEOUT}ms`);

    setTimeout(
        async () => {
          try {
            if (undefined !== this.__wsClientConfiguration) {
              await this.connect(this.__wsClientConfiguration);
            } else {
              throw 'Client configuration is missing';
            }
          } catch (error: any) {
            this.__reconnect();
          }
        },
        this.__RECONNECT_TIMEOUT,
    );
  }

  private __onError(error: any) {
    console.error('Client error ' + error.message);
  }

  private __onMessage(message: WDXWS.Message): void {
    this.__incommingMessages.next(
        JSON.parse((message as WDXWS.IUtf8Message).utf8Data));
  }

  public async sendMessage(
      message: WDXSchema.WDX.Schema.Message.AbstractMessage,
      ): Promise<void> {
    return new Promise<void>(
        (resolve, reject) => {
          try {
            const data: string = JSON.stringify(message);

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
    this.status.next(Status.DISCONNECTED);
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