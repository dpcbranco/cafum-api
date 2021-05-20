const calculateRacePoints = (bet, pointSystem, raceResult) => {
    let finalPoints = 0;

    bet.pilotBets.forEach((pilot) => {
        const finishers = raceResult.finishers;
        const pilotResult = finishers.findIndex(
            pr => pr.pilot.toString() === pilot.id.toString()
        ) + 1;

        if (pilotResult) {
            // Difference between bet and actual result
            const betResultDiff = pilotResult - pilot.racePosition;
                
            if (betResultDiff === 0)
                finalPoints += pointSystem.raceCorrect;
            else if (Math.abs(betResultDiff) === 1)
                finalPoints += pointSystem.raceCloseCall;

            if (finishers[pilotResult - 1].bestLap && pilot.bestLap)
                finalPoints += pointSystem.fastestLap;
        } 
    });

    return finalPoints;

};


const calculateQualiPoints = (bet, pointSystem, qualiResult) => {
    let finalPoints = 0;

    bet.pilotBets.forEach((pilot) => {
        const pilotResult = qualiResult.findIndex(
            pr => pr.toString() === pilot.id.toString()
        ) + 1;

        if (pilotResult) {         
            if (pilotResult === pilot.qualifyingPosition)
                finalPoints += pointSystem.qualiCorrect;
        } 
    });

    return finalPoints;

};

module.exports = {
    calculateRacePoints,
    calculateQualiPoints
};