const router = require('express').Router();

const leagueController = require('../controllers/leagues.controller');
const leagueValidator = require('../validators/leagues.validators');
const betValidator = require('../validators/bets.validator');
const gpValidator = require('../validators/gps.validator');
const userValidator = require('../validators/users.validator');

router.get(
    '/:leagueId',
    leagueValidator.validateLeagueExistence,
    leagueController.findLeague
);

router.get('/:leagueId/bets',
    leagueValidator.validateLeagueExistence,
    leagueController.getLeagueBets
);

router.post(
    '/new',
    leagueValidator.validateNewLeague,
    leagueController.createLeague
);

router.post(
    '/:leagueId/user/:userId',
    leagueValidator.validateLeagueExistence,
    leagueValidator.validateManager,
    userValidator.validateUserExistence,
    leagueController.addUser
);

router.post(
    '/:leagueId/bets/new',
    leagueValidator.validateLeagueExistence,
    betValidator.validateNewBet,
    betValidator.validatePilotDuplicates,
    gpValidator.validateGpExistence,
    betValidator.validateBetConflict,
    betValidator.validateBetPilots,
    leagueController.postNewLeagueBet
);

router.delete(
    '/:leagueId/user/:userId',
    leagueValidator.validateLeagueExistence,
    leagueValidator.validateManager,
    userValidator.validateUserExistence,
    leagueController.removeUser
);

module.exports = router;
