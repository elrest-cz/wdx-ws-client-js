/**
 * Elrest - WDX - WS - Client - JS - Example - List Alarms
 * 
 * Retrieve Alarms list from WDX with WS client.
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */

const WDXJSWSClient = require('../../build/WDX/WS/Client/JS/Service/ClientService');

(async () => {
    try {
        const c = new WDXJSWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
        await c.connect();
        console.log('Connected successfully');

        c.alarmService.listAlarms().subscribe(
            {
                next: (update) => {
                    console.log(JSON.stringify(update, null, 2));
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
        //console.error('Error: ' + e.stack);
    }
})();