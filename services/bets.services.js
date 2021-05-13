const Bet = require('../models/Bet');
const User = require('../models/User');
const Gp = require('../models/Gp');
const mongoose = require('mongoose');
const betModel = mongoose.model('Bet', Bet);
mongoose.model('User', User);
mongoose.model('Gp', Gp);

const _findBetById = async (id) => {
    return await betModel.findById(id);
};

const _findBet = async (filter) => {
    return await betModel.find(filter);
};

const _createBet = async (bet) => {
    return await betModel.create(bet);
};

const _updateBet = async (id, patch) => {
    const bet = await betModel.findById(id);
    Object.assign(bet, patch);
    return await bet.save();
};

module.exports = {
    findBetById: _findBetById,
    findBet: _findBet,
    createBet: _createBet,
    updateBet: _updateBet,
};
