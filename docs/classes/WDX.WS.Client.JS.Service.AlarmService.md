[@wago/wdx-ws-client-js](../README.md) / [Exports](../modules.md) / [WDX](../modules/WDX.md) / [WS](../modules/WDX.WS.md) / [Client](../modules/WDX.WS.Client.md) / [JS](../modules/WDX.WS.Client.JS.md) / [Service](../modules/WDX.WS.Client.JS.Service.md) / AlarmService

# Class: AlarmService

[JS](../modules/WDX.WS.Client.JS.md).[Service](../modules/WDX.WS.Client.JS.Service.md).AlarmService

## Hierarchy

- [`AbstractAPIService`](WDX.WS.Client.JS.Service.AbstractAPIService.md)

  ↳ **`AlarmService`**

## Table of contents

### Constructors

- [constructor](WDX.WS.Client.JS.Service.AlarmService.md#constructor)

### Properties

- [\_clientService](WDX.WS.Client.JS.Service.AlarmService.md#_clientservice)

### Methods

- [deleteAlarm](WDX.WS.Client.JS.Service.AlarmService.md#deletealarm)
- [detailAlarm](WDX.WS.Client.JS.Service.AlarmService.md#detailalarm)
- [listAlarmHistory](WDX.WS.Client.JS.Service.AlarmService.md#listalarmhistory)
- [listAlarms](WDX.WS.Client.JS.Service.AlarmService.md#listalarms)
- [register](WDX.WS.Client.JS.Service.AlarmService.md#register)
- [saveAlarm](WDX.WS.Client.JS.Service.AlarmService.md#savealarm)
- [unregister](WDX.WS.Client.JS.Service.AlarmService.md#unregister)

## Constructors

### constructor

• **new AlarmService**(`clientService`): [`AlarmService`](WDX.WS.Client.JS.Service.AlarmService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientService` | [`ClientService`](WDX.WS.Client.JS.Service.ClientService.md) |

#### Returns

[`AlarmService`](WDX.WS.Client.JS.Service.AlarmService.md)

#### Inherited from

[AbstractAPIService](WDX.WS.Client.JS.Service.AbstractAPIService.md).[constructor](WDX.WS.Client.JS.Service.AbstractAPIService.md#constructor)

#### Defined in

WDX/WS/Client/JS/Service/AbstractAPIService.ts:15

## Properties

### \_clientService

• `Protected` **\_clientService**: [`ClientService`](WDX.WS.Client.JS.Service.ClientService.md)

#### Inherited from

[AbstractAPIService](WDX.WS.Client.JS.Service.AbstractAPIService.md).[_clientService](WDX.WS.Client.JS.Service.AbstractAPIService.md#_clientservice)

#### Defined in

WDX/WS/Client/JS/Service/AbstractAPIService.ts:13

## Methods

### deleteAlarm

▸ **deleteAlarm**(`id`): `Observable`\<`Alarm`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Observable`\<`Alarm`\>

#### Defined in

WDX/WS/Client/JS/Service/AlarmService.ts:20

___

### detailAlarm

▸ **detailAlarm**(`id`): `Observable`\<`Alarm`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Observable`\<`Alarm`\>

#### Defined in

WDX/WS/Client/JS/Service/AlarmService.ts:47

___

### listAlarmHistory

▸ **listAlarmHistory**(`alarmId?`): `Observable`\<`AlarmHistory`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alarmId?` | `number` |

#### Returns

`Observable`\<`AlarmHistory`[]\>

#### Defined in

WDX/WS/Client/JS/Service/AlarmService.ts:130

___

### listAlarms

▸ **listAlarms**(`active?`): `Observable`\<`Alarm`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `active?` | `boolean` |

#### Returns

`Observable`\<`Alarm`[]\>

#### Defined in

WDX/WS/Client/JS/Service/AlarmService.ts:101

___

### register

▸ **register**(): `Observable`\<`undefined` \| `Alarm`\>

#### Returns

`Observable`\<`undefined` \| `Alarm`\>

#### Defined in

WDX/WS/Client/JS/Service/AlarmService.ts:185

___

### saveAlarm

▸ **saveAlarm**(`alarm`): `Observable`\<`Alarm`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alarm` | `Alarm` |

#### Returns

`Observable`\<`Alarm`\>

#### Defined in

WDX/WS/Client/JS/Service/AlarmService.ts:74

___

### unregister

▸ **unregister**(): `Observable`\<`undefined`\>

#### Returns

`Observable`\<`undefined`\>

#### Defined in

WDX/WS/Client/JS/Service/AlarmService.ts:160
