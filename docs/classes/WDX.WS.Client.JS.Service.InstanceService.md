[@wago/wdx-ws-client-js](../README.md) / [Exports](../modules.md) / [WDX](../modules/WDX.md) / [WS](../modules/WDX.WS.md) / [Client](../modules/WDX.WS.Client.md) / [JS](../modules/WDX.WS.Client.JS.md) / [Service](../modules/WDX.WS.Client.JS.Service.md) / InstanceService

# Class: InstanceService

[JS](../modules/WDX.WS.Client.JS.md).[Service](../modules/WDX.WS.Client.JS.Service.md).InstanceService

## Hierarchy

- [`AbstractAPIService`](WDX.WS.Client.JS.Service.AbstractAPIService.md)

  ↳ **`InstanceService`**

## Table of contents

### Constructors

- [constructor](WDX.WS.Client.JS.Service.InstanceService.md#constructor)

### Properties

- [\_clientService](WDX.WS.Client.JS.Service.InstanceService.md#_clientservice)

### Methods

- [delete](WDX.WS.Client.JS.Service.InstanceService.md#delete)
- [detail](WDX.WS.Client.JS.Service.InstanceService.md#detail)
- [list](WDX.WS.Client.JS.Service.InstanceService.md#list)
- [logSubscribe](WDX.WS.Client.JS.Service.InstanceService.md#logsubscribe)
- [logUnsubscribe](WDX.WS.Client.JS.Service.InstanceService.md#logunsubscribe)
- [restart](WDX.WS.Client.JS.Service.InstanceService.md#restart)
- [save](WDX.WS.Client.JS.Service.InstanceService.md#save)
- [start](WDX.WS.Client.JS.Service.InstanceService.md#start)
- [stop](WDX.WS.Client.JS.Service.InstanceService.md#stop)
- [whois](WDX.WS.Client.JS.Service.InstanceService.md#whois)

## Constructors

### constructor

• **new InstanceService**(`clientService`): [`InstanceService`](WDX.WS.Client.JS.Service.InstanceService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientService` | [`ClientService`](WDX.WS.Client.JS.Service.ClientService.md) |

#### Returns

[`InstanceService`](WDX.WS.Client.JS.Service.InstanceService.md)

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

▸ **delete**(`uuid`): `Observable`\<`Instance`\>

Starts eDesign Instance instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |

#### Returns

`Observable`\<`Instance`\>

#### Defined in

WDX/WS/Client/JS/Service/InstanceService.ts:17

___

### detail

▸ **detail**(`uuid`): `Observable`\<`Instance`\>

Starts eDesign Instance instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |

#### Returns

`Observable`\<`Instance`\>

#### Defined in

WDX/WS/Client/JS/Service/InstanceService.ts:178

___

### list

▸ **list**(`status?`): `Observable`\<`Instance`[]\>

Lists eDesign Instances

#### Parameters

| Name | Type |
| :------ | :------ |
| `status?` | `Status` |

#### Returns

`Observable`\<`Instance`[]\>

#### Defined in

WDX/WS/Client/JS/Service/InstanceService.ts:115

___

### logSubscribe

▸ **logSubscribe**(`uuid`): `Observable`\<`LogMessageBody`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |

#### Returns

`Observable`\<`LogMessageBody`\>

#### Defined in

WDX/WS/Client/JS/Service/InstanceService.ts:42

___

### logUnsubscribe

▸ **logUnsubscribe**(`uuid`): `Observable`\<``null``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |

#### Returns

`Observable`\<``null``\>

#### Defined in

WDX/WS/Client/JS/Service/InstanceService.ts:81

___

### restart

▸ **restart**(`uuid`): `Observable`\<`Instance`\>

Restart eDesign Instance instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |

#### Returns

`Observable`\<`Instance`\>

#### Defined in

WDX/WS/Client/JS/Service/InstanceService.ts:239

___

### save

▸ **save**(`instance`): `Observable`\<`Instance`\>

Save eDesign Instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `Instance` |

#### Returns

`Observable`\<`Instance`\>

#### Defined in

WDX/WS/Client/JS/Service/InstanceService.ts:306

___

### start

▸ **start**(`uuid`): `Observable`\<`Instance`\>

Starts eDesign Instance instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |

#### Returns

`Observable`\<`Instance`\>

#### Defined in

WDX/WS/Client/JS/Service/InstanceService.ts:147

___

### stop

▸ **stop**(`uuid`): `Observable`\<`Instance`\>

Stops eDesign Runtime Instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | `string` |

#### Returns

`Observable`\<`Instance`\>

#### Defined in

WDX/WS/Client/JS/Service/InstanceService.ts:207

___

### whois

▸ **whois**(`name`): `Observable`\<`Instance`\>

Save eDesign Instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Observable`\<`Instance`\>

#### Defined in

WDX/WS/Client/JS/Service/InstanceService.ts:274
