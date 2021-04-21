const Bet = require("../models/Bet");
const User = require("../models/User");
const Gp = require("../models/Gp");
const mongoose = require("mongoose");
const betModel = mongoose.model("Bet", Bet);
const userModel = mongoose.model("User", User);
const gpModel = mongoose.model("Gp", Gp);

const _findBet = async (filter) => {
    return await betModel.findOne(filter).populate("gpId").populate("userId");
};

const _createBet = async (bet) => {
    return await betModel.create(bet);
};

const _updateBet = async (id, patch) => {
    const bet = await betModel.findById(id);
    await bet.update(patch);
    return await betModel.findById(id);
};

module.exports = {
    findBet: _findBet,
    createBet: _createBet,
    updateBet: _updateBet,
};
