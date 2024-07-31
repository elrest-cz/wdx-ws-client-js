const WDXJSWSClientConfiguration = require('../build/WDX//Client//WS/Configuration/Configuration');
const WDXJSWSClient = require('../build/WDX//Client//WS/Service/ClientService');


(async () => {
    try {
        const c = new WDXJSWSClient.ClientService();
        await c.connect({ protocol: 'ws', host: 'localhost', port: 4282 },);

        console.log('Connected successfully');

        c.dataService.getSchema('').subscribe((data) => {
            console.log(data);
        },);


    } catch (e) {
        console.error('Error: ' + e.message);
    }



    //await c.disconnect();
})();
