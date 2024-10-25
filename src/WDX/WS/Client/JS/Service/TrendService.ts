/**
 * eDesign - Runtime - Web Socket Server Package
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */

'use strict';

import {Observable, Subject, Subscription} from 'rxjs';
import {AbstractAPIService} from '.';
import * as WDXSchema from '@wago/wdx-schema';

export class TrendService extends AbstractAPIService {
  public delete(id: number):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Trend> {
    const request: WDXSchema.WDX.Schema.Message.Trend.DeleteRequest =
        new WDXSchema.WDX.Schema.Message.Trend.DeleteRequest(id);

    const response: Subject<WDXSchema.WDX.Schema.Model.Trend.Trend> =
        new Subject<WDXSchema.WDX.Schema.Model.Trend.Trend>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (WDXSchema.WDX.Schema.Message.Type.TrendingDeleteResponse ===
                      message.type &&
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

  public detail(id: number):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Trend> {
    const request: WDXSchema.WDX.Schema.Message.Trend.DetailRequest =
        new WDXSchema.WDX.Schema.Message.Trend.DetailRequest(id);

    const response: Subject<WDXSchema.WDX.Schema.Model.Trend.Trend> =
        new Subject<WDXSchema.WDX.Schema.Model.Trend.Trend>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (WDXSchema.WDX.Schema.Message.Type.TrendingDetailResponse ===
                      message.type &&
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


  public save(alarm: WDXSchema.WDX.Schema.Model.Trend.Trend):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Trend> {
    const request: WDXSchema.WDX.Schema.Message.Trend.SetRequest =
        new WDXSchema.WDX.Schema.Message.Trend.SetRequest(alarm);

    const response: Subject<WDXSchema.WDX.Schema.Model.Trend.Trend> =
        new Subject<WDXSchema.WDX.Schema.Model.Trend.Trend>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type.TrendingSaveResponse &&
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

  public list(
      active?: boolean|undefined,
      ): Observable<WDXSchema.WDX.Schema.Model.Trend.Trend[]> {
    const request: WDXSchema.WDX.Schema.Message.Trend.ListRequest =
        new WDXSchema.WDX.Schema.Message.Trend.ListRequest(active);

    const response: Subject<WDXSchema.WDX.Schema.Model.Trend.Trend[]> =
        new Subject<WDXSchema.WDX.Schema.Model.Trend.Trend[]>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type.TrendingListResponse &&
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

  public unregister(id: number): Observable<undefined> {
    const request: WDXSchema.WDX.Schema.Message.Trend.UnsubscribeRequest =
        new WDXSchema.WDX.Schema.Message.Trend.UnsubscribeRequest(id);

    const response = new Subject<undefined>();
    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .TrendingUnsubscribeResponse &&
                  message.uuid === request.uuid) {
                message.error ? response.error(message.error) :
                                response.next(undefined);

                response.complete();
                subscription.unsubscribe();
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public register(id: number):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Graph.GraphData> {
    const request: WDXSchema.WDX.Schema.Message.Trend.SubscribeRequest =
        new WDXSchema.WDX.Schema.Message.Trend.SubscribeRequest(id);

    const response: Subject<WDXSchema.WDX.Schema.Model.Trend.Graph.GraphData> =
        new Subject<WDXSchema.WDX.Schema.Model.Trend.Graph.GraphData>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if ((message.type ===
                       WDXSchema.WDX.Schema.Message.Type
                           .TrendingSubscribeResponse &&
                   message.uuid === request.uuid) ||
                  (id === message.body.trendId &&
                   message.type ===
                       WDXSchema.WDX.Schema.Message.Type.TrendingUpdate)) {
                message.error ? response.error(message.error) :
                                response.next(message.body);
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public graphConfiguration(id: number):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Graph.Graph> {
    const request:
        WDXSchema.WDX.Schema.Message.Trend.GraphConfigurationRequest =
        new WDXSchema.WDX.Schema.Message.Trend.GraphConfigurationRequest(id);

    const response: Subject<WDXSchema.WDX.Schema.Model.Trend.Graph.Graph> =
        new Subject<WDXSchema.WDX.Schema.Model.Trend.Graph.Graph>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .TrendingGraphConfigurationResponse &&
                  message.uuid === request.uuid) {
                message.error ? response.error(message.error) :
                                response.next(message.body);
                subscription.unsubscribe();
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }


  public graphData(id: number):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Graph.GraphData> {
    const request: WDXSchema.WDX.Schema.Message.Trend.GraphDataRequest =
        new WDXSchema.WDX.Schema.Message.Trend.GraphDataRequest(id);

    const response: Subject<WDXSchema.WDX.Schema.Model.Trend.Graph.GraphData> =
        new Subject<WDXSchema.WDX.Schema.Model.Trend.Graph.GraphData>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .TrendingGraphDataResponse &&
                  message.uuid === request.uuid) {
                message.error ? response.error(message.error) :
                                response.next(message.body);
                subscription.unsubscribe();
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }
}
