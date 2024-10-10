/**
 * eDesign - Runtime - Web Socket Server Package
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */

'use strict';

import {Observable, Subject, Subscription} from 'rxjs';
import {AbstractAPIService} from '.';
import * as WDXSchema from '@wago/wdx-schema';

export class AlarmService extends AbstractAPIService {
  public deleteAlarm(id: number):
      Observable<WDXSchema.WDX.Schema.Model.Alarm.Alarm> {
    const request: WDXSchema.WDX.Schema.Message.Alarm.DeleteRequest =
        new WDXSchema.WDX.Schema.Message.Alarm.DeleteRequest(id);

    const response: Subject<WDXSchema.WDX.Schema.Model.Alarm.Alarm> =
        new Subject<WDXSchema.WDX.Schema.Model.Alarm.Alarm>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (WDXSchema.WDX.Schema.Message.Type.AlarmingDeleteResponse ===
                      message.type &&
                  message.uuid === request.uuid) {
                message.error ? response.error(message.error) :
                                response.next(message.body);

                response.complete();
                subscription.unsubscribe();
              }
            });

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public detailAlarm(id: number):
      Observable<WDXSchema.WDX.Schema.Model.Alarm.Alarm> {
    const request: WDXSchema.WDX.Schema.Message.Alarm.DetailRequest =
        new WDXSchema.WDX.Schema.Message.Alarm.DetailRequest(id);

    const response: Subject<WDXSchema.WDX.Schema.Model.Alarm.Alarm> =
        new Subject<WDXSchema.WDX.Schema.Model.Alarm.Alarm>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (WDXSchema.WDX.Schema.Message.Type.AlarmingDetailResponse ===
                      message.type &&
                  message.uuid === request.uuid) {
                message.error ? response.error(message.error) :
                                response.next(message.body);

                response.complete();
                subscription.unsubscribe();
              }
            });

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public saveAlarm(alarm: WDXSchema.WDX.Schema.Model.Alarm.Alarm):
      Observable<WDXSchema.WDX.Schema.Model.Alarm.Alarm> {
    const request: WDXSchema.WDX.Schema.Message.Alarm.SetRequest =
        new WDXSchema.WDX.Schema.Message.Alarm.SetRequest(alarm);

    const response: Subject<WDXSchema.WDX.Schema.Model.Alarm.Alarm> =
        new Subject<WDXSchema.WDX.Schema.Model.Alarm.Alarm>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type.AlarmingSetResponse &&
                  message.uuid === request.uuid) {
                message.error ? response.error(message.error) :
                                response.next(message.body);

                response.complete();
                subscription.unsubscribe();
              }
            });

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public listAlarms(
      active?: boolean|undefined,
      ): Observable<WDXSchema.WDX.Schema.Model.Alarm.Alarm[]> {
    const request: WDXSchema.WDX.Schema.Message.Alarm.ListRequest =
        new WDXSchema.WDX.Schema.Message.Alarm.ListRequest(active);

    const response: Subject<WDXSchema.WDX.Schema.Model.Alarm.Alarm[]> =
        new Subject<WDXSchema.WDX.Schema.Model.Alarm.Alarm[]>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type.AlarmingListResponse &&
                  message.uuid === request.uuid) {
                message.error ? response.error(message.error) :
                                response.next(message.body);

                response.complete();
                subscription.unsubscribe();
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public listAlarmHistory(
      alarmId?: number|undefined,
      ): Observable<WDXSchema.WDX.Schema.Model.Alarm.AlarmHistory[]> {
    const request: WDXSchema.WDX.Schema.Message.Alarm.ListHistoryRequest =
        new WDXSchema.WDX.Schema.Message.Alarm.ListHistoryRequest(alarmId);

    const response: Subject<WDXSchema.WDX.Schema.Model.Alarm.AlarmHistory[]> =
        new Subject<WDXSchema.WDX.Schema.Model.Alarm.AlarmHistory[]>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .AlarmingListHistoryResponse &&
                  message.uuid === request.uuid) {
                message.error ? response.error(message.error) :
                                response.next(message.body);

                response.complete();
                subscription.unsubscribe();
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public unregister(): Observable<undefined> {
    const request: WDXSchema.WDX.Schema.Message.Alarm.UnsubscribeRequest =
        new WDXSchema.WDX.Schema.Message.Alarm.UnsubscribeRequest();

    const response = new Subject<undefined>();
    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .AlarmingUnsubscribeResponse &&
                  message.uuid === request.uuid) {
                message.error ? response.error(message.error) :
                                response.next(undefined);

                response.complete();
                subscription.unsubscribe();
              }
            });

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public register():
      Observable<WDXSchema.WDX.Schema.Model.Alarm.Alarm|undefined> {
    const request: WDXSchema.WDX.Schema.Message.Alarm.SubscribeRequest =
        new WDXSchema.WDX.Schema.Message.Alarm.SubscribeRequest();

    const response: Subject<WDXSchema.WDX.Schema.Model.Alarm.Alarm|undefined> =
        new Subject<WDXSchema.WDX.Schema.Model.Alarm.Alarm|undefined>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if ((message.type ===
                       WDXSchema.WDX.Schema.Message.Type
                           .AlarmingSubscribeResponse &&
                   message.uuid === request.uuid) ||
                  message.type ===
                      WDXSchema.WDX.Schema.Message.Type.AlarmingUpdate) {
                message.error ? response.error(message.error) :
                                response.next(message.body);
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }
}
