/**
 * Elrest eDesign - Runtime - Library- Handler - Abstract Handler
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */
'use strict';

import * as WAGOWDXSchema from '@wago/wdx-schema';

export interface IWebSocketMessageHandler {
  type: WAGOWDXSchema.WDX.Schema.Message.Type;

  handleMessage(
      message: WAGOWDXSchema.WDX.Schema.Message.AbstractMessage,
      webSocketKey: string,
      ): void;
}