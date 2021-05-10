const router = require('express').Router();
const betValidator = require('../validators/bets.validator');
const gpValidator = require('../validators/gps.validator');
const betsController = require('../controllers/bets.controller');

router.get('/user/:userId', betsController.getBetByUser);
router.post(
    '/new',
    betValidator.validateNewBet,
    gpValidator.validateGpExistence,
    betValidator.validateBetConflict,
    betValidator.validateBetPilots,
    betsController.postNewBet
);
router.patch(
    '/:betId',
    betValidator.validateBetPilots,
    betValidator.validateBetExistence,
    betsController.patchBet
);

module.exports = router;
