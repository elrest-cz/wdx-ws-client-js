/**
 * Elrest eDesign - Runtime - Library- Handler - Abstract Handler
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */
'use strict';

import * as WDXSchema from '@wago/wdx-schema';
import * as WDXRuntime from '@wago/wdx-runtime';
import * as WDXWSS from '..';

export class ScriptBrowseRequestMessageHandler extends
    WDXRuntime.WDX.Runtime.Service
        .SingletonService<ScriptBrowseRequestMessageHandler>()
        implements WDXWSS.WebSocketMessageHandler.IWebSocketMessageHandler {
  type: WDXSchema.WDX.Schema.Message.Type =
      WDXSchema.WDX.Schema.Message.Type.ScriptBrowseRequest;

  public async handleMessage(
      message: WDXSchema.WDX.Schema.Message.Script.BrowseRequest,
      webSocketKey: string,
  ) {
    try {
      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'ScriptBrowseRequestMessageHandler.handleMessage',
          {
            webSocketKey: webSocketKey,
            messageType: message.type,
            messageUuid: message.uuid,
          },
      );
      /*! END_REMOVE */

      message.target = WDXSchema.WDX.Schema.Model.Instance.Type.JSWorkspace;

      await WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(message);

      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'ScriptBrowseRequestMessageHandler.handleMessage.done',
          {
            webSocketKey: webSocketKey,
            messageType: message.type,
            messageUuid: message.uuid,
          },
      );
      /*! END_REMOVE */

    } catch (error: any) {
      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.error(
          'ScriptBrowseRequestMessageHandler.handleMessage.error',
          {
            webSocketKey: webSocketKey,
            messageType: message.type,
            messageUuid: message.uuid,
            error: error,
          },
      );
      /*! END_REMOVE */

      const target:
          WDXSchema.WDX.Schema.Model.Instance.WebSocketServerInstance =
          WDXRuntime.WDX.Runtime.Service.InstanceService.model.getValue() as
          WDXSchema.WDX.Schema.Model.Instance.WebSocketServerInstance;

      const response: WDXSchema.WDX.Schema.Message.Script.BrowseResponse =
          new WDXSchema.WDX.Schema.Message.Script.BrowseResponse(
              undefined,
              message.uuid,
              error,
              undefined,
              target,
          );

      await WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(response);
    }
  }
}

export const Singleton = ScriptBrowseRequestMessageHandler.getSingleton();
