const User = require('../models/User')
const mongoose = require('mongoose')

const _login = async (username, password) => {
    const userModel = mongoose.model('User', User, "users")
    return await userModel.findOne({username})
}

module.exports = {
    login: _login
}