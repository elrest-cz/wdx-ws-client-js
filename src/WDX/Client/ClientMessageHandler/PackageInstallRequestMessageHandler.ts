/**
 * Elrest eDesign - Runtime - Library- Handler - Abstract Handler
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */
'use strict';

import * as WDXSchema from '@wago/wdx-schema';
import * as WDXRuntime from '@wago/wdx-runtime';
import * as WDXWSS from '..';

export class PackageInstallRequestMessageHandler extends
    WDXRuntime.WDX.Runtime.Service
        .SingletonService<PackageInstallRequestMessageHandler>()
        implements WDXWSS.WebSocketMessageHandler.IWebSocketMessageHandler {
  type: WDXSchema.WDX.Schema.Message.Type =
      WDXSchema.WDX.Schema.Message.Type.PackageInstallRequest;

  public async handleMessage(
      message: WDXSchema.WDX.Schema.Message.Package.InstallRequest,
      webSocketKey: string,
  ) {
    /*! START_REMOVE */ 
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'PackageInstallRequestMessageHandler.handleMessage',
        {
          webSocketKey: webSocketKey,
          messageType: message.type,
          messageUuid: message.uuid,
        },
    );
    /*! END_REMOVE */ 


    message.target = WDXSchema.WDX.Schema.Model.Instance.Type.Controller;

    await WDXRuntime.WDX.Runtime.Service.IPCService.sendMessage(message);

    /*! START_REMOVE */ 
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'PackageInstallRequestMessageHandler.handleMessage.done',
        {
          webSocketKey: webSocketKey,
          messageType: message.type,
          messageUuid: message.uuid,
        },
    );
    /*! END_REMOVE */ 
  }
}

export const Singleton = PackageInstallRequestMessageHandler.getSingleton();
