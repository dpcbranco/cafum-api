const pilotService = require('../services/pilots.service');

const qualiToDBModel = async (qualiResult) => {  
    const pilotPromises = await qualiResult.map(async (driver) => {
        const pilot = await pilotService.findPilotByNumber(+driver.number);
        return pilot ? pilot._id : undefined;
    });
    let quali = [];
    await Promise.all(pilotPromises).then((results) => {
        quali = results;
    });
    return quali;
};

module.exports = { qualiToDBModel };