/**
 * Elrest - WDX - WS - Client - JS - Example - Create Alarm
 * 
 * Creates a new alarm in WDX with WS client.
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */

const WDXJSWSClient = require('../../build/WDX/WS/Client/JS/Service/ClientService');
const WDXSchema = require('@wago/wdx-schema');

(async () => {
    try {

        const c = new WDXJSWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
        await c.connect();
        console.log('Connected successfully');

        const alarm = new WDXSchema.WDX.Schema.Model.Alarm.Alarm(
            undefined,
            'adds sdds',
            true,
            'adds sdds sd',
            3335,
        );
        alarm.conditions.push(
            new WDXSchema.WDX.Schema.Model.Alarm.AlarmCondition(
                'Virtual.store.b',
                WDXSchema.WDX.Schema.Model.Alarm.AlarmConditionExpression.EQUALS,
                1
            ),
        );

        c.alarmService.saveAlarm(alarm).subscribe(
            {
                next: (alarm) => {
                    console.log(JSON.stringify(alarm, null, 2));
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
