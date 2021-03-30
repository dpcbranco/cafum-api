const express = require('express');
const router = express.Router();
const pilotsController = require('../controllers/pilotsController')

router.get("/", async (req, res) => {
    res.send(pilotsController.getAllPilots())
})

module.exports = router