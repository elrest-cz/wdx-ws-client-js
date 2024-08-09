(async () => {
    try {
        const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');
        const WDXSchema = require('@wago/wdx-schema');
        const floors = 15;
        const rooms = 12;

        const c = new WDXJSWSClient.ClientService();

        await c.connect({ protocol: 'ws', host: 'localhost', port: 4282 });

        console.log('Connected successfully');

        for (let floor = 1; floor <= floors; floor++) {
            for (let room = 1; room <= rooms; room++) {

                const name = `hotel-light-floor-${floor}-room-${room}`;

                console.log('Schema for room for floor ' + floor + ' at ' + room);
                await c.dataService.setSchema(new WDXSchema.WDX.Schema.Model.Data.DataSchema(
                    `Virtual.${name}.color`,
                    'color',
                    'color',
                    undefined,
                    new WDXSchema.WDX.Schema.Model.Data.MetaData.MetaDataVirtual(),
                    false,
                    true,
                    true,
                    false,
                    true,
                    true,
                )).toPromise();

                await c.dataService.setSchema(new WDXSchema.WDX.Schema.Model.Data.DataSchema(
                    `Virtual.${name}.switch`,
                    'switch',
                    'switch',
                    undefined,
                    new WDXSchema.WDX.Schema.Model.Data.MetaData.MetaDataVirtual(),
                    false,
                    true,
                    true,
                    false,
                    true,
                    true,
                )).toPromise();

            }
        }
        await c.disconnect();

    } catch (e) {
        console.error('Error: ' + e.message);
        console.error('Error: ' + e.stack);
    }
})();
