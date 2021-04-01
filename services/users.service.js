const User = require("../models/User");
const mongoose = require("mongoose");
const userModel = mongoose.model("User", User, "users");

const _findByUsername = async (username) => {
    return await userModel.findOne({ username });
};

const create = async (user) => {
    return await userModel.create(user);
};

module.exports = { findByUsername: _findByUsername };
