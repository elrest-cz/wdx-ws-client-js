/**
 * Elrest eDesign - Runtime - Library- Handler - Abstract Handler
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */
'use strict';

import * as WDXSchema from '@wago/wdx-schema';
import * as WDXRuntime from '@wago/wdx-runtime';
import * as WDXWSS from '..';

export class InstanceLogSubscribeRequestMessageHandler extends
    WDXRuntime.WDX.Runtime.Service
        .SingletonService<InstanceLogSubscribeRequestMessageHandler>()
        implements WDXWSS.WebSocketMessageHandler.IWebSocketMessageHandler {
  type: WDXSchema.WDX.Schema.Message.Type =
      WDXSchema.WDX.Schema.Message.Type.InstanceLogSubscribeRequest;

  public async handleMessage(
      message: WDXSchema.WDX.Schema.Message.Instance.LogSubscribeRequestMessage,
      webSocketKey: string,
  ) {
    /*! START_REMOVE */ 
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'InstanceLogSubscribeRequestMessageHandler.handleMessage',
        {
          webSocketKey: webSocketKey,
          messageType: message.type,
          messageUuid: message.uuid,
        },
    );
    /*! END_REMOVE */ 

    message.target = WDXSchema.WDX.Schema.Model.Instance.Type.Controller;

    WDXWSS.Service.WebSocketServerTopicService.register(
        WDXSchema.WDX.Schema.Message.Type.InstanceLog + '-' + message.body.uuid,
        webSocketKey,
    );

    await WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(message);

    /*! START_REMOVE */ 
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'InstanceLogSubscribeRequestMessageHandler.handleMessage.done',
        {
          webSocketKey: webSocketKey,
          messageType: message.type,
          messageUuid: message.uuid,
        },
    );
    /*! END_REMOVE */ 
  }
}

export const Singleton =
    InstanceLogSubscribeRequestMessageHandler.getSingleton();
