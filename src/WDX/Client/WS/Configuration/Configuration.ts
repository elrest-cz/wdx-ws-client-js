
/**
 * eDesign Runtime Library Abstract Application
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */
'use strict';

export enum Protocol {
  ws = 'ws',
  wss = 'wss',
}

export interface Configuration {
  protocol: Protocol;

  host: string;

  port: number;

  path?: string;
}