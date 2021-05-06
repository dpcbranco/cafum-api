const router = require('express').Router();
const betValidator = require('../validators/bets.validator');
const leagueValidator = require('../validators/leagues.validators');
const userValidator = require('../validators/user.validator');
const betsController = require('../controllers/bets.controller');

router.get('/user/:userId', betsController.getBetByUser);
router.post(
    '/new',
    userValidator.validateUserRequest,
    betValidator.validateBetPilots,
    betValidator.validateNewBet,
    leagueValidator.validateExistingLeague,
    betsController.postNewBet
);
router.patch(
    '/:betId',
    betValidator.validateBetPilots,
    betsController.patchBet
);

module.exports = router;
