/**
 * Elrest - WDX - WS - Client - JS - Example - Delete Alarm
 * 
 * Deletes alarm in WDX with WS client.
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */

const WDXWSClient = require('@wago/wdx-ws-client-js');
const WDXWSClientConfiguration = require('../configuration/configuration.js');

(async () => {
    try {
        const c = new WDXWSClient.WDX.WS.Client.JS.Service.ClientService(
            WDXWSClientConfiguration.wsConfiguration
        );
        console.log('Connecting');
        await c.connect();
        console.log('Connected successfully');

        c.alarmService.deleteAlarm(1).subscribe(
            {
                next: (alarm) => {
                    console.log(JSON.stringify(alarm, null, 2));
                },

                error: async (error) => {
                    console.error('Error:', JSON.stringify(error, null, 2));

                    console.log('Disconnecting');
                    await c.disconnect();
                    console.log('Disconnected successfully');
                },

                complete: async () => {
                    console.log('Completed');

                    console.log('Disconnecting');
                    await c.disconnect();
                    console.log('Disconnected successfully');
                }
            },
        );

        // or const alarm=await c.alarmService.deleteAlarm(1).toPromise(); in try/catch mode

    } catch (e) {
        console.error('Error: ' + e.message);
        //console.error('Error: ' + e.stack);
    }
})();
