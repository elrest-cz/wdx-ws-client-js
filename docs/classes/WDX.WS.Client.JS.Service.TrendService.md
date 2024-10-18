[@wago/wdx-ws-client-js](../README.md) / [Exports](../modules.md) / [WDX](../modules/WDX.md) / [WS](../modules/WDX.WS.md) / [Client](../modules/WDX.WS.Client.md) / [JS](../modules/WDX.WS.Client.JS.md) / [Service](../modules/WDX.WS.Client.JS.Service.md) / TrendService

# Class: TrendService

[JS](../modules/WDX.WS.Client.JS.md).[Service](../modules/WDX.WS.Client.JS.Service.md).TrendService

## Hierarchy

- [`AbstractAPIService`](WDX.WS.Client.JS.Service.AbstractAPIService.md)

  ↳ **`TrendService`**

## Table of contents

### Constructors

- [constructor](WDX.WS.Client.JS.Service.TrendService.md#constructor)

### Properties

- [\_clientService](WDX.WS.Client.JS.Service.TrendService.md#_clientservice)

### Methods

- [delete](WDX.WS.Client.JS.Service.TrendService.md#delete)
- [detail](WDX.WS.Client.JS.Service.TrendService.md#detail)
- [list](WDX.WS.Client.JS.Service.TrendService.md#list)
- [register](WDX.WS.Client.JS.Service.TrendService.md#register)
- [save](WDX.WS.Client.JS.Service.TrendService.md#save)
- [unregister](WDX.WS.Client.JS.Service.TrendService.md#unregister)

## Constructors

### constructor

• **new TrendService**(`clientService`): [`TrendService`](WDX.WS.Client.JS.Service.TrendService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientService` | [`ClientService`](WDX.WS.Client.JS.Service.ClientService.md) |

#### Returns

[`TrendService`](WDX.WS.Client.JS.Service.TrendService.md)

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

### delete

▸ **delete**(`id`): `Observable`\<`Trend`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Observable`\<`Trend`\>

#### Defined in

WDX/WS/Client/JS/Service/TrendService.ts:14

___

### detail

▸ **detail**(`id`): `Observable`\<`Trend`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Observable`\<`Trend`\>

#### Defined in

WDX/WS/Client/JS/Service/TrendService.ts:42

___

### list

▸ **list**(`active?`): `Observable`\<`Trend`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `active?` | `boolean` |

#### Returns

`Observable`\<`Trend`[]\>

#### Defined in

WDX/WS/Client/JS/Service/TrendService.ts:98

___

### register

▸ **register**(`id`): `Observable`\<`GraphData`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Observable`\<`GraphData`\>

#### Defined in

WDX/WS/Client/JS/Service/TrendService.ts:153

___

### save

▸ **save**(`alarm`): `Observable`\<`Trend`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alarm` | `Trend` |

#### Returns

`Observable`\<`Trend`\>

#### Defined in

WDX/WS/Client/JS/Service/TrendService.ts:71

___

### unregister

▸ **unregister**(`id`): `Observable`\<`undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Observable`\<`undefined`\>

#### Defined in

WDX/WS/Client/JS/Service/TrendService.ts:127
