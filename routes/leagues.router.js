const router = require('express').Router();

const leagueController = require('../controllers/leagues.controller');

router.post('/new', leagueController.createLeague);
router.get('/:id', leagueController.findLeague);
router.patch('/:leagueId/user/add/:userId', leagueController.addUser);

module.exports = router;