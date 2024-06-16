/**
 * Elrest eDesign - Runtime - Library- Handler - Abstract Handler
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */
'use strict';

import * as WDXSchema from '@wago/wdx-schema';
import * as WDXRuntime from '@wago/wdx-runtime';
import * as WDXWSS from '..';

export class RuntimeMonitorUnsubscribeRequestMessageHandler extends
    WDXRuntime.WDX.Runtime.Service
        .SingletonService<RuntimeMonitorUnsubscribeRequestMessageHandler>()
        implements WDXWSS.WebSocketMessageHandler.IWebSocketMessageHandler {
  type: WDXSchema.WDX.Schema.Message.Type =
      WDXSchema.WDX.Schema.Message.Type.RuntimeMonitorUnsubscribeRequest;

  public async handleMessage(
      message: WDXSchema.WDX.Schema.Message.Runtime.MonitorUnsubscribeRequest,
      webSocketKey: string,
  ) {
    /*! START_REMOVE */ 
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'RuntimeMonitorUnsubscribeRequestMessageHandler.handleMessage',
        {
          webSocketKey: webSocketKey,
          messageType: message.type,
          messageUuid: message.uuid,
        },
    );
    /*! END_REMOVE */ 

    message.target = WDXSchema.WDX.Schema.Model.Instance.Type.Controller;

    WDXWSS.Service.WebSocketServerTopicService.unregister(
        WDXSchema.WDX.Schema.Message.Type.RuntimeMonitor,
        webSocketKey,
    );

    await WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(message);
    /*! START_REMOVE */ 
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'RuntimeMonitorUnsubscribeRequestMessageHandler.handleMessage.done',
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
    RuntimeMonitorUnsubscribeRequestMessageHandler.getSingleton();
