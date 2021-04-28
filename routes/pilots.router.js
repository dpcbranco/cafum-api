const express = require('express');
const router = express.Router();
const pilotsController = require('../controllers/pilots.controller');

router.get('/', pilotsController.getAllPilots);

module.exports = router;