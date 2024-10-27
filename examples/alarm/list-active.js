/**
 * Elrest - WDX - WS - Client - JS - Example - List Active Alarm
 * 
 * Retrieve list of active alarms from WDX with WS client.
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

        c.alarmService.listAlarms(true).subscribe(
            {
                next: (update) => {
                    console.log('Response');
                    console.log(JSON.stringify(alarm, null, 2));
                },

                error: async (error) => {
                    console.error('Error Code: ' + error.code);
                    console.error('Error Message: ' + error.message);

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

        // or const alarms=await c.alarmService.listAlarms(true).toPromise(); in try/catch mode

    } catch (e) {
        console.error('Error: ' + e.message);
        //console.error('Error: ' + e.stack);
    }
})();
