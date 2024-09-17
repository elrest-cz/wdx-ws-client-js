
const WDXJSWSClient = require('../../build/WDX/Client/WS/Service/ClientService');
const WDXSchema = require('@wago/wdx-schema');
const WDXSettings = require('./settings');
const WDXContinue = require('./continue');


/**
 * Map of colors and count
 */
const currentCount = new Map();


/**
 * Map of colors and count
 */
const totalCount = new Map();

/**
 * Map of path and current colors
 */
const currentState = new Map();

module.exports.scripts = async () => {
    try {
        module.exports.title();
        WDXSettings.lineSeparator();
        module.exports.content();
        WDXSettings.lineSeparator();


        const c = new WDXJSWSClient.ClientService();
        await c.connect(WDXSettings.wsConfiguration);
        console.log('Connected successfully');

        WDXSettings.lineSeparator();

        WDXContinue.continue();

        async function onLightUpdate(dataValue) {
            const colorName=dataValue.value ? dataValue.value.replace('#', '') : null;
            currentState.set(dataValue.path, colorName);

            await calculateCurrentCount();
        }

        async function calculateCurrentCount() {

            for (const color in colors) {
                currentCount.set(colors[color], 0);
            }

            currentState.forEach((value, key) => {
                if (value) {
                    currentCount.set(value, currentCount.get(value) + 1);
                }
            });

            for (const color in colors) {
                const path = `Virtual.hotel-stats.current.${colors[color]}`;
                const value = currentCount.get(colors[color]);
                await c.dataService.setValue(path, value).toPromise();
            }

        }


        async function calculateTotalCount() {

            for (const color in colors) {
                currentCount.set(colors[color], 0);
            }

            currentState.forEach((value, key) => {
                if (value) {
                    currentCount.set(value, currentCount.get(value) + 1);
                }
            });

            console.log('Current counts ', currentCount);

            for (const color in colors) {
                const path = `Virtual.hotel-stats.current.${colors[color]}`;
                const value = currentCount.get(colors[color]);
                await c.dataService.setValue(path, value).toPromise();
            }

        }


        for (let floor = 1; floor <= WDXSettings.floors; floor++) {
            for (let room = 1; room <= WDXSettings.rooms; room++) {

                const name = `hotel-light-floor-${floor}-room-${room}`;
                const path = `Virtual.${name}.color`;

                console.log(`Subscribing ${path}`);

                c.dataService.register(path).subscribe(
                    {
                        next: async (dataValue) => {
                            //console.log(JSON.stringify(dataValue, null, 2));
                            await onLightUpdate(dataValue);
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
            }
        }

    } catch (e) {
        console.error('Error: ' + e.message);
        console.error('Error: ' + e.stack);
    }
};


module.exports.initCurrent = () => {
    console.clear();
    console.log('6.1. Running calculations current color count: ' );
};

module.exports.initTotal = () => {
    console.clear();
    console.log('6.2. Running calculations total color count: ' );
};


module.exports.title = () => {
    console.clear();
    console.log('6. Running calculations scripts for trends datasets');
};

module.exports.content = () => {
    console.log('\nIn this step we will calculate trending data sets statistics. We will subscribe to all rooms colors and calculate current color counts and total color counts');
};
