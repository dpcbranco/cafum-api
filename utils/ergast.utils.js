const pilotService = require('../services/pilots.service');

const qualiToDBModel = async (qualiResult) => {  
    const pilotPromises = await qualiResult.map(async (driver) => {
        const pilot = await pilotService.findPilotByNumber(+driver.number);
        return  pilot._id;
    });
    let quali = [];
    await Promise.all(pilotPromises).then((results) => {
        quali = results;
    });
    return quali;
};

const raceToDBModel = async (raceResult) => {
    const finishers = [];
    const dnf = [];

    const pilotPromises = await raceResult.map(async (driver) => {
        const pilot = await pilotService.findPilotByNumber(+driver.number);
        const raceStatus = driver.status;
        if (raceStatus === 'Finished' || /\+\d (Lap|Laps)/.test(raceStatus)) 
            finishers.push({
                pilot: pilot._id,
                bestLap: driver.FastestLap.rank === '1'
            });
        else dnf.push(pilot._id);
    });

    for (let pilotPromise of pilotPromises){
        await Promise.resolve(pilotPromise);
    }
    
    return { finishers, dnf };
};

module.exports = { qualiToDBModel, raceToDBModel };