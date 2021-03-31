const Schema = require('mongoose').Schema

module.exports = new Schema({
    username: String,
    password: String,
    iv: String
})