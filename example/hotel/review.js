const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');
const WDXSchema = require('@wago/wdx-schema');
const WDXSettings = require('./settings');
const WDXContinue = require('./continue')

module.exports.review = async () => {

    try {
        WDXSettings.title();
        WDXSettings.copyright();

        const c = new WDXJSWSClient.ClientService();
        await c.connect(WDXSettings.wsConfiguration);
        WDXSettings.lineSeparator();
        console.log(`${WDXSettings.indentation()}WDX WS Client - Connected successfully`);

        WDXSettings.lineSeparator();


        module.exports.subtitle();
        module.exports.content();

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
    console.log(`${WDXSettings.indentation()}All done`);

};