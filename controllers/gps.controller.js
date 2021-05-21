const gpService = require('../services/gps.service');
const betService = require('../services/bets.services');
const ergastService = require('../services/ergast.service');
const leagueService = require('../services/leagues.service');
const betUtils = require('../utils/bet.utils');
const ergastUtils = require('../utils/ergast.utils');

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
            const totalPoints = bet.totalPoints + betUtils.calculateRacePoints(
                bet, league.pointSystem, currentRace.raceResult
            );
            const memberIndex = league.members.findIndex(
                (member) => member.user.toString() === bet.userId.toString() 
            );
            league.members[memberIndex].points += totalPoints;

            betService.updateBet(bet, { totalPoints });
        }
    );

    leagues.forEach((league) => 
        leagueService.updateLeague(league._id, { members: league.members })
    );

    return res.status(200).send(
        { message: 'Points calculations successfully started' }
    );
};

const calculateQualiResults = async (req, res) => {
    const qualiResult = await ergastService.getLastQualiResult();
    const currentRound = +(await ergastService.getLastGp());

    if (!qualiResult)
        return res.status(200).send({ message: 'Results not in yet.' });

    const currentRace = await gpService.findByRound(currentRound);
    currentRace.qualiResult = await ergastUtils.qualiToDBModel(qualiResult);
    gpService.updateGp(
        currentRace._id, { qualiResult: currentRace.qualiResult }
    );
    
    const gpBets = await betService.findBet({ gpId: currentRace._id });
    const leagues = await leagueService.getAllLeagues();

    gpBets.forEach(
        async (bet) => {
            const league = leagues.find(
                (league) => bet.leagueId.toString() === league._id.toString()
            );
            const totalPoints = bet.totalPoints + betUtils.calculateQualiPoints(
                bet, league.pointSystem, currentRace.qualiResult
            );
            const memberIndex = league.members.findIndex(
                (member) => member.user.toString() === bet.userId.toString() 
            );
            league.members[memberIndex].points += totalPoints;

            betService.updateBet(bet, { totalPoints });
        }
    );

    leagues.forEach((league) => 
        leagueService.updateLeague(league._id, { members: league.members })
    );

    return res.status(200).send(
        { message: 'Points calculations successfully started' }
    );
};

module.exports = { calculateRaceResults, calculateQualiResults };