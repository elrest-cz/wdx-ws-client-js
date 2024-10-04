const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');

(async () => {
    try {
        const c = new WDXJSWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
        await c.connect();

        console.log('Connected successfully');

        const path = 'Virtual.store.ccccc';
        //const path = 'Virtual.store.bbbbb';
        //const path = 'Virtual.storeaa.bbbbb';

        c.dataService.deleteSchema(path).subscribe(
            {
                next: (response) => {
                    console.log(response);
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
