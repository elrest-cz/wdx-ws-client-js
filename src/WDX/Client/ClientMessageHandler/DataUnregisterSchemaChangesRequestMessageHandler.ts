/**
 * Elrest eDesign - Runtime - Library- Handler - Abstract Handler
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */
'use strict';

import * as WDXSchema from '@wago/wdx-schema';
import * as WDXRuntime from '@wago/wdx-runtime';
import * as WDXWSS from '..';

export class DataUnregisterSchemaChangesRequestMessageHandler extends
    WDXRuntime.WDX.Runtime.Service
        .SingletonService<DataUnregisterSchemaChangesRequestMessageHandler>()
        implements WDXWSS.WebSocketMessageHandler.IWebSocketMessageHandler {
  type: WDXSchema.WDX.Schema.Message.Type =
      WDXSchema.WDX.Schema.Message.Type.DataUnregisterSchemaChangesRequest;

  public async handleMessage(
      message: WDXSchema.WDX.Schema.Message.Data.UnregisterSchemaChangesRequest,
      webSocketKey: string,
  ) {
    /*! START_REMOVE */ 
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'DataUnregisterSchemaChangesRequestMessageHandler.handleMessage',
        {
          webSocketKey: webSocketKey,
          messageType: message.type,
          messageUuid: message.uuid,
        },
    );
    /*! END_REMOVE */ 

    message.target = WDXSchema.WDX.Schema.Model.Instance.Type.Data;

    WDXWSS.Service.WebSocketServerTopicService.unregister(
        WDXSchema.WDX.Schema.Message.Type.DataSchemaChanges,
        webSocketKey,
    );

    await WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(message);

    /*! START_REMOVE */ 
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'DataUnregisterSchemaChangesRequestMessageHandler.handleMessage.done',
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
    DataUnregisterSchemaChangesRequestMessageHandler.getSingleton();
