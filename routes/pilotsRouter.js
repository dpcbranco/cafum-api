const express = require('express');
const router = express.Router();
const pilotsController = require('../controllers/pilotsController')

router.get("/", async (req, res) => {
    const pilots = await pilotsController.getAllPilots(req.query.orderBy, req.query.desc === 'true')
    res.status(200).send(pilots)
})

module.exports = router