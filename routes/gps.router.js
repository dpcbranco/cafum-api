const router = require('express').Router();
const gpController = require('../controllers/gps.controller');

router.post(
    '/result/race/calculateLeagues',
    gpController.calculateRaceResults
);

module.exports = router;
