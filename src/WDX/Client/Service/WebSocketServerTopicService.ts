/**
 * eDesign - Runtime - Web Socket Server - WS - Subscriber
 *
 * @copyright 2024 Elrest Automations Systeme GMBH
 */
'use strict'

import * as WDXSchema from '@wago/wdx-schema';
import * as WDXRuntime from '@wago/wdx-runtime';
import * as WDXWebSocketServerService from '.';
import * as WDXRXJS from 'rxjs';

export class WebSocketServerTopicService extends
    WDXRuntime.WDX.Runtime.Service
        .SingletonService<WebSocketServerTopicService>() {
  private __topics: Map<string, Array<string>> = new Map<string, Array<string>>;

  constructor() {
    super();

    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerTopicService.constructor',
    );
    /*! END_REMOVE */

    this.__subscribeIPCMessageTopic();
  }

  private __subscriptionIPCMessageTopic?: WDXRXJS.Subscription;

  private __subscribeIPCMessageTopic(): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerTopicService.__subscribeIPCMessageTopic',
    );
    /*! END_REMOVE */

    if (undefined === this.__subscriptionIPCMessageTopic ||
        true === this.__subscriptionIPCMessageTopic.closed) {
      this.__subscriptionIPCMessageTopic =
          WDXRuntime.WDX.Runtime.Service.IPCService.incommingMessage.subscribe(
              {
                next: async (
                    message: WDXSchema.WDX.Schema.Message.AbstractMessage) => {
                  await this.__onIPCMessageTopic(message);
                },

                error: (error: any) => {
                  this.__onIPCMessageTopicError(error);
                },
              },
          );
    }
  }

  private async __onIPCMessageTopicError(error: any) {
    WDXRuntime.WDX.Runtime.Service.LogService.error(
        'WebSocketServerTopicService.__onIPCMessageTopicError',
        {
          error: error,
        },
    );

    this.__subscribeIPCMessageTopic();
  }

  private async __onIPCMessageTopic(
      message: WDXSchema.WDX.Schema.Message.AbstractMessage,
  ) {
    try {
      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'WebSocketServerTopicService.__onIPCMessageTopic',
          {
            messageType: message.type,
            messageTopic: message.topic,
            messageOriginUuid: message.origin.uuid,
            messageOriginName: message.origin.name,
          },
      );
      /*! END_REMOVE */

      message.topic = message.topic ?? message.uuid;

      if (true === this.__topics.has(message.topic)) {
        /*! START_REMOVE */
        WDXRuntime.WDX.Runtime.Service.LogService.debug(
            'WebSocketServerTopicService.__onIPCMessageTopic.already-registered',
            {
              messageType: message.type,
              messageTopic: message.topic,
              messageOriginUuid: message.origin.uuid,
              messageOriginName: message.origin.name,
            },
        );
        /*! END_REMOVE */

        await this.__broadcast(message);

      } else {
        /*! START_REMOVE */
        WDXRuntime.WDX.Runtime.Service.LogService.debug(
            'WebSocketServerTopicService.__onIPCMessageTopic.new-topic',
            {
              messageType: message.type,
              messageTopic: message.topic,
              messageOriginUuid: message.origin.uuid,
              messageOriginName: message.origin.name,
            },
        );
        /*! END_REMOVE */
      }

      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'WebSocketServerTopicService.__onIPCMessageTopic.done',
          {
            messageType: message.type,
            messageTopic: message.topic,
            messageOriginUuid: message.origin.uuid,
            messageOriginName: message.origin.name,
          },
      );
      /*! END_REMOVE */

    } catch (error) {
      WDXRuntime.WDX.Runtime.Service.LogService.error(
          'WebSocketServerTopicService.__onIPCMessageTopic.error',
          {
            messageType: message.type,
            messageTopic: message.topic,
            messageOriginUuid: message.origin.uuid,
            messageOriginName: message.origin.name,
            error: error,
          },
      );
    }
  }


  private async __broadcast(
      message: WDXSchema.WDX.Schema.Message.AbstractMessage,
      ): Promise<void> {
    try {
      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'WebSocketServerTopicService.__broadcast',
          {
            messageType: message.type,
            messageTopic: message.topic,
            messageUuid: message.uuid,
            messageOriginUuid: message.origin.uuid,
            messageOriginName: message.origin.name,
          },
      );
      /*! END_REMOVE */

      if (undefined === message.topic) {
        throw 'Message topic is undefined';
      }

      const subscribers: Array<string>|undefined =
          this.__topics.get(message.topic);

      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'WebSocketServerTopicService.__broadcast.subscribers',
          {
            messageType: message.type,
            messageTopic: message.topic,
            messageUuid: message.uuid,
            messageOriginUuid: message.origin.uuid,
            messageOriginName: message.origin.name,
            subscribers: subscribers,
          },
      );
      /*! END_REMOVE */


      if (undefined !== subscribers && 0 < subscribers?.length) {
        for (let i = 0; i < subscribers.length; i++) {
          try {
            /*! START_REMOVE */
            WDXRuntime.WDX.Runtime.Service.LogService.debug(
                'WebSocketServerTopicService.__broadcast.subscriber',
                {
                  messageType: message.type,
                  messageTopic: message.topic,
                  messageUuid: message.uuid,
                  subscriber: subscribers[i],
                },
            );
            /*! END_REMOVE */

            await WDXWebSocketServerService.WebSocketServerService.sendMessage(
                message,
                subscribers[i],
            );

          } catch (e:any) {
            WDXRuntime.WDX.Runtime.Service.LogService.error(
                'WebSocketServerTopicService.__broadcast.subscriber.error',
                {
                  messageType: message.type,
                  messageTopic: message.topic,
                  messageUuid: message.uuid,
                  subscriber: subscribers[i],
                  error: e.toString(),
                },
            );
            this.unregister(message.topic, subscribers[i]);
          }
        }
      }

      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'WebSocketServerTopicService.__broadcast.done',
          {
            messageType: message.type,
            messageTopic: message.topic,
            messageUuid: message.uuid,
            messageOriginUuid: message.origin.uuid,
            messageOriginName: message.origin.name,
          },
      );
      /*! END_REMOVE */

    } catch (error) {
      WDXRuntime.WDX.Runtime.Service.LogService.error(
          'WebSocketServerTopicService.__broadcast.error',
          {
            messageType: message.type,
            messageTopic: message.topic,
            messageUuid: message.uuid,
          },
      );
    }
  }

  public register(
      topic: string,
      wsClientKey: string,
      ): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerTopicService.register',
        {
          topic: topic,
          wsClientKey: wsClientKey,
        },
    );
    /*! END_REMOVE */

    const topicSubscribers: Array<string> =
        this.__topics.get(topic) ?? [wsClientKey];

    if (false === topicSubscribers.includes(wsClientKey)) {
      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'WebSocketServerTopicService.register.adding',
          {
            topic: topic,
            wsClientKey: wsClientKey,
          },
      );
      /*! END_REMOVE */
      topicSubscribers.push(wsClientKey);
    } else {
      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'WebSocketServerTopicService.register.alreadyRegistered',
          {
            topic: topic,
            wsClientKey: wsClientKey,
          },
      );
      /*! END_REMOVE */
    }

    this.__topics.set(topic, topicSubscribers);

    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerTopicService.register.done',
        {
          topic: topic,
          wsClientKey: wsClientKey,
          topics: this.__topics,
        },
    );
    /*! END_REMOVE */
  }

  public unregister(
      topic: string,
      wsClientKey: string,
      ): void {
    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerTopicService.unregister',
        {
          topic: topic,
          wsClientKey: wsClientKey,
          topics: this.__topics,
        },
    );
    /*! END_REMOVE */

    const topicSubscribers: Array<string>|undefined = this.__topics.get(topic);

    if (undefined === topicSubscribers) {
      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'WebSocketServerTopicService.unregister.topic-no-exists',
          {
            topic: topic,
            wsClientKey: wsClientKey,
            topics: this.__topics,
          },
      );
      /*! END_REMOVE */

      return;
    }

    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerTopicService.removing-from-topic',
        {
          topic: topic,
          wsClientKey: wsClientKey,
          topics: this.__topics,
          subscribersLength: topicSubscribers.length,
        },
    );
    /*! END_REMOVE */

    const topicSubscribersIndex: number = topicSubscribers.findIndex(
        (item: string) => {
          return wsClientKey === item;
        },
    );

    if (0 > topicSubscribersIndex) {
      /*! START_REMOVE */
      WDXRuntime.WDX.Runtime.Service.LogService.debug(
          'WebSocketServerTopicService.unregister.subscription-no-exists',
          {
            topic: topic,
            wsClientKey: wsClientKey,
            topics: this.__topics,
          },
      );
      /*! END_REMOVE */

      return;
    }

    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerTopicService.unregister.removing-subscription',
        {
          topic: topic,
          wsClientKey: wsClientKey,
          topics: this.__topics,
          topicSubscribersIndex: topicSubscribersIndex,
        },
    );
    /*! END_REMOVE */

    topicSubscribers.splice(topicSubscribersIndex, 1);
    this.__topics.set(topic, topicSubscribers);

    /*! START_REMOVE */
    WDXRuntime.WDX.Runtime.Service.LogService.debug(
        'WebSocketServerTopicService.unregister.done',
        {
          topic: topic,
          wsClientKey: wsClientKey,
          topics: this.__topics,
          topicSubscribersLength: topicSubscribers.length,
        },
    );
    /*! END_REMOVE */
  }

  public getSubscribers(topic: string): Array<string>|undefined {
    return this.__topics.get(topic);
  }
}

export const Singleton: WebSocketServerTopicService =
    WebSocketServerTopicService.getSingleton();