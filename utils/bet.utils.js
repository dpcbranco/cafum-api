const calculateRacePoints = (bet, pointSystem, result) => {
    let finalPoints = 0;

    if (bet.length > 0){
        bet.forEach((pilot) => {
            const pilotResult = result.findIndex(
                pr => pr.pilot.toString() === pilot.id.toString()
            );

            if (pilotResult) {
                // Difference between bet and actual result
                const betResultDiff = pilotResult - pilot.racePosition;
                
                if (betResultDiff === 0)
                    finalPoints += pointSystem.raceCorrect;
                else if (Math.abs(betResultDiff) === 1)
                    finalPoints += pointSystem.raceCloseCall;

                if (result[pilotResult].bestLap === pilot.bestLap)
                    finalPoints += pointSystem.fastestLap;
            } 
        });
    }
    return finalPoints;

};

module.exports = {
    calculateBetPoints: calculateRacePoints
};