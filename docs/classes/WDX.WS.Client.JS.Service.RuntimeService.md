[@wago/wdx-ws-client-js](../README.md) / [Exports](../modules.md) / [WDX](../modules/WDX.md) / [WS](../modules/WDX.WS.md) / [Client](../modules/WDX.WS.Client.md) / [JS](../modules/WDX.WS.Client.JS.md) / [Service](../modules/WDX.WS.Client.JS.Service.md) / RuntimeService

# Class: RuntimeService

[JS](../modules/WDX.WS.Client.JS.md).[Service](../modules/WDX.WS.Client.JS.Service.md).RuntimeService

## Hierarchy

- [`AbstractAPIService`](WDX.WS.Client.JS.Service.AbstractAPIService.md)

  ↳ **`RuntimeService`**

## Table of contents

### Constructors

- [constructor](WDX.WS.Client.JS.Service.RuntimeService.md#constructor)

### Properties

- [\_clientService](WDX.WS.Client.JS.Service.RuntimeService.md#_clientservice)

### Methods

- [monitorSubscribe](WDX.WS.Client.JS.Service.RuntimeService.md#monitorsubscribe)
- [monitorUnsubscribe](WDX.WS.Client.JS.Service.RuntimeService.md#monitorunsubscribe)

## Constructors

### constructor

• **new RuntimeService**(`clientService`): [`RuntimeService`](WDX.WS.Client.JS.Service.RuntimeService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientService` | [`ClientService`](WDX.WS.Client.JS.Service.ClientService.md) |

#### Returns

[`RuntimeService`](WDX.WS.Client.JS.Service.RuntimeService.md)

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

### monitorSubscribe

▸ **monitorSubscribe**(): `Observable`\<`Report`\>

#### Returns

`Observable`\<`Report`\>

#### Defined in

WDX/WS/Client/JS/Service/RuntimeService.ts:15

___

### monitorUnsubscribe

▸ **monitorUnsubscribe**(): `Observable`\<``null``\>

#### Returns

`Observable`\<``null``\>

#### Defined in

WDX/WS/Client/JS/Service/RuntimeService.ts:54
