
/**
 * Elrest - WDX - WS - Client - JS - Example - Instance List
 * 
 * Retrieves Instances list from WDX with WS client.
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */

const WDXWSClient = require('@wago/wdx-ws-client-js');

(async () => {
    try {
        const c = new WDXWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });

        await c.connect();
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
