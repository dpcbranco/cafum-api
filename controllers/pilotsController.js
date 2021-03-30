const mongoose = require('mongoose')
const Pilot = require("../models/Pilot")

const _getAllPilots = async () => {
    const pilotSchema = mongoose.model('Pilot', Pilot, "pilots")
    return await pilotSchema.find({})
}

module.exports = {
    getAllPilots: _getAllPilots
}