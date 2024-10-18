/**
 * eDesign - Runtime - Web Socket Server Package
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */

'use strict';

import {Observable, Subject, Subscription} from 'rxjs';
import {AbstractAPIService} from '.';
import {ClientService} from './ClientService';
import * as WDXSchema from '@wago/wdx-schema';


export class ScriptService extends AbstractAPIService {
  public list(
      path: string,
      level:
          number = WDXSchema.WDX.Schema.Model.Script.BROWSE_DEFAULT_LEVEL):
      Observable<WDXSchema.WDX.Schema.Model.Filesystem.Entry> {
    const request: WDXSchema.WDX.Schema.Message.Script.BrowseRequest =
        new WDXSchema.WDX.Schema.Message.Script.BrowseRequest(path, level);
    const response: Subject<WDXSchema.WDX.Schema.Model.Filesystem.Entry> =
        new Subject<WDXSchema.WDX.Schema.Model.Filesystem.Entry>;
    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .ScriptBrowseResponse &&
                  message.uuid === request.uuid) {
                (message.error) ?
                    response.error(message.error) :
                    response.next(
                        message.body as
                        WDXSchema.WDX.Schema.Model.Filesystem.Entry);
                response.complete();
                subscription.unsubscribe();
              }
            });
    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public save(entry: WDXSchema.WDX.Schema.Model.Filesystem.Entry):
      Observable<WDXSchema.WDX.Schema.Model.Filesystem.Entry> {
    const request: WDXSchema.WDX.Schema.Message.Script.SaveRequest =
        new WDXSchema.WDX.Schema.Message.Script.SaveRequest(entry);
    const response: Subject<WDXSchema.WDX.Schema.Model.Filesystem.Entry> =
        new Subject<WDXSchema.WDX.Schema.Model.Filesystem.Entry>;
    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .ScriptSaveResponse &&
                  message.uuid === request.uuid) {
                (message.error) ?
                    response.error(message.error) :
                    response.next(
                        message.body as
                        WDXSchema.WDX.Schema.Model.Filesystem.Entry);
                response.complete();
                subscription.unsubscribe();
              }
            });
    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public delete(entry: WDXSchema.WDX.Schema.Model.Filesystem.Entry):
      Observable<WDXSchema.WDX.Schema.Model.Filesystem.Entry> {
    const request: WDXSchema.WDX.Schema.Message.Script.DeleteRequest =
        new WDXSchema.WDX.Schema.Message.Script.DeleteRequest(entry);

    const response: Subject<WDXSchema.WDX.Schema.Model.Filesystem.Entry> =
        new Subject<WDXSchema.WDX.Schema.Model.Filesystem.Entry>;

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .ScriptDeleteResponse &&
                  message.uuid === request.uuid) {
                (message.error) ?
                    response.error(message.error) :
                    response.next(
                        message.body as
                        WDXSchema.WDX.Schema.Model.Filesystem.Entry);
                response.complete();
                subscription.unsubscribe();
              }
            });
    this._clientService.sendMessage(request);

    return response.asObservable();
  }
}