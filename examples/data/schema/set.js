/**
 * Elrest - WDX - WS - Client - JS - Example - Refresh Data Schema
 * 
 * Refreshes Data Schema for given path from WDX with WS client. Usable when data is connected WDX - Data Adapter to IOT which dynamically changes data schema.
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */

const WDXWSClient = require('@wago/wdx-ws-client-js');
const WDXSchema = require('@wago/wdx-schema');

(async () => {
    try {
        const c = new WDXWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
        await c.connect();

        console.log('Connected successfully');

        const schema = new WDXSchema.WDX.Schema.Model.Data.DataSchema(
            'Virtual.storesss.ccccc',
            'ccccc',
            'ccccc',
            undefined,
            new WDXSchema.WDX.Schema.Model.Data.MetaData.MetaDataVirtual(),
            false,
            true,
            true,
            false,
            true,
            true,
        );

        c.dataService.setSchema(schema).subscribe(
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
