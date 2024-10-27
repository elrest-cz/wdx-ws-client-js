/**
 * Elrest - WDX - WS - Client - JS - Example - Configuration
 * 
 * WDX with WS client configuration example.
 * 
 * @copyright 2024 Elrest AutomationsSysteme GMBH
 */

const wsConfiguration = {
    protocol: 'ws',
    host: '192.168.1.60',
    port: 8081,
    path: '/wdx/ws',
    // or url
    // url: 'ws://localhost:4282'
};

module.exports.wsConfiguration = wsConfiguration