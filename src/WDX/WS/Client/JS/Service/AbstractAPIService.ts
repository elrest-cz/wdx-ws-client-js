/**
 * eDesign - Runtime - Web Socket Server Package
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */

'use strict';

import {ClientService} from './ClientService';


export abstract class AbstractAPIService {
  protected _clientService: ClientService;

  public constructor(clientService: ClientService) {
    this._clientService = clientService;
  }
}
