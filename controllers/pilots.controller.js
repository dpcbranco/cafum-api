const mongoose = require('mongoose')
const Pilot = require("../models/Pilot")

const _getAllPilots = async (req, res) => {
    const pilotSchema = mongoose.model('Pilot', Pilot, "pilots")
    const pilots = await pilotSchema.find().sort(req.query.orderBy ? { [req.query.orderBy]: req.query.desc ? -1 : 1 } : {})
    return res.status(200).send(pilots)
}

module.exports = {
    getAllPilots: _getAllPilots
}