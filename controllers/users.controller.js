const User = require('../models/User')
const mongoose = require('mongoose')
const cryptography = require('../utils/cryptography.util')
const userModel = mongoose.model('User', User, "users")

const _login = async (username, password) => {
    
    const user = await userModel.findOne({username})
    const decryptedPassword = cryptography.decrypt({content: user.password, iv: user.iv})
    return decryptedPassword === password
}

const _signup = async (username, password) => {
    let user = await userModel.findOne({username})
    if (user) {
        return null
    }
    const encryptedPassword = cryptography.encrypt(password)
    user = await userModel.create({
        username,
        password: encryptedPassword.content,
        iv: encryptedPassword.iv
    })
    return userCreated
}

module.exports = {
    login: _login,
    signup: _signup
}