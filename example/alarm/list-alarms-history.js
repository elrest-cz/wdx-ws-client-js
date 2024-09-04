
const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');


(async () => {
    try {
        const c = new WDXJSWSClient.ClientService();
        await c.connect({ protocol: 'ws', host: 'localhost', port: 4282 });
        console.log('Connected successfully');


        c.alarmService.listAlarmHistory(1).subscribe(
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