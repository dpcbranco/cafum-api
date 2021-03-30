const Schema = require('mongoose').Schema

module.exports = new Schema({
    name: String,
    abbreviation: String,
    number: Number,
    team: String,
    points: Number
})