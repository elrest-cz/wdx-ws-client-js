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
  public delete(uuid: string):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Trend> {
    const request: WDXSchema.WDX.Schema.Message.Trend.DeleteRequest =
        new WDXSchema.WDX.Schema.Message.Trend.DeleteRequest(uuid);

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

  public detail(uuid: string):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Trend> {
    const request: WDXSchema.WDX.Schema.Message.Trend.DetailRequest =
        new WDXSchema.WDX.Schema.Message.Trend.DetailRequest(uuid);

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


  public save(trend: WDXSchema.WDX.Schema.Model.Trend.Trend):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Trend> {
    const request: WDXSchema.WDX.Schema.Message.Trend.SetRequest =
        new WDXSchema.WDX.Schema.Message.Trend.SetRequest(trend);

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
      offset:
          number = WDXSchema.WDX.Schema.Model.Pagination.Request.DEFAULT_OFFSET,
      limit:
          number = WDXSchema.WDX.Schema.Model.Pagination.Request.DEFAULT_LIMIT,
      ): Observable<WDXSchema.WDX.Schema.Model.Trend.Trend[]> {
    const request: WDXSchema.WDX.Schema.Message.Trend.ListRequest =
        new WDXSchema.WDX.Schema.Message.Trend.ListRequest(
          {
            where:{
              active: active,
            },
            take:limit,
            skip: offset,
          }
        );

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

  public unregister(uuid: string): Observable<undefined> {
    const request: WDXSchema.WDX.Schema.Message.Trend.UnsubscribeRequest =
        new WDXSchema.WDX.Schema.Message.Trend.UnsubscribeRequest(uuid);

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

  public register(uuid: string):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Graph.GraphData> {
    const request: WDXSchema.WDX.Schema.Message.Trend.SubscribeRequest =
        new WDXSchema.WDX.Schema.Message.Trend.SubscribeRequest(uuid);

    const response: Subject<WDXSchema.WDX.Schema.Model.Trend.Graph.GraphData> =
        new Subject<WDXSchema.WDX.Schema.Model.Trend.Graph.GraphData>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if ((message.type ===
                       WDXSchema.WDX.Schema.Message.Type
                           .TrendingSubscribeResponse &&
                   message.uuid === request.uuid) ||
                  (uuid === message.body.trendUuid &&
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

  public graphConfiguration(uuid: string):
      Observable<WDXSchema.WDX.Schema.Model.Trend.Graph.Graph> {
    const request:
        WDXSchema.WDX.Schema.Message.Trend.GraphConfigurationRequest =
        new WDXSchema.WDX.Schema.Message.Trend.GraphConfigurationRequest(uuid);

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
                response.complete();
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public graphData(
      uuid: string,
      dateFrom?: number,
      dateTo?: number,
      ): Observable<WDXSchema.WDX.Schema.Model.Trend.Graph.GraphData> {
    const request: WDXSchema.WDX.Schema.Message.Trend.GraphDataRequest =
        new WDXSchema.WDX.Schema.Message.Trend.GraphDataRequest(
            new WDXSchema.WDX.Schema.Model.Trend.Graph.GraphDataRequestBody(
                uuid,
                dateFrom,
                dateTo,
                ),
        );

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
                response.complete();
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public graphExport(
      uuid: string,
      type: WDXSchema.WDX.Schema.Model.Trend.Export.Type,
      dateFrom?: number,
      dateTo?: number,
      ): Observable<string> {
    const request: WDXSchema.WDX.Schema.Message.Trend.TrendExportRequest =
        new WDXSchema.WDX.Schema.Message.Trend.TrendExportRequest(
            new WDXSchema.WDX.Schema.Model.Trend.ExportRequestBody(
                uuid,
                type,
                dateFrom,
                dateTo,
                ),
        );

    const response: Subject<string> = new Subject<string>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .TrendingExportResponse &&
                  message.uuid === request.uuid) {
                message.error ? response.error(message.error) :
                                response.next(message.body);
                subscription.unsubscribe();
                response.complete();
              }
            },
        );

    this._clientService.sendMessage(request);

    return response.asObservable();
  }
}
