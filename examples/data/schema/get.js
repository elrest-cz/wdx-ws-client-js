/**
 * Elrest - WDX - WS - Client - JS - Example - Data Get Schema
 * 
 * Retrieves Data Schema for given path with childrens to given level from WDX with WS client.
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */

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
