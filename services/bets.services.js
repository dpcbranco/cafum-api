const Bet = require("../models/Bet");
const mongoose = require("mongoose");
const betModel = mongoose.model("Bet", Bet, "bets");

const _findBet = async (filter) => {
    return await betModel.findOne(filter);
};

const _createBet = async (bet) => {
    return await betModel.create(bet);
};

module.exports = {
    findBet: _findBet,
    createBet: _createBet,
};
