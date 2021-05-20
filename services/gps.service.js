const Gp = require('../models/Gp');
const mongoose = require('mongoose');
const gpSchema = mongoose.model('Gps', Gp, 'gps');

const _findById = async (gpId) => {
    return await gpSchema.findById(gpId);
};

const _findCurrentRace = async () => {
    return await gpSchema.findOne({ current: true });
};

module.exports = {
    findById: _findById,
    findCurrentRace: _findCurrentRace
};
