const Gp = require('../models/Gp');
const mongoose = require('mongoose');
const gpSchema = mongoose.model('Gps', Gp, 'gps');

const _findById = async (gpId) => {
    return await gpSchema.findById(gpId);
};

const _findByRound = async (round) => {
    return await gpSchema.findOne({ round });
};

const _updateGp = async (gpId, patch) => {
    const gp = await gpSchema.findById(gpId);
    Object.assign(gp, patch);
    return await gp.save();
};

module.exports = {
    findById: _findById,
    findByRound: _findByRound,
    updateGp: _updateGp
};
