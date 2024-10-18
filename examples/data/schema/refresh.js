/**
 * Elrest - WDX - WS - Client - JS - Example - Refresh Data Schema
 * 
 * Refreshes Data Schema for given path from WDX with WS client. Usable when data is connected WDX - Data Adapter to IOT which dynamically changes data schema.
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */

const WDXJSWSClient = require('../../build/WDX/WS/Client/JS/Service/ClientService');

(async () => {
    try {
        const c = new WDXJSWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
        await c.connect();

        console.log('Connected successfully');

        const path = 'MQTT.some-instance';

        c.dataService.refreshSchema(path).subscribe(
            {
                next: (response) => {
                    console.log(response);
                },

                error: async (error) => {
                    console.error('Error: ' + JSON.stringify(error));

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
