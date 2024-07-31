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

export class InstanceService extends AbstractAPIService {
  /**
   * Starts eDesign Instance instance
   */
  public delete(instance: WDXSchema.WDX.Schema.Model.Instance.Instance):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request =
        new WDXSchema.WDX.Schema.Message.Instance.DeleteRequest(instance.uuid);

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

  public logSubscribe(instance: WDXSchema.WDX.Schema.Model.Instance.Instance):
      Observable<WDXSchema.WDX.Schema.Model.Instance.LogMessageBody> {
    const request:
        WDXSchema.WDX.Schema.Message.Instance.LogSubscribeRequestMessage =
        new WDXSchema.WDX.Schema.Message.Instance.LogSubscribeRequestMessage(
            instance.uuid,
        );

    const response:
        Subject<WDXSchema.WDX.Schema.Model.Instance.LogMessageBody> =
            new Subject<WDXSchema.WDX.Schema.Model.Instance.LogMessageBody>();

    const topic: string =
        `${WDXSchema.WDX.Schema.Message.Type.InstanceLog}-${instance.uuid}`;

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

  public logUnsubscribe(instance: WDXSchema.WDX.Schema.Model.Instance.Instance):
      Observable<null> {
    const request:
        WDXSchema.WDX.Schema.Message.Instance.LogUnsubscribeRequestMessage =
        new WDXSchema.WDX.Schema.Message.Instance.LogUnsubscribeRequestMessage(
            instance.uuid,
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
  public list(status?: WDXSchema.WDX.Schema.Model.Instance.Status):
      Observable<Array<WDXSchema.WDX.Schema.Model.Instance.Instance>> {
    const request: WDXSchema.WDX.Schema.Message.Instance.ListRequest =
        new WDXSchema.WDX.Schema.Message.Instance.ListRequest();

    const response:
        Subject<Array<WDXSchema.WDX.Schema.Model.Instance.Instance>> =
            new Subject<Array<WDXSchema.WDX.Schema.Model.Instance.Instance>>;

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
  public start(instance: WDXSchema.WDX.Schema.Model.Instance.Instance):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request: WDXSchema.WDX.Schema.Message.Instance.StartRequest =
        new WDXSchema.WDX.Schema.Message.Instance.StartRequest(instance.uuid);

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

  /**
   * Starts eDesign Instance instance
   *
   * @param id number WDXSchema.WDX.Schema.Model.Instance.Instance id number
   */
  public info(instance: WDXSchema.WDX.Schema.Model.Instance.Instance):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request: WDXSchema.WDX.Schema.Message.Instance.InfoRequest =
        new WDXSchema.WDX.Schema.Message.Instance.InfoRequest(instance.uuid);

    const response: Subject<WDXSchema.WDX.Schema.Model.Instance.Instance> =
        new Subject<WDXSchema.WDX.Schema.Model.Instance.Instance>();

    const subscription: Subscription =
        this._clientService.incommingMessages.subscribe(
            (message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
              if (message.type ===
                      WDXSchema.WDX.Schema.Message.Type.InstanceInfoResponse &&
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
  public stop(instance: WDXSchema.WDX.Schema.Model.Instance.Instance):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request: WDXSchema.WDX.Schema.Message.Instance.StopRequest =
        new WDXSchema.WDX.Schema.Message.Instance.StopRequest(
            instance.uuid,
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
  public restart(instance: WDXSchema.WDX.Schema.Model.Instance.Instance):
      Observable<WDXSchema.WDX.Schema.Model.Instance.Instance> {
    const request: WDXSchema.WDX.Schema.Message.Instance.RestartRequest =
        new WDXSchema.WDX.Schema.Message.Instance.RestartRequest(
            instance.uuid,
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
