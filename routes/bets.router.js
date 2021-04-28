const router = require('express').Router();
const betValidator = require('../validators/bets.validator');
const betsController = require('../controllers/bets.controller');

router.get('/user/:userId', betsController.getBetByUser);
router.post(
    '/new',
    betValidator.validatePilotsRequest,
    betValidator.validateNewBet,
    betsController.postNewBet
);
router.patch(
    '/:betId',
    betValidator.validatePilotsRequest,
    betsController.patchBet
);

module.exports = router;
