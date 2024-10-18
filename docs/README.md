@wago/wdx-ws-client-js / [Exports](modules.md)

# WDX - WS - Client - JS

A TypeScript model Library library for handling class models as schema library distributed with exported classes, interfaces, and enumerations. This library allows you to use WDX Schema models using TypeScript classes and reference models in a structured manner.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Using Client](#using-client)
- [API](docs/modules.md)
- [Requirements](#Requirements)
- [License](#license)

## Installation

To install the library, use npm or yarn:

```bash
npm install @wago/wdx-ws-client-js
```

or

```bash
yarn add @wago/wdx-ws-client-js
```

## Usage

### Using Client

Here's an example:

```typescript

const WDXWSClient = require('@wago/wdx-ws-client-js');

(async () => {
    try {
        const c = new WDXWSClient.WDX.WS.Client.JS.Service.ClientService(
            { protocol: 'ws', host: 'localhost', port: 82 }
        );
        await c.connect();

        console.log('Connected successfully');

        const path = 'Virtual.virtual-store.test';

        c.dataService.getSchema(path, 1).subscribe(
            {
                next: (schema) => {
                    console.log(JSON.stringify(schema, null, 2));
                },

                error: async (error) => {
                    console.error('Error: ' + error.message);

                    await c.disconnect();
                    console.log('Disconnected successfully');
                },

                complete: async () => {
                    await c.disconnect();
                    console.log('Disconnected successfully');
                }
            },
        );

    } catch (e) {
        console.error('Error: ' + e.message);
        console.error('Error: ' + e.stack);
    }
})();
```

For more examples, see github repository example [directory](examples).

## License

This library is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License). See the [LICENSE.md](LICENSE.md) file for more details.

© 2024 

This `README.md` provides a clear introduction to the TypeScript model schema library, with examples of how to use it, and includes the required copyright and licensing information under the MIT License.
