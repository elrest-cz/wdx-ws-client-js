/**
 * eDesign - Runtime - Web Socket Server Package
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */

'use strict';

import {DataService} from './DataService';
import {ScriptService} from './ScriptService';
import {InstanceService} from './InstanceService';
import {Configuration} from '../Configuration/Configuration';
import * as WDXWS from 'websocket';
import http = require('http');
import * as WDXSchema from '@wago/wdx-schema';
import {Subject} from 'rxjs';

export class ClientService {
  private __wsClient: WDXWS.client|undefined;

  private __connection: WDXWS.connection|undefined;

  private __dataService: DataService;

  private __scriptService: ScriptService;

  private __instanceService: InstanceService;

  private __incommingMessages:
      Subject<WDXSchema.WDX.Schema.Message.AbstractMessage> =
          new Subject<WDXSchema.WDX.Schema.Message.AbstractMessage>();

  public async connect(
      configuration: Configuration,
      ): Promise<void> {
    return new Promise<void>(
        (resolve, reject) => {
          try {
            //console.debug('ClientService.connect');

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

            const url: string =
                `${configuration.protocol}://${configuration.host}:${
                    configuration.port}${configuration.path ?? ''}`;

            //console.debug('ClientService.connect.url', url);

            this.__wsClient.connect(url);

          } catch (error) {
            reject(error);
          }
        },
    );
  }

  private __onOpen(connection: WDXWS.connection): void {
    //console.debug('ClientService.__onOpen');
    this.__connection = connection;

    this.__connection.on('error', (error) => {
      console.log('Connection Error: ' + error.toString());
    });

    this.__connection.on('close', () => {
      console.log('echo-protocol Connection Closed');
    });

    this.__connection.on('message', (message: WDXWS.Message) => {
      this.__onMessage(message);
    });
  }

  private __onError(error: any) {
    console.error(
        'ClientService.__onError',
        error.toString(),
    );
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
    console.debug(
        'ClientService.disconnect',
        {},
    );

    this.__connection?.close();
    this.__connection = undefined;
    this.__wsClient = undefined;
  }

  public get incommingMessages():
      Subject<WDXSchema.WDX.Schema.Message.AbstractMessage> {
    return this.__incommingMessages;
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
}