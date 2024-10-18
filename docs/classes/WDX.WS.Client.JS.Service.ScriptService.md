[@wago/wdx-ws-client-js](../README.md) / [Exports](../modules.md) / [WDX](../modules/WDX.md) / [WS](../modules/WDX.WS.md) / [Client](../modules/WDX.WS.Client.md) / [JS](../modules/WDX.WS.Client.JS.md) / [Service](../modules/WDX.WS.Client.JS.Service.md) / ScriptService

# Class: ScriptService

[JS](../modules/WDX.WS.Client.JS.md).[Service](../modules/WDX.WS.Client.JS.Service.md).ScriptService

## Hierarchy

- [`AbstractAPIService`](WDX.WS.Client.JS.Service.AbstractAPIService.md)

  ↳ **`ScriptService`**

## Table of contents

### Constructors

- [constructor](WDX.WS.Client.JS.Service.ScriptService.md#constructor)

### Properties

- [\_clientService](WDX.WS.Client.JS.Service.ScriptService.md#_clientservice)

### Methods

- [delete](WDX.WS.Client.JS.Service.ScriptService.md#delete)
- [list](WDX.WS.Client.JS.Service.ScriptService.md#list)
- [save](WDX.WS.Client.JS.Service.ScriptService.md#save)

## Constructors

### constructor

• **new ScriptService**(`clientService`): [`ScriptService`](WDX.WS.Client.JS.Service.ScriptService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientService` | [`ClientService`](WDX.WS.Client.JS.Service.ClientService.md) |

#### Returns

[`ScriptService`](WDX.WS.Client.JS.Service.ScriptService.md)

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

▸ **delete**(`entry`): `Observable`\<`Entry`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entry` | `Entry` |

#### Returns

`Observable`\<`Entry`\>

#### Defined in

WDX/WS/Client/JS/Service/ScriptService.ts:75

___

### list

▸ **list**(`path`, `level?`): `Observable`\<`Entry`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `path` | `string` | `undefined` |
| `level` | `number` | `WDXSchema.WDX.Schema.Model.Script.BROWSE_DEFAULT_LEVEL` |

#### Returns

`Observable`\<`Entry`\>

#### Defined in

WDX/WS/Client/JS/Service/ScriptService.ts:16

___

### save

▸ **save**(`entry`): `Observable`\<`Entry`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entry` | `Entry` |

#### Returns

`Observable`\<`Entry`\>

#### Defined in

WDX/WS/Client/JS/Service/ScriptService.ts:47
