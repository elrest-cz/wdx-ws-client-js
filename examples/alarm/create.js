/**
 * Elrest - WDX - WS - Client - JS - Example - Create Alarm
 * 
 * Creates a new alarm in WDX with WS client.
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */

const WDXWSClient = require('@wago/wdx-ws-client-js');
const WDXWSClientConfiguration = require('../configuration/configuration.js');
const WDXSchema = require('@wago/wdx-schema');

(async () => {
    try {
        const c = new WDXWSClient.WDX.WS.Client.JS.Service.ClientService(
            WDXWSClientConfiguration.wsConfiguration
        );
        console.log('Connecting');
        await c.connect();
        console.log('Connected successfully');

        const alarm = new WDXSchema.WDX.Schema.Model.Alarm.Alarm(
            'WDX - Examples - Alarm variable no empty',//name
            true,//active
            3335, // number
            WDXSchema.WDX.Schema.Model.Alarm.AlarmType.ERROR_WITHOUT_ACK,//type
            [
                new WDXSchema.WDX.Schema.Model.Alarm.AlarmCondition(

                ),
            ]
        );

        alarm.conditions.push(
            new WDXSchema.WDX.Schema.Model.Alarm.AlarmCondition(
                'Virtual.virtua-store.test',
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

    } catch (e) {
        console.error('Error: ' + e.message);
        //console.error('Error: ' + e.stack);
    }
})();
