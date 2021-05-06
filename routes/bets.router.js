const router = require('express').Router();
const betValidator = require('../validators/bets.validator');
const gpValidator = require('../validators/gps.validator');
const leagueValidator = require('../validators/leagues.validators');
const betsController = require('../controllers/bets.controller');

router.get('/user/:userId', betsController.getBetByUser);
router.post(
    '/new',
    betValidator.validateNewBet,
    betValidator.validateBetConflict,
    gpValidator.validateGpExistence,
    leagueValidator.validateLeagueExistence,
    betValidator.validateBetPilots,
    betsController.postNewBet
);
router.patch(
    '/:betId',
    betValidator.validateBetPilots,
    betsController.patchBet
);

module.exports = router;
