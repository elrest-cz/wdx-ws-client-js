# WDX - WS - Client - JS

A TypeScript Web Socket Library providing services for Managing WDX instance.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Using Client](#using-client)
- [API](https://github.com/elrest-cz/wdx-ws-client-js/blob/master/docs/modules.md)
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


For more examples, see github repository example [directory](https://github.com/elrest-cz/wdx-ws-client-js/tree/master/examples).

## License

This library is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License). See the [LICENSE.md](https://github.com/elrest-cz/wdx-ws-client-js/blob/master/LICENSE.md) file for more details.

© 2024 

This `README.md` provides a clear introduction to the TypeScript model schema library, with examples of how to use it, and includes the required copyright and licensing information under the MIT License.