const mongoose = require('mongoose');
const Pilot = require('../models/Pilot');
const pilotSchema = mongoose.model('Pilot', Pilot, 'pilots');

const _findPilots = async (filter, sort) => {
    return await pilotSchema.find(filter).sort(sort);
};

const _findPilotById = async (id) => {
    return await pilotSchema.findById(id);
};

const _findPilotByNumber = async(number) => {
    return await pilotSchema.findOne({ number });
};

module.exports = {
    findPilots: _findPilots,
    findPilotById: _findPilotById,
    findPilotByNumber: _findPilotByNumber
};
