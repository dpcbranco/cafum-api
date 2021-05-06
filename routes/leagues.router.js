const router = require('express').Router();

const leagueController = require('../controllers/leagues.controller');
const leagueValidator = require('../validators/leagues.validators');

const betsRouter = require('./bets.router');

router.post(
    '/new',
    leagueValidator.validateNewLeague,
    leagueController.createLeague
);
router.get(
    '/:leagueId',
    leagueValidator.validateLeagueExistence,
    leagueController.findLeague
);
router.post(
    '/:leagueId/user/:userId',
    leagueValidator.validateLeagueExistence,
    leagueValidator.validateManager,
    leagueController.addUser
);
router.delete(
    '/:leagueId/user/:userId',
    leagueValidator.validateLeagueExistence,
    leagueValidator.validateManager,
    leagueController.removeUser
);

router.use(
    '/:leagueId/bets',
    leagueValidator.validateLeagueExistence,
    betsRouter
);

module.exports = router;
