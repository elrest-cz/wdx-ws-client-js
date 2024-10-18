const WDXJSWSClientConfiguration = require('../build/WDX//Client//WS/Configuration/Configuration');
const WDXJSWSClient = require('../build/WDX//Client//WS/Service/ClientService');


(async () => {
    try {
        const c = new WDXJSWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
        await c.connect();

        console.log('Connected successfully');

        await c.disconnect();

        c.runtimeService.monitorSubscribe().subscribe(
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

        /**
        c.dataService.getSchema('').subscribe((data) => {
            console.log(data);
        },);
         */


    } catch (e) {
        console.error('Error: ' + e.message);
    }



})();
