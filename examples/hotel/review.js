const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');
const WDXSchema = require('@wago/wdx-schema');
const WDXSettings = require('./settings');
const WDXContinue = require('./continue')

module.exports.review = async () => {

    try {
        WDXSettings.title();
        WDXSettings.copyright();

        const c = new WDXJSWSClient.ClientService(WDXSettings.wsConfiguration);
        await c.connect();
        
        WDXSettings.lineSeparator();
        console.log(`${WDXSettings.indentation()}WDX WS Client - Connected successfully`);

        WDXSettings.lineSeparator();


        module.exports.subtitle();
        module.exports.content();

        WDXSettings.lineSeparator();
        await c.disconnect();
        console.log(`${WDXSettings.indentation()}WDX WS Client - Disconnected successfully`);
        WDXSettings.lineSeparator();

        await WDXContinue.continue();


    } catch (e) {
        console.error('Error: ' + e.message);
        console.error('Error: ' + e.stack);
        process.exit(1);
    }
};

module.exports.subtitle = () => {
    console.log(`${WDXSettings.indentation()}Step 5. Review results`);
};

module.exports.content = () => {
    console.log(`\n${WDXSettings.indentation()}1. Hotel lights instances created (${WDXSettings.getInstances().length})`);
    console.log(`${WDXSettings.indentation()}WDX Instances list: ${WDXSettings.wdxUrlPrefix()}/instance/list`);

    console.log(`\n${WDXSettings.indentation()}2. Hotel lights data schemas created (${WDXSettings.getDataSchemas().length})`);
    console.log(`${WDXSettings.indentation()}WDX Schemas tree: ${WDXSettings.wdxUrlPrefix()}/data/tree`);

    console.log(`\n${WDXSettings.indentation()}2. Hotel lights data alarm created (${WDXSettings.getAlarms().length})`);
    console.log(`${WDXSettings.indentation()}WDX Alarms list: ${WDXSettings.wdxUrlPrefix()}/alarms/list`);


    console.log(`\n${WDXSettings.indentation()}2. Hotel lights trendings created (${WDXSettings.getTrends().length})`);
    console.log(`${WDXSettings.indentation()}WDX Trends list: ${WDXSettings.wdxUrlPrefix()}/trends`);



    console.log(`\n${WDXSettings.indentation()}2. Hotel lights game is prepared`);
    console.log(`${WDXSettings.indentation()}WDX Hotel Lights: ${WDXSettings.wdxUrlPrefix()}/showooms/hotel-virtual?width=${WDXSettings.rooms}&height=${WDXSettings.floors}`);


    console.log(`\n${WDXSettings.indentation()}All done`);

};