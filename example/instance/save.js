(async () => {
    try {
        const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');
        const WDXSchema = require('@wago/wdx-schema');

        const c = new WDXJSWSClient.ClientService();

        await c.connect({ protocol: 'ws', host: 'localhost', port: 4282 });

        console.log('Connected successfully');

        const instance = new WDXSchema.WDX.Schema.Model.Instance.DataAdapter.VirtualDataAdapterInstance(
            '1d64e8c4-53d7-11ef-b262-088fc37eff34',
            'Calibration',
        );
        c.instanceService.save(instance).subscribe(
            {
                next: (instance) => {
                    console.log(instance);
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
