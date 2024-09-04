/**
 * eDesign - Runtime - Web Socket Server Package
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */

'use strict';

import {Observable, Subject, Subscription} from 'rxjs';
import {AbstractAPIService} from '.';
import * as WDXSchema from '@wago/wdx-schema';


export class RuntimeService extends AbstractAPIService {
  public monitorSubscribe():
      Observable<WDXSchema.WDX.Schema.Model.Runtime.Report.Report> {
    const request:
        WDXSchema.WDX.Schema.Message.Runtime.MonitorSubscribeRequest =
        new WDXSchema.WDX.Schema.Message.Runtime.MonitorSubscribeRequest();

    const response: Subject<WDXSchema.WDX.Schema.Model.Runtime.Report.Report> =
        new Subject<WDXSchema.WDX.Schema.Model.Runtime.Report.Report>;

    this._clientService.incommingMessages.subscribe(

        (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
          if (message.type ===
                  WDXSchema.WDX.Schema.Message.Type
                      .RuntimeMonitorSubscribeResponse &&
              request.uuid === message.uuid) {
            (message.error) ?
                response.error(message.error) :
                response.next(
                    message.body as
                    WDXSchema.WDX.Schema.Model.Runtime.Report.Report);

          } else if (
              message.type ===
              WDXSchema.WDX.Schema.Message.Type.RuntimeMonitor) {
            (message.error) ?
                response.error(message.error) :
                response.next(
                    message.body as
                    WDXSchema.WDX.Schema.Model.Runtime.Report.Report);
          }
        },
    );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public monitorUnsubscribe(): Observable<null> {
    const request:
        WDXSchema.WDX.Schema.Message.Runtime.MonitorUnsubscribeRequest =
        new WDXSchema.WDX.Schema.Message.Runtime.MonitorUnsubscribeRequest();

    const response: Subject<null> = new Subject<null>;

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .RuntimeMonitorUnsubscribeResponse &&
                  message.uuid === request.uuid) {
                (message.error) ? response.error(message.error) :
                                  response.next(message.body);

                response.complete();
                subscription.unsubscribe();
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }
}