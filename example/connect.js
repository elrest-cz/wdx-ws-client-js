(async () => {
    try {
        const WDXJSWSClient = require('../build/WDX/Client/WS/Service/ClientService');
        const c = new WDXJSWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
        await c.connect();

        console.log('Connected successfully');


        c.status.subscribe({
            next:(status) => {
                console.log('Client status  is: ' + status);
            },
            error:(error) => {
                console.error('Client status  error: ' + error);
            },
        });

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
