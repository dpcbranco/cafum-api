const mongoose = require('mongoose')
const Pilot = require("../models/Pilot")

const _getAllPilots = async (orderBy, desc) => {
    const pilotSchema = mongoose.model('Pilot', Pilot, "pilots")
    return await pilotSchema.find().sort(orderBy ? {[orderBy]: desc ? -1 : 1} : {})
}

module.exports = {
    getAllPilots: _getAllPilots
}