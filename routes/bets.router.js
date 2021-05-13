const router = require('express').Router();
const betValidator = require('../validators/bets.validator');
const gpValidator = require('../validators/gps.validator');
const betsController = require('../controllers/bets.controller');

router.get('', betsController.getLeagueBets);
router.get('/:id', betsController.getBetById);
router.post(
    '/new',
    betValidator.validateNewBet,
    betValidator.validatePilotDuplicates,
    gpValidator.validateGpExistence,
    betValidator.validateBetConflict,
    betValidator.validateBetPilots,
    betsController.postNewBet
);
router.patch(
    '/:betId',
    betValidator.validateBetExistence,
    betValidator.validatePilotDuplicates,
    betValidator.validateBetPilots,
    betsController.patchBet
);

module.exports = router;
