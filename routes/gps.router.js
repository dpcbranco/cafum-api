const router = require('express').Router();
const gpController = require('../controllers/gps.controller');

router.post(
    '/result/race/calculateLeagues',
    gpController.calculateRaceResults
);

router.post(
    '/result/qualifying/calculateLeagues',
    gpController.calculateQualiResults
);

module.exports = router;
