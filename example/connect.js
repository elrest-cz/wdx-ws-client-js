(async () => {
    try {
        const WDXJSWSClient = require('../build/WDX/Client/WS/Service/ClientService');
        const c = new WDXJSWSClient.ClientService();
        await c.connect({ protocol: 'ws', host: 'localhost', port: 4282 },);

        console.log('Connected successfully');

        await c.disconnect();


        /**
        c.dataService.getSchema('').subscribe((data) => {
            console.log(data);
        },);
         */


    } catch (e) {
        console.error('Error: ' + e.message);
    }



})();
