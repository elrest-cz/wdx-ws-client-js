
(async () => {
    try {
        const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');

        const c = new WDXJSWSClient.ClientService();
        await c.connect({ protocol: 'ws', host: 'localhost', port: 4282 });
        console.log('Connected successfully');

        c.instanceService.list().subscribe(
            {
                next: (list) => {
                    console.log(list);
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
