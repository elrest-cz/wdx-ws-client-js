(async () => {
    try {
        const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');
        const WDXSchema = require('@wago/wdx-schema');
        const WDXUUID = require('uuid');
        const floors = 15;
        const rooms = 12;

        const c = new WDXJSWSClient.ClientService();

        await c.connect({ protocol: 'ws', host: 'localhost', port: 4282 });

        console.log('Connected successfully');

        for (let floor = 1; floor <= floors; floor++) {
            for (let room = 1; room <= rooms; room++) {
                console.log('Initiating room for floor ' + floor + ' at ' + room);

                const uuid = WDXUUID.v4();
                const name=`hotel-light-floor-${floor}-room-${room}`;
                const instance = new WDXSchema.WDX.Schema.Model.Instance.DataAdapter.VirtualDataAdapterInstance(
                    uuid,
                    name,
                );
                console.log('Saving room for floor ' + floor + ' at ' + room);
                await c.instanceService.save(instance).toPromise();

                console.log('Starting room for floor ' + floor + ' at ' + room);
                await c.instanceService.start(uuid).toPromise();

            }
        }

        await c.disconnect();

    } catch (e) {
        console.error('Error: ' + e.message);
        console.error('Error: ' + e.stack);
    }
})();
