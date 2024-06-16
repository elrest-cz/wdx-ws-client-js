/**
 * Elrest eDesign - Runtime - Library- Handler - Abstract Handler
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */
'use strict';

import * as WDXSchema from '@wago/wdx-schema';
import * as WDXRuntime from '@wago/wdx-runtime';
import {IWebSocketMessageHandler} from './IWebSocketMessageHandler';

export class KeepALiveMessageHandler extends
    WDXRuntime.WDX.Runtime.Service.SingletonService<KeepALiveMessageHandler>()
        implements IWebSocketMessageHandler {
  type: WDXSchema.WDX.Schema.Message.Type =
      WDXSchema.WDX.Schema.Message.Type.KeepALive;

  public async handleMessage(
      message: WDXSchema.WDX.Schema.Message.KeepAlive,
      webSocketKey: string,
  ) {
    /*! START_REMOVE */ 
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'KeepALiveMessageHandler.handleMessage',
        {
          webSocketKey: webSocketKey,
          messageType: message.type,
          messageUuid: message.uuid,
        },
    );
    /*! END_REMOVE */ 
  }
}

export const Singleton = KeepALiveMessageHandler.getSingleton();
