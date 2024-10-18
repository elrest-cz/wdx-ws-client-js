const WDXJSWSClientConfiguration = require('../build/WDX//Client//WS/Configuration/Configuration');
const WDXJSWSClient = require('../build/WDX//Client//WS/Service/ClientService');


(async () => {
    try {
        const c = new WDXJSWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
        await c.connect();

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
