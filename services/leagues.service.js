const mongoose = require('mongoose');
const League = require('../models/League');
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

module.exports = {
    findLeagueById: _findLeagueById,
    findLeagueByName: _findLeagueByName,
    createLeague: _createLeague
};