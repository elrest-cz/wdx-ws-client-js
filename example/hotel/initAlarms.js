(async () => {
    try {
        const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');
        const WDXSchema = require('@wago/wdx-schema');
        const floors = 15;
        const rooms = 12;
        let alarmNumber=1000;

        const c = new WDXJSWSClient.ClientService();

        await c.connect({ protocol: 'ws', host: 'localhost', port: 4282 });

        console.log('Connected successfully');

        for (let floor = 1; floor <= floors; floor++) {
            for (let room = 1; room <= rooms; room++) {

                const name = `alarm-hotel-light-floor-${floor}-room-${room}-no-empty`;

                let alarm = new WDXSchema.WDX.Schema.Model.Alarm.Alarm(
                    undefined,
                    name,
                    true,
                    'alarm-hotel-light-floor-${floor}-room-${room}-no-empty color changed',
                    'alarm-hotel-light-floor-${floor}-room-${room}-no-empty color reseted',
                    ++alarmNumber,
                    WDXSchema.WDX.Schema.Model.Alarm.AlarmType.INFO_WITHOUT_ACK,
                );

                alarm.conditions.push(
                    new WDXSchema.WDX.Schema.Model.Alarm.AlarmCondition(
                        `Virtual.hotel-light-floor-${floor}-room-${room}.color`,
                        WDXSchema.WDX.Schema.Model.Alarm.AlarmConditionExpression.IS_NOT_EMPTY
                    ));

                alarm = await c.alarmService.saveAlarm(alarm).toPromise();

                console.log('Alarm for room for floor ' + floor + ' at ' + room, alarm.id);
            }
        }
        await c.disconnect();

    } catch (e) {
        console.error('Error: ' + e.message);
        console.error('Error: ' + e.stack);
    }
})();
