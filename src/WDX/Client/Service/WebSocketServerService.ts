/**
 * Elrest eDesign Runtime Library Messages Model Instance Application Module Web
 * Socket Server Application Controller
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */
'use strict';

import * as WDXSchema from '@wago/wdx-schema';
import * as WDXRuntime from '@wago/wdx-runtime';
import * as WDXWSS from '..';
import {Subscription} from 'rxjs';
import {WebSocketServer, ServerOptions} from 'ws';
import {WebSocket, RawData} from 'ws';
import {ClientRequest, IncomingMessage} from 'http';

class WebSocketServerService extends
    WDXRuntime.WDX.Runtime.Service.SingletonService<WebSocketServerService>() {
  private __onInstanceModelChangedSubscription: Subscription|undefined;

  private __webSocketServerOptions?:
      WDXSchema.WDX.Schema.Model.Instance.WebSocketServerOptions;

  private __webSocketServer: WebSocketServer|undefined;

  private __webSocketClients: Map<string, WebSocket> =
      new Map<string, WebSocket>();

  private readonly __DEFAULT_WEBSOCKET_SERVER_HOST: string = '0.0.0.0';

  private readonly __DEFAULT_WEBSOCKET_SERVER_PORT: number = 82;

  constructor() {
    super();

    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.constructor',
    );
    /*! END_REMOVE */

    WDXRuntime.WDX.Runtime.Service.ProcessSignalService.setStopHandler(
        this.__onProcessSIGUSR2.bind(this),
    );
  }


  protected getWebSocketHandlers():
      WDXWSS.WebSocketMessageHandler.IWebSocketMessageHandler[] {
    return [
      WDXWSS.WebSocketMessageHandler.DataDeleteSchemaRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.DataGetSchemaRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.DataGetValueRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.DataRefreshSchemaRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.DataRegisterRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler
          .DataRegisterSchemaChangesRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.DataSetSchemaRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.DataSetValueRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.DataUnregisterRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler
          .DataUnregisterSchemaChangesRequestMessageHandler,

      WDXWSS.WebSocketMessageHandler.InstanceDeleteRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.InstanceInfoRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.InstanceListRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.InstanceLogSubscribeRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler
          .InstanceLogUnsubscribeRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler
          .InstanceMonitorSubscribeRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler
          .InstanceMonitorUnsubscribeRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.InstanceRestartRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.InstanceSaveRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.InstanceStartRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.InstanceStopRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.InstanceWhoIsRequestMessageHandler,

      WDXWSS.WebSocketMessageHandler.PackageInstallRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.PackageUninstallRequestMessageHandler,

      WDXWSS.WebSocketMessageHandler.RuntimeInfoRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler
          .RuntimeMonitorSubscribeRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler
          .RuntimeMonitorUnsubscribeRequestMessageHandler,

      WDXWSS.WebSocketMessageHandler.ScriptBrowseRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.ScriptDeleteRequestMessageHandler,
      WDXWSS.WebSocketMessageHandler.ScriptSaveRequestMessageHandler,
    ];
  }


  private async __onProcessSIGUSR2(
      code: number,
      ): Promise<number> {
    return new Promise<number>(
        async (resolve, reject) => {
          try {
            /*! START_REMOVE */
            WDXRuntime.WDX.Runtime.Service.LogService.debug(
                'WebSocketServerService.__onProcessSIGUSR2',
                {code: code},
            );
            /*! END_REMOVE */

            await this.stop();

            /*! START_REMOVE */
            WDXRuntime.WDX.Runtime.Service.LogService.debug(
                'WebSocketServerService.__onProcessSIGUSR2.done',
                {code: code},
            );
            /*! END_REMOVE */

            resolve(0);
          } catch (e: any) {
            WDXRuntime.WDX.Runtime.Service.LogService.error(
                'WebSocketServerService.__onProcessSIGUSR2.error',
                {
                  error: e,
                  code: code,
                },
            );

            reject(e);
          }
        },
    );
  }

  public async start(): Promise<WebSocketServer> {
    return new Promise<WebSocketServer>(
        (resolve, reject) => {
          try {
            /*! START_REMOVE */
            WDXRuntime.WDX.Runtime.Service.LogService.debug(
                'WebSocketServerService.start',
                this.__webSocketServerOptions,
            );
            /*! END_REMOVE */

            if (undefined !== this.__webSocketServer) {
              /*! START_REMOVE */
              WDXRuntime.WDX.Runtime.Service.LogService.debug(
                  'WebSocketServerService.start.already-running',
              );
              /*! END_REMOVE */

              resolve(this.__webSocketServer);
            }

            const model:
                WDXSchema.WDX.Schema.Model.Instance.WebSocketServerInstance =
                WDXRuntime.WDX.Runtime.Service.InstanceService.model
                    .getValue() as
                WDXSchema.WDX.Schema.Model.Instance.WebSocketServerInstance;

            this.__webSocketServerOptions = model.webSocketServerOptions;

            if (undefined === this.__webSocketServerOptions) {
              this.__webSocketServerOptions = {};
            }

            if (undefined === model.webSocketServerOptions.port) {
              this.__webSocketServerOptions.port =
                  this.__DEFAULT_WEBSOCKET_SERVER_PORT
            }

            if (undefined === model.webSocketServerOptions.host) {
              this.__webSocketServerOptions.host =
                  this.__DEFAULT_WEBSOCKET_SERVER_HOST
            }

            this.__webSocketServer = new WebSocketServer(
                this.__webSocketServerOptions as ServerOptions,
                () => {
                  /*! START_REMOVE */
                  WDXRuntime.WDX.Runtime.Service.LogService.debug(
                      'WebSocketServerService.start.callback',
                  );
                  /*! END_REMOVE */

                  this.__webSocketServer?.on(
                      'connection',
                      (
                          socket: WebSocket,
                          request: IncomingMessage,
                          ) => {
                        this.__onWebSocketServerConnection(
                            socket,
                            request,
                        );
                      },
                  );

                  this.__webSocketServer?.on(
                      'error',
                      (server: any, error: Error) => {
                        this.__onWebSocketServerServerError(error);
                      },
                  );

                  this.__webSocketServer?.on(
                      'headers',
                      (server: any, headers: string[], request: any) => {
                        this.__onWebSocketServerServerHeaders(headers, request);
                      },
                  );

                  this.__webSocketServer?.on(
                      'close',
                      (server: any) => {
                        this.__onWebSocketServerServerClose();
                      },
                  );

                  this.__webSocketServer?.on(
                      'listening',
                      (server: any) => {
                        this.__onWebSocketServerListening(server);
                        resolve(server);
                      },
                  );
                },
            );

          } catch (error: any) {
            WDXRuntime.WDX.Runtime.Service.LogService.error(
                'WebSocketServerService.start.error',
                error,
            );
            reject(error);
          }
        },
    );
  }

  public async restart() {
    await this.stop();
    return await this.start();
  }

  public async stop(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        /*! START_REMOVE */
        WDXRuntime.WDX.Runtime.Service.LogService.debug(
            'WebSocketServerService.stop',
        );
        /*! END_REMOVE */

        if (undefined === this.__webSocketServer) {
          /*! START_REMOVE */
          WDXRuntime.WDX.Runtime.Service.LogService.debug(
              'WebSocketServerService.stop.already-stopped',
          );
          /*! END_REMOVE */


          resolve();
        } else {
          /*! START_REMOVE */
          WDXRuntime.WDX.Runtime.Service.LogService.debug(
              'WebSocketServerService.stop.stopping',
          );
          /*! END_REMOVE */

          for (var item of Array.from(
                   this.__webSocketServer.clients.values())) {
            item.terminate();
            item.close();
          }

          this.__webSocketServer?.close(
              (err?: Error) => {
                if (err) {
                  reject(err);

                } else {
                  /*! START_REMOVE */
                  WDXRuntime.WDX.Runtime.Service.LogService.debug(
                      'WebSocketServerService.stop.stopped',
                  );
                  /*! END_REMOVE */

                  resolve();
                }
              },
          );
        }
      } catch (error) {
        WDXRuntime.WDX.Runtime.Service.LogService.error(
            'WebSocketServerService.stop.error',
            {
              error: error,
            },
        );

        reject(error);
      }
    });
  }

  private __onWebSocketServerConnection(
      socket: WebSocket,
      request: IncomingMessage,
      ): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.__onWebSocketServerConnection',
        this.__webSocketServer?.clients.keys(),
        // request,
    );
    /*! END_REMOVE */

    const webSocketKey: string|undefined = request.headers['sec-websocket-key'];

    if (undefined === webSocketKey) {
      WDXRuntime.WDX.Runtime.Service.LogService.error(
          'WebSocketServerService.__onWebSocketServerConnection.error',
          'Request web socket key is undefined',
      );
      return;
    }

    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.__onWebSocketServerConnection.webSocketKey',
        webSocketKey,
    );
    /*! END_REMOVE */

    this.__webSocketClients.set(webSocketKey, socket);

    socket.on(
        'close',
        (
            socket: WebSocket,
            code: number,
            reason: Buffer,
            ) => {
          this.__onWebSocketClientClose(
              webSocketKey,
              code,
              reason,
          );
        },
    );
    socket.on(
        'error',
        (
            socket: WebSocket,
            err: Error,
            ) => {
          this.__onWebSocketClientError(
              webSocketKey,
              err,
          );
        },
    );
    socket.on(
        'upgrade',
        (
            socket: WebSocket,
            request: IncomingMessage,
            ) => {
          this.__onWebSocketClientUpgrade(
              webSocketKey,
              request,
          );
        },
    );

    socket.on(
        'message',
        (
            data: RawData,
            isBinary: boolean,
            ) => {
          this.__onWebSocketClientMessage(
              webSocketKey,
              data,
              isBinary,
          );
        },
    );

    socket.on(
        'open',
        (
            socket: WebSocket,
            ) => {
          this.__onWebSocketOpen(
              webSocketKey,
          );
        },
    );

    socket.on(
        'ping',
        (
            socket: WebSocket,
            data: Buffer,
            ) => {
          this.__onWebSocketClientPing(
              webSocketKey,
              data,
          );
        },
    );
    socket.on(
        'pong',
        (
            socket: WebSocket,
            data: Buffer,
            ) => {
          this.__onWebSocketClientPong(
              webSocketKey,
              data,
          );
        },
    );

    socket.on(
        'unexpected-response',
        (
            socket: WebSocket,
            request: ClientRequest,
            response: IncomingMessage,
            ) => {
          this.__onWebSocketClientUnexpetedResponse(
              webSocketKey,
              request,
              response,
          );
        },
    );
  }

  private __onWebSocketClientUnexpetedResponse(
      webSocketKey: string,
      request: ClientRequest,
      response: IncomingMessage,
      ): void {
    WDXRuntime.WDX.Runtime.Service.LogService.error(
        'WebSocketServerService.__onWebSocketClientUnexpetedResponse',
        webSocketKey,
        request,
        response,
    );
  }

  private __onWebSocketClientPong(
      webSocketKey: string,
      data: Buffer,
      ): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.__onWebSocketClientPong',
        webSocketKey,
        data,
    );
    /*! END_REMOVE */
  }

  private __onWebSocketClientPing(
      webSocketKey: string,
      data: Buffer,
      ): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.__onWebSocketClientPing',
        {
          webSocketKey: webSocketKey,
          data: data,
        },
    );
    /*! END_REMOVE */
  }

  private __onWebSocketOpen(
      webSocketKey: string,
      ): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.__onWebSocketOpen',
        {
          webSocketKey: webSocketKey,
        },
    );
    /*! END_REMOVE */
  }

  private async __onWebSocketClientMessage(
      webSocketKey: string,
      data: RawData,
      isBinary: boolean,
      ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        /*! START_REMOVE */
        WDXRuntime.WDX.Runtime.Service.LogService.debug(
            'WebSocketServerService.__onWebSocketClientMessage',
            {
              webSocketKey: webSocketKey,
              isBinary: isBinary,
            },
        );
        /*! END_REMOVE */

        const message: WDXSchema.WDX.Schema.Message.AbstractMessage =
            JSON.parse(
                data.toString(),
            );

        const webSocket: WebSocket|undefined =
            this.__webSocketClients.get(webSocketKey);

        if (undefined === webSocket) {
          throw 'WebSocket client is undefined';
        }

        WDXWSS.Service.WebSocketServerTopicService.register(
            message.topic ?? message.uuid,
            webSocketKey,
        );

        for (let i = 0; i < this.getWebSocketHandlers().length; i++) {
          if (this.getWebSocketHandlers()[i].type === message.type) {
            /*! START_REMOVE */
            WDXRuntime.WDX.Runtime.Service.LogService.debug(
                'WebSocketServerService.__onWebSocketClientMessage.handler',
                {
                  messageUuid: message.uuid,
                  messageType: message.type,
                  messageTopic: message.topic,
                  webSocketKey: webSocketKey,
                  handlersCount: this.getWebSocketHandlers().length,
                  handlerId: i,
                },
            );
            /*! END_REMOVE */


            try {
              await this.getWebSocketHandlers()[i].handleMessage(
                  message,
                  webSocketKey,
              );

            } catch (err) {
              WDXRuntime.WDX.Runtime.Service.LogService.error(
                  'WebSocketServerService.__onWebSocketClientMessage.handler.error',
                  {
                    messageUuid: message.uuid,
                    messageType: message.type,
                    messageTopic: message.topic,
                    webSocketKey: webSocketKey,
                    handlersCount: this.getWebSocketHandlers().length,
                    handlerId: i,
                    error: err,
                  },
              );
            }
          }
        }

        /*! START_REMOVE */
        WDXRuntime.WDX.Runtime.Service.LogService.debug(
            'WebSocketServerService.__onWebSocketClientMessage.done',
            {
              webSocketKey: webSocketKey,
              isBinary: isBinary,
            },
        );
        /*! END_REMOVE */

        resolve();

      } catch (error: any) {
        WDXRuntime.WDX.Runtime.Service.LogService.error(
            'WebSocketServerService.__onWebSocketClientMessage.error',
            {
              webSocketKey: webSocketKey,
              isBinary: isBinary,
              error: error,
            },
        );

        reject(error);
      }
    });
  }

  private __onWebSocketClientUpgrade(
      webSocketKey: string,
      request: IncomingMessage,
      ): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.__onWebSocketClientUpgrade',
        {
          webSocketKey: webSocketKey,
          request: request,
        },
    );
    /*! END_REMOVE */
  }

  private __onWebSocketClientError(
      webSocketKey: string,
      err: Error,
      ): void {
    WDXRuntime.WDX.Runtime.Service.LogService.error(
        'WebSocketServerService.__onWebSocketClientError', {
          webSocketKey: webSocketKey,
          error: err,
        });
  }

  private __onWebSocketClientClose(
      webSocketKey: string,
      code: number,
      reason: Buffer,
      ): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.__onWebSocketClientClose',
        webSocketKey,
        code,
        reason,
    );
    /*! END_REMOVE */

    this.__webSocketClients.delete(webSocketKey);
  }

  private __onWebSocketServerServerError(
      error: any,
      ): void {
    WDXRuntime.WDX.Runtime.Service.LogService.error(
        'WebSocketServerService.__onWebSocketServerServerError',
        {
          error: error,
        },
    );
  }

  private __onWebSocketServerServerHeaders(
      headers: string[],
      request: any,
      ): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.__onWebSocketServerServerHeaders',
        // headers,
    );
    /*! END_REMOVE */
  }

  private __onWebSocketServerServerClose(): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.__onWebSocketServerServerClose',
    );
    /*! END_REMOVE */
  }

  private __onWebSocketServerListening(server: any): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerService.__onWebSocketServerListening',
        this.__webSocketServer?.address(),
    );
    /*! END_REMOVE */
  }

  public async sendMessage(
      message: WDXSchema.WDX.Schema.Message.AbstractMessage,
      wsClientKey: string,
      ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        /*! START_REMOVE */
        WDXRuntime.WDX.Runtime.Service.LogService.debug(
            'WebSocketServerService.sendMessage',
            {
              wsClientKey: wsClientKey,
              messageType: message.type,
              messageUuid: message.uuid,
            },
        );
        /*! END_REMOVE */

        const client: WebSocket|undefined =
            this.__webSocketClients.get(wsClientKey);

        if (undefined === client) {
          throw `Client '${wsClientKey}' not found`;
        }

        const messageData: string = JSON.stringify(message);

        client.send(
            messageData,
            (err: any) => {
              if (undefined !== err) {
                reject(err);
              } else {
                resolve();
              }
            },
        );

      } catch (error: any) {
        WDXRuntime.WDX.Runtime.Service.LogService.error(
            'WebSocketServerService.sendMessage.error',
            {
              error: error,
              messageType: message.type,
              messageUuid: message.uuid,
            },
        );

        reject(error);
      }
    });
  }
}

export const Singleton = WebSocketServerService.getSingleton();