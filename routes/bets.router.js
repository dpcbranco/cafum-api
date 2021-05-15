const router = require('express').Router();
const betValidator = require('../validators/bets.validator');
const betsController = require('../controllers/bets.controller');

router.get('/:id', betsController.getBetById);

router.patch(
    '/:betId',
    betValidator.validateBetExistence,
    betValidator.validatePilotDuplicates,
    betValidator.validateBetPilots,
    betsController.patchBet
);

module.exports = router;
