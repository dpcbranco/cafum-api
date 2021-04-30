const mongoose = require('mongoose');
const League = require('../models/League');
const leagueSchema = mongoose.model('League', League);

const _findLeagueByName = async (name) => {
    return await leagueSchema.find({ name });
};

const _createLeague = async (league) => {
    return await leagueSchema.create(league);
};

module.exports = {
    findLeagueByName: _findLeagueByName,
    createLeague: _createLeague
};