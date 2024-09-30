const WDXJSWSClientConfiguration = require('../../build/WDX/Client/WS/Configuration/Configuration');
const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');

const c = new WDXJSWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
await c.connect();

c.connect();


