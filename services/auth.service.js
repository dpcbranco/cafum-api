const User = require('../models/User');
const mongoose = require('mongoose');
const userModel = mongoose.model('User', User, 'users');

const _findByUsername = async (username) => {
    return await userModel.findOne({ username });
};

const _findById = async (userId) => {
    return await userModel.findById(userId);
};

const _create = async (user) => {
    return await userModel.create(user);
};

module.exports = {
    findByUsername: _findByUsername,
    create: _create,
    findById: _findById,
};
