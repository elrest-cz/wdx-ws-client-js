/**
 * eDesign - Runtime - Web Socket Server Package
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */

'use strict';

import {Observable, Subject, Subscription} from 'rxjs';
import {AbstractAPIService} from '.';
import * as WDXSchema from '@wago/wdx-schema';
import * as WDXORM from 'typeorm';

export class InstanceService extends AbstractAPIService {
  /**
   * Starts eDesign Instance instance
   */
  public delete(uuid: string):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request =
        new WDXSchema.WDX.Schema.Message.Instance.DeleteRequest(uuid);

    const response = new Subject<WDXSchema.WDX.Schema.Model.Instance.Instance>;

    const subscription = this._clientService.incommingMessages.subscribe(

        (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
          if (message.type ===
                  WDXSchema.WDX.Schema.Message.Type.InstanceDeleteResponse &&
              message.uuid === request.uuid) {
            (message.error) ? response.error(message.error) :
                              response.next(message.body);
            response.complete();
            subscription.unsubscribe();
          }
        });

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public logSubscribe(uuid: string):
      Observable<null|Array<WDXSchema.WDX.Schema.Model.Instance.Log>> {
    const request:
        WDXSchema.WDX.Schema.Message.Instance.LogSubscribeRequestMessage =
        new WDXSchema.WDX.Schema.Message.Instance.LogSubscribeRequestMessage(
            uuid,
        );

    const response:
        Subject<null|Array<WDXSchema.WDX.Schema.Model.Instance.Log>> =
            new Subject<null|Array<WDXSchema.WDX.Schema.Model.Instance.Log>>();

    const topic: string =
        `${WDXSchema.WDX.Schema.Message.Type.InstanceLog}-${uuid}`;

    this._clientService.incommingMessages.subscribe(

        (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
          if (
              /** Subscribe response */
              (message.type ===
                   WDXSchema.WDX.Schema.Message.Type
                       .InstanceLogSubscribeResponse &&
               message.uuid === request.uuid)

              /** Monitoring Message */
              ||
              (message.type === WDXSchema.WDX.Schema.Message.Type.InstanceLog &&
               topic === message.topic)) {
            (message.error) ? response.error(message.error) :
                              response.next(message.body);
          }
        });

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  public logUnsubscribe(uuid: string): Observable<null> {
    const request:
        WDXSchema.WDX.Schema.Message.Instance.LogUnsubscribeRequestMessage =
        new WDXSchema.WDX.Schema.Message.Instance.LogUnsubscribeRequestMessage(
            uuid,
        );

    const response: Subject<null> = new Subject<null>;

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .InstanceLogUnsubscribeResponse &&
                  request.uuid === message.uuid) {
                (message.error) ? response.error(message.error) :
                                  response.next(message.body);

                response.complete();
                subscription.unsubscribe();
              }
            });

    this._clientService.sendMessage(request);

    return response.asObservable();
  }

  /**
   * Lists eDesign Instances
   *
   */
  public list(
      conditions:
          WDXORM.FindManyOptions<WDXSchema.WDX.Schema.Model.Instance.Instance>,
      ):

      Observable<WDXSchema.WDX.Schema.Model.Pagination
                     .Response<WDXSchema.WDX.Schema.Model.Instance.Instance>> {
    const request: WDXSchema.WDX.Schema.Message.Instance.ListRequest =
        new WDXSchema.WDX.Schema.Message.Instance.ListRequest(conditions);

    const response:
        Subject<WDXSchema.WDX.Schema.Model.Pagination
                    .Response<WDXSchema.WDX.Schema.Model.Instance.Instance>> =
            new Subject<WDXSchema.WDX.Schema.Model.Pagination.Response<
                WDXSchema.WDX.Schema.Model.Instance.Instance>>;

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type.InstanceListResponse &&
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

  /**
   * Starts eDesign Instance instance
   */
  public start(uuid: string):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request: WDXSchema.WDX.Schema.Message.Instance.StartRequest =
        new WDXSchema.WDX.Schema.Message.Instance.StartRequest(uuid);

    const response: Subject<WDXSchema.WDX.Schema.Model.Instance.Instance> =
        new Subject<WDXSchema.WDX.Schema.Model.Instance.Instance>;

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type.InstanceStartResponse &&
                  message.uuid === request.uuid) {
                (message.error) ? response.error(message.error) :
                                  response.next(message.body);
                response.complete();
                subscription.unsubscribe();
              }
            });

    this._clientService.sendMessage(request);
    return response.asObservable();
  }

  public detail(uuid: string):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request: WDXSchema.WDX.Schema.Message.Instance.DetailRequest =
        new WDXSchema.WDX.Schema.Message.Instance.DetailRequest(uuid);

    const response: Subject<WDXSchema.WDX.Schema.Model.Instance.Instance> =
        new Subject<WDXSchema.WDX.Schema.Model.Instance.Instance>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .InstanceDetailResponse &&
                  message.uuid === request.uuid) {
                (message.error) ? response.error(message.error) :
                                  response.next(message.body);

                response.complete();
                subscription.unsubscribe();
              }
            });

    this._clientService.sendMessage(request);
    return response.asObservable();
  }

  /**
   * Stops eDesign Runtime Instance
   */
  public stop(uuid: string):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request: WDXSchema.WDX.Schema.Message.Instance.StopRequest =
        new WDXSchema.WDX.Schema.Message.Instance.StopRequest(
            uuid,
        );

    const response: Subject<WDXSchema.WDX.Schema.Model.Instance.Instance> =
        new Subject<WDXSchema.WDX.Schema.Model.Instance.Instance>;

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type.InstanceStopResponse &&
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

  /**
   * Restart eDesign Instance instance
   */
  public restart(uuid: string):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request: WDXSchema.WDX.Schema.Message.Instance.RestartRequest =
        new WDXSchema.WDX.Schema.Message.Instance.RestartRequest(
            uuid,
        );

    const response: Subject<WDXSchema.WDX.Schema.Model.Instance.Instance> =
        new Subject<WDXSchema.WDX.Schema.Model.Instance.Instance>;

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type
                          .InstanceRestartResponse &&
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

  /**
   * Request WDX Whois Instance information
   */
  public whois(
      /**
       * Instance name
       */
      name: string,
      ): Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request: WDXSchema.WDX.Schema.Message.Instance.WhoIsRequest =
        new WDXSchema.WDX.Schema.Message.Instance.WhoIsRequest(name);

    const response: Subject<WDXSchema.WDX.Schema.Model.Instance.Instance> =
        new Subject<WDXSchema.WDX.Schema.Model.Instance.Instance>;

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type.InstanceWhoIsResponse &&
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

  /**
   * Save eDesign Instance
   */
  public save(instance: WDXSchema.WDX.Schema.Model.Instance.Instance):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request: WDXSchema.WDX.Schema.Message.Instance.SaveRequest =
        new WDXSchema.WDX.Schema.Message.Instance.SaveRequest(instance);

    const response: Subject<WDXSchema.WDX.Schema.Model.Instance.Instance> =
        new Subject<WDXSchema.WDX.Schema.Model.Instance.Instance>;

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(

            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type.InstanceSaveResponse &&
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
