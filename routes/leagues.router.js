const router = require('express').Router();

const leagueController = require('../controllers/leagues.controller');
const leagueValidator = require('../validators/leagues.validators');

router.post(
    '/new',
    leagueValidator.validateNewLeague,
    leagueController.createLeague
);
router.get(
    '/:leagueId',
    leagueValidator.validateExistingLeague,
    leagueController.findLeague
);
router.post(
    '/:leagueId/user/add/:userId',
    leagueValidator.validateExistingLeague,
    leagueValidator.validateManager,
    leagueController.addUser
);
router.delete(
    '/:leagueId/user/:userId',
    leagueValidator.validateExistingLeague,
    leagueValidator.validateManager,
    leagueController.removeUser
);

module.exports = router;
