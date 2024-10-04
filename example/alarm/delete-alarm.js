
const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');


(async () => {
    try {
        const c = new WDXJSWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
        await c.connect();
        console.log('Connected successfully');


        c.alarmService.deleteAlarm(2).subscribe(
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
