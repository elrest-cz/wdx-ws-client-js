/**
 * Elrest - WDX - WS - Client - JS - Example - Instance Subscribe Logs
 * 
 * Retrieves Instance logs for given Instance UUID from WDX with WS client.
 *
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */

const WDXWSClient = require('@wago/wdx-ws-client-js');

(async () => {
    try {
        const c = new WDXWSClient.ClientService({ protocol: 'ws', host: 'localhost', port: 4282 });
        await c.connect();

        console.log('Connected successfully');

    } catch (e) {
        console.error('Error: ' + e.message);
    }



})();
