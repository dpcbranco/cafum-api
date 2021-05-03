const mongoose = require('mongoose');
const League = require('../models/League');
const User = require('../models/User');
mongoose.model('User', User);
const leagueSchema = mongoose.model('League', League);

const _findLeagueById = async (id) => {
    return await leagueSchema.findById(id);
};

const _findLeagueByName = async (name) => {
    return await leagueSchema.findOne({ name });
};

const _createLeague = async (league) => {
    return await leagueSchema.create(league);
};

const _updateLeague = async (id, patch) => {
    const league = await leagueSchema.findById(id);
    Object.assign(league, patch);
    return await league.save();
};

module.exports = {
    findLeagueById: _findLeagueById,
    findLeagueByName: _findLeagueByName,
    createLeague: _createLeague,
    updateLeague: _updateLeague
};