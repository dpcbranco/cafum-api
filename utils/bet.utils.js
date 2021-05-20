const calculateRacePoints = (bet, pointSystem, result) => {
    let finalPoints = 0;

    if (bet.pilotBets.length > 0){
        bet.pilotBets.forEach((pilot) => {
            const finishers = result.finishers;
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
    }
    return finalPoints;

};

module.exports = {
    calculateBetPoints: calculateRacePoints
};