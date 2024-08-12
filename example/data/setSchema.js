const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');
const WDXSchema = require('@wago/wdx-schema');

(async () => {
    try {
        const c = new WDXJSWSClient.ClientService();
        await c.connect({ protocol: 'ws', host: 'localhost', port: 4282 });

        console.log('Connected successfully');

        const schema = new WDXSchema.WDX.Schema.Model.Data.DataSchema(
            'Virtual.store.b',
            'b',
            'b',
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
