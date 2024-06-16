/**
 * Elrest eDesign - Runtime - Library- Handler - Abstract Handler
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */
'use strict';

import * as WDXSchema from '@wago/wdx-schema';
import * as WDXRuntime from '@wago/wdx-runtime';
import * as WDXWSS from '..';
import {errorMonitor} from 'events';

export class DataUnregisterRequestMessageHandler extends
    WDXRuntime.WDX.Runtime.Service
        .SingletonService<DataUnregisterRequestMessageHandler>()
        implements WDXWSS.WebSocketMessageHandler.IWebSocketMessageHandler {
  type: WDXSchema.WDX.Schema.Message.Type =
      WDXSchema.WDX.Schema.Message.Type.DataUnregisterRequest;

  public async handleMessage(
      message: WDXSchema.WDX.Schema.Message.Data.UnregisterRequest,
      webSocketKey: string,
  ) {
    try {
      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'DataUnregisterRequestMessageHandler.handleMessage',
          {
            webSocketKey: webSocketKey,
            messageType: message.type,
            messageUuid: message.uuid,
            messageOrigin: message.origin,
          },
      );
      /*! END_REMOVE */

      message.target = WDXSchema.WDX.Schema.Model.Instance.Type.Data;
      const topic: string =
          `${WDXSchema.WDX.Schema.Message.Type.DataUpdate}-${message.body}`;

      WDXWSS.Service.WebSocketServerTopicService.unregister(
          topic,
          webSocketKey,
      );

      const subscribers: Array<string>|undefined =
          WDXWSS.Service.WebSocketServerTopicService.getSubscribers(topic);

      if (undefined === subscribers || 0 === subscribers.length) {
        await WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(message);
      } else {
        /*! START_REMOVE */
        WDXRuntime.WDX.Runtime.Service.LogService.debug(
            'DataUnregisterRequestMessageHandler.handleMessage.has-more-subscribers',
            {
              webSocketKey: webSocketKey,
              messageType: message.type,
              messageUuid: message.uuid,
              subscribers: subscribers,
            },
        );
        /*! END_REMOVE */

        const target:
            WDXSchema.WDX.Schema.Model.Instance.WebSocketServerInstance =
            WDXRuntime.WDX.Runtime.Service.InstanceService.model.getValue() as
            WDXSchema.WDX.Schema.Model.Instance.WebSocketServerInstance;

        const response: WDXSchema.WDX.Schema.Message.Data.UnregisterResponse =
            new WDXSchema.WDX.Schema.Message.Data.UnregisterResponse(
                message.body,
                message.uuid,
                undefined,
                message.topic,
                target,
            );

        WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(response);
      }

      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'DataUnregisterRequestMessageHandler.handleMessage.done',
          {
            webSocketKey: webSocketKey,
            messageType: message.type,
            messageUuid: message.uuid,
          },
      );
      /*! END_REMOVE */
    } catch (error: any) {
      WDXRuntime.WDX.Runtime.Service.LogService.error(
          'DataUnregisterRequestMessageHandler.handleMessage.error',
          {
            webSocketKey: webSocketKey,
            messageType: message.type,
            messageUuid: message.uuid,
            error: error
          },
      );

      const target:
          WDXSchema.WDX.Schema.Model.Instance.WebSocketServerInstance =
          WDXRuntime.WDX.Runtime.Service.InstanceService.model.getValue() as
          WDXSchema.WDX.Schema.Model.Instance.WebSocketServerInstance;

      const response: WDXSchema.WDX.Schema.Message.Data.UnregisterResponse =
          new WDXSchema.WDX.Schema.Message.Data.UnregisterResponse(
              undefined,
              message.uuid,
              new WDXSchema.WDX.Schema.Message.MessageError(
                  500, error.toString()),
              message.topic,
              target,
          );

      WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(response);
    }
  }
}

export const Singleton = DataUnregisterRequestMessageHandler.getSingleton();
