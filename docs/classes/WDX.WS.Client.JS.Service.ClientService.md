[@wago/wdx-ws-client-js](../README.md) / [Exports](../modules.md) / [WDX](../modules/WDX.md) / [WS](../modules/WDX.WS.md) / [Client](../modules/WDX.WS.Client.md) / [JS](../modules/WDX.WS.Client.JS.md) / [Service](../modules/WDX.WS.Client.JS.Service.md) / ClientService

# Class: ClientService

[JS](../modules/WDX.WS.Client.JS.md).[Service](../modules/WDX.WS.Client.JS.Service.md).ClientService

## Table of contents

### Constructors

- [constructor](WDX.WS.Client.JS.Service.ClientService.md#constructor)

### Properties

- [\_\_KEEPALIVE\_INTERVAL](WDX.WS.Client.JS.Service.ClientService.md#__keepalive_interval)
- [\_\_RECONNECT\_TIMEOUT](WDX.WS.Client.JS.Service.ClientService.md#__reconnect_timeout)
- [\_\_alarmService](WDX.WS.Client.JS.Service.ClientService.md#__alarmservice)
- [\_\_connection](WDX.WS.Client.JS.Service.ClientService.md#__connection)
- [\_\_dataService](WDX.WS.Client.JS.Service.ClientService.md#__dataservice)
- [\_\_incommingMessages](WDX.WS.Client.JS.Service.ClientService.md#__incommingmessages)
- [\_\_instanceService](WDX.WS.Client.JS.Service.ClientService.md#__instanceservice)
- [\_\_keepAliveTimeout](WDX.WS.Client.JS.Service.ClientService.md#__keepalivetimeout)
- [\_\_runtimeService](WDX.WS.Client.JS.Service.ClientService.md#__runtimeservice)
- [\_\_scriptService](WDX.WS.Client.JS.Service.ClientService.md#__scriptservice)
- [\_\_status](WDX.WS.Client.JS.Service.ClientService.md#__status)
- [\_\_trendService](WDX.WS.Client.JS.Service.ClientService.md#__trendservice)
- [\_\_wsClient](WDX.WS.Client.JS.Service.ClientService.md#__wsclient)
- [\_\_wsClientConfiguration](WDX.WS.Client.JS.Service.ClientService.md#__wsclientconfiguration)

### Accessors

- [alarmService](WDX.WS.Client.JS.Service.ClientService.md#alarmservice)
- [dataService](WDX.WS.Client.JS.Service.ClientService.md#dataservice)
- [incommingMessages](WDX.WS.Client.JS.Service.ClientService.md#incommingmessages)
- [instanceService](WDX.WS.Client.JS.Service.ClientService.md#instanceservice)
- [runtimeService](WDX.WS.Client.JS.Service.ClientService.md#runtimeservice)
- [scriptService](WDX.WS.Client.JS.Service.ClientService.md#scriptservice)
- [status](WDX.WS.Client.JS.Service.ClientService.md#status)
- [trendService](WDX.WS.Client.JS.Service.ClientService.md#trendservice)

### Methods

- [\_\_getWsClientUrl](WDX.WS.Client.JS.Service.ClientService.md#__getwsclienturl)
- [\_\_onError](WDX.WS.Client.JS.Service.ClientService.md#__onerror)
- [\_\_onMessage](WDX.WS.Client.JS.Service.ClientService.md#__onmessage)
- [\_\_onOpen](WDX.WS.Client.JS.Service.ClientService.md#__onopen)
- [\_\_reconnect](WDX.WS.Client.JS.Service.ClientService.md#__reconnect)
- [\_\_sendKeepAlive](WDX.WS.Client.JS.Service.ClientService.md#__sendkeepalive)
- [\_\_startKeepAlive](WDX.WS.Client.JS.Service.ClientService.md#__startkeepalive)
- [\_\_stopKeepAlive](WDX.WS.Client.JS.Service.ClientService.md#__stopkeepalive)
- [connect](WDX.WS.Client.JS.Service.ClientService.md#connect)
- [disconnect](WDX.WS.Client.JS.Service.ClientService.md#disconnect)
- [sendMessage](WDX.WS.Client.JS.Service.ClientService.md#sendmessage)

## Constructors

### constructor

• **new ClientService**(`wsClientConfiguration`): [`ClientService`](WDX.WS.Client.JS.Service.ClientService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `wsClientConfiguration` | [`Configuration`](../interfaces/WDX.WS.Client.JS.Configuration.Configuration.md) |

#### Returns

[`ClientService`](WDX.WS.Client.JS.Service.ClientService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:61

## Properties

### \_\_KEEPALIVE\_INTERVAL

• `Private` `Readonly` **\_\_KEEPALIVE\_INTERVAL**: `number` = `60000`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:32

___

### \_\_RECONNECT\_TIMEOUT

• `Private` `Readonly` **\_\_RECONNECT\_TIMEOUT**: `number` = `1000`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:34

___

### \_\_alarmService

• `Private` **\_\_alarmService**: [`AlarmService`](WDX.WS.Client.JS.Service.AlarmService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:53

___

### \_\_connection

• `Private` **\_\_connection**: `undefined` \| `connection`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:43

___

### \_\_dataService

• `Private` **\_\_dataService**: [`DataService`](WDX.WS.Client.JS.Service.DataService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:45

___

### \_\_incommingMessages

• `Private` **\_\_incommingMessages**: `Subject`\<`AbstractMessage`\>

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:57

___

### \_\_instanceService

• `Private` **\_\_instanceService**: [`InstanceService`](WDX.WS.Client.JS.Service.InstanceService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:49

___

### \_\_keepAliveTimeout

• `Private` **\_\_keepAliveTimeout**: `undefined` \| `Timeout`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:30

___

### \_\_runtimeService

• `Private` **\_\_runtimeService**: [`RuntimeService`](WDX.WS.Client.JS.Service.RuntimeService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:51

___

### \_\_scriptService

• `Private` **\_\_scriptService**: [`ScriptService`](WDX.WS.Client.JS.Service.ScriptService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:47

___

### \_\_status

• `Private` `Readonly` **\_\_status**: `BehaviorSubject`\<[`Status`](../enums/WDX.WS.Client.JS.Service.Status.md)\>

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:36

___

### \_\_trendService

• `Private` **\_\_trendService**: [`TrendService`](WDX.WS.Client.JS.Service.TrendService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:55

___

### \_\_wsClient

• `Private` **\_\_wsClient**: `undefined` \| `client`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:41

___

### \_\_wsClientConfiguration

• `Private` **\_\_wsClientConfiguration**: [`Configuration`](../interfaces/WDX.WS.Client.JS.Configuration.Configuration.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:39

## Accessors

### alarmService

• `get` **alarmService**(): [`AlarmService`](WDX.WS.Client.JS.Service.AlarmService.md)

#### Returns

[`AlarmService`](WDX.WS.Client.JS.Service.AlarmService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:246

___

### dataService

• `get` **dataService**(): [`DataService`](WDX.WS.Client.JS.Service.DataService.md)

#### Returns

[`DataService`](WDX.WS.Client.JS.Service.DataService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:260

___

### incommingMessages

• `get` **incommingMessages**(): `Subject`\<`AbstractMessage`\>

#### Returns

`Subject`\<`AbstractMessage`\>

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:241

___

### instanceService

• `get` **instanceService**(): [`InstanceService`](WDX.WS.Client.JS.Service.InstanceService.md)

#### Returns

[`InstanceService`](WDX.WS.Client.JS.Service.InstanceService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:274

___

### runtimeService

• `get` **runtimeService**(): [`RuntimeService`](WDX.WS.Client.JS.Service.RuntimeService.md)

#### Returns

[`RuntimeService`](WDX.WS.Client.JS.Service.RuntimeService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:281

___

### scriptService

• `get` **scriptService**(): [`ScriptService`](WDX.WS.Client.JS.Service.ScriptService.md)

#### Returns

[`ScriptService`](WDX.WS.Client.JS.Service.ScriptService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:267

___

### status

• `get` **status**(): `BehaviorSubject`\<[`Status`](../enums/WDX.WS.Client.JS.Service.Status.md)\>

#### Returns

`BehaviorSubject`\<[`Status`](../enums/WDX.WS.Client.JS.Service.Status.md)\>

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:237

___

### trendService

• `get` **trendService**(): [`TrendService`](WDX.WS.Client.JS.Service.TrendService.md)

#### Returns

[`TrendService`](WDX.WS.Client.JS.Service.TrendService.md)

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:253

## Methods

### \_\_getWsClientUrl

▸ **__getWsClientUrl**(): `string`

#### Returns

`string`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:120

___

### \_\_onError

▸ **__onError**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

`void`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:198

___

### \_\_onMessage

▸ **__onMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Message` |

#### Returns

`void`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:203

___

### \_\_onOpen

▸ **__onOpen**(`connection`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `connection` |

#### Returns

`void`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:153

___

### \_\_reconnect

▸ **__reconnect**(): `void`

#### Returns

`void`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:182

___

### \_\_sendKeepAlive

▸ **__sendKeepAlive**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:129

___

### \_\_startKeepAlive

▸ **__startKeepAlive**(): `void`

#### Returns

`void`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:133

___

### \_\_stopKeepAlive

▸ **__stopKeepAlive**(): `void`

#### Returns

`void`

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:146

___

### connect

▸ **connect**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:67

___

### disconnect

▸ **disconnect**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:231

___

### sendMessage

▸ **sendMessage**(`message`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `AbstractMessage` |

#### Returns

`Promise`\<`void`\>

#### Defined in

WDX/WS/Client/JS/Service/ClientService.ts:209
