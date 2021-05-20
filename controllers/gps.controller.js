const gpService = require('../services/gps.service');
const betService = require('../services/bets.services');
const leagueService = require('../services/leagues.service');
const betUtils = require('../utils/bet.utils');

const calculateRaceResults = async (req, res) => {
    const currentRace = await gpService.findCurrentRace();
    if (!currentRace.raceResult) 
        return res.status(200).send({ message: 'Results not in yet.' });
    
    const gpBets = await betService.findBet({ gpId: currentRace._id });
    const leagues = await leagueService.getAllLeagues();

    gpBets.forEach(
        async (bet) => {
            const league = leagues.find(
                (league) => bet.leagueId.toString() === league._id.toString()
            );
            const totalPoints = bet.totalPoints + betUtils.calculateBetPoints(
                bet, league.pointSystem, currentRace.raceResult
            );
            betService.updateBet(bet, { totalPoints });
        }
    );

    return res.status(200).send(
        { message: 'Points calculations successfully started' }
    );
};

module.exports = { calculateRaceResults };