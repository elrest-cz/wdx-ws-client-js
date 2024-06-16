/**
 * Elrest eDesign - Runtime - Library- Handler - Abstract Handler
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */
'use strict';

import * as WDXSchema from '@wago/wdx-schema';
import * as WDXRuntime from '@wago/wdx-runtime';
import * as WDXWSS from '..';

export class DataGetValueRequestMessageHandler extends
    WDXRuntime.WDX.Runtime.Service
        .SingletonService<DataGetValueRequestMessageHandler>()
        implements WDXWSS.WebSocketMessageHandler.IWebSocketMessageHandler {
  type: WDXSchema.WDX.Schema.Message.Type =
      WDXSchema.WDX.Schema.Message.Type.DataGetValueRequest;

  public async handleMessage(
      message: WDXSchema.WDX.Schema.Message.Data.GetValueRequest,
      webSocketKey: string,
  ) {
    try {
      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'DataGetValueRequestMessageHandler.handleMessage',
          {
            webSocketKey: webSocketKey,
            messageType: message.type,
            messageUuid: message.uuid,
          },
      );
      /*! END_REMOVE */

      message.target = WDXSchema.WDX.Schema.Model.Instance.Type.Data;
      await WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(message);

      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'DataGetValueRequestMessageHandler.handleMessage.done',
          {
            webSocketKey: webSocketKey,
            messageType: message.type,
            messageUuid: message.uuid,
          },
      );
      /*! END_REMOVE */

    } catch (error: any) {
      WDXRuntime.WDX.Runtime.Service.LogService.error(
          'DataGetValueRequestMessageHandler.handleMessage.error',
          {
            webSocketKey: webSocketKey,
            messageType: message.type,
            messageUuid: message.uuid,
            error: error.toString(),
          },
      );

      const instance:
          WDXSchema.WDX.Schema.Model.Instance.WebSocketServerInstance =
          WDXRuntime.WDX.Runtime.Service.InstanceService.model.getValue() as
          WDXSchema.WDX.Schema.Model.Instance.WebSocketServerInstance;

      const response: WDXSchema.WDX.Schema.Message.Data.GetValueResponse =
          new WDXSchema.WDX.Schema.Message.Data.GetValueResponse(
              undefined,
              message.uuid,
              error,
              message.topic,
              instance,
          );

      await WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(response);
    }
  }
}

export const Singleton = DataGetValueRequestMessageHandler.getSingleton();
