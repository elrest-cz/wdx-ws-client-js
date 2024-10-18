[@wago/wdx-ws-client-js](../README.md) / [Exports](../modules.md) / [WDX](../modules/WDX.md) / [WS](../modules/WDX.WS.md) / [Client](../modules/WDX.WS.Client.md) / [JS](../modules/WDX.WS.Client.JS.md) / [Service](../modules/WDX.WS.Client.JS.Service.md) / DataService

# Class: DataService

[JS](../modules/WDX.WS.Client.JS.md).[Service](../modules/WDX.WS.Client.JS.Service.md).DataService

## Hierarchy

- [`AbstractAPIService`](WDX.WS.Client.JS.Service.AbstractAPIService.md)

  ↳ **`DataService`**

## Table of contents

### Constructors

- [constructor](WDX.WS.Client.JS.Service.DataService.md#constructor)

### Properties

- [\_clientService](WDX.WS.Client.JS.Service.DataService.md#_clientservice)

### Methods

- [deleteSchema](WDX.WS.Client.JS.Service.DataService.md#deleteschema)
- [getSchema](WDX.WS.Client.JS.Service.DataService.md#getschema)
- [getValue](WDX.WS.Client.JS.Service.DataService.md#getvalue)
- [refreshSchema](WDX.WS.Client.JS.Service.DataService.md#refreshschema)
- [register](WDX.WS.Client.JS.Service.DataService.md#register)
- [registerDataSchemaChanges](WDX.WS.Client.JS.Service.DataService.md#registerdataschemachanges)
- [setSchema](WDX.WS.Client.JS.Service.DataService.md#setschema)
- [setValue](WDX.WS.Client.JS.Service.DataService.md#setvalue)
- [unregister](WDX.WS.Client.JS.Service.DataService.md#unregister)
- [unregisterDataSchemaChanges](WDX.WS.Client.JS.Service.DataService.md#unregisterdataschemachanges)

## Constructors

### constructor

• **new DataService**(`clientService`): [`DataService`](WDX.WS.Client.JS.Service.DataService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientService` | [`ClientService`](WDX.WS.Client.JS.Service.ClientService.md) |

#### Returns

[`DataService`](WDX.WS.Client.JS.Service.DataService.md)

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

### deleteSchema

▸ **deleteSchema**(`path`): `Observable`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Observable`\<`string`\>

#### Defined in

WDX/WS/Client/JS/Service/DataService.ts:14

___

### getSchema

▸ **getSchema**(`path`, `level?`): `Observable`\<`DataSchema`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `path` | `string` | `undefined` |
| `level` | `number` | `WDXSchema.WDX.Schema.Model.Data.GetSchemaRequestBody.DEFAULT_LEVEL` |

#### Returns

`Observable`\<`DataSchema`\>

#### Defined in

WDX/WS/Client/JS/Service/DataService.ts:91

___

### getValue

▸ **getValue**(`path`): `Observable`\<``null`` \| `DataValue`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Observable`\<``null`` \| `DataValue`\>

#### Defined in

WDX/WS/Client/JS/Service/DataService.ts:229

___

### refreshSchema

▸ **refreshSchema**(`path`): `Observable`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Observable`\<`string`\>

#### Defined in

WDX/WS/Client/JS/Service/DataService.ts:39

___

### register

▸ **register**(`path`, `refreshMin?`, `refreshMax?`, `delta?`): `Observable`\<``null`` \| `DataValue`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `path` | `string` | `undefined` |
| `refreshMin` | `number` | `1000` |
| `refreshMax` | `number` | `0` |
| `delta?` | `number` | `undefined` |

#### Returns

`Observable`\<``null`` \| `DataValue`\>

#### Defined in

WDX/WS/Client/JS/Service/DataService.ts:147

___

### registerDataSchemaChanges

▸ **registerDataSchemaChanges**(): `Observable`\<`DataSchema`\>

#### Returns

`Observable`\<`DataSchema`\>

#### Defined in

WDX/WS/Client/JS/Service/DataService.ts:178

___

### setSchema

▸ **setSchema**(`schema`): `Observable`\<`DataSchema`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `DataSchema` |

#### Returns

`Observable`\<`DataSchema`\>

#### Defined in

WDX/WS/Client/JS/Service/DataService.ts:64

___

### setValue

▸ **setValue**(`path`, `value`): `Observable`\<``null`` \| `DataValue`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `value` | `any` |

#### Returns

`Observable`\<``null`` \| `DataValue`\>

#### Defined in

WDX/WS/Client/JS/Service/DataService.ts:252

___

### unregister

▸ **unregister**(`path`): `Observable`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Observable`\<`string`\>

#### Defined in

WDX/WS/Client/JS/Service/DataService.ts:122

___

### unregisterDataSchemaChanges

▸ **unregisterDataSchemaChanges**(): `Observable`\<``null``\>

#### Returns

`Observable`\<``null``\>

#### Defined in

WDX/WS/Client/JS/Service/DataService.ts:202
