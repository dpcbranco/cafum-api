const Schema = require('mongoose').Schema;

const UserSchema = require('../models/User');

module.exports = new Schema({
    pointSystem: {
        qualiCorrect: { type: Number, default: 0 },
        raceCorrect: { type: Number, default: 0 },
        raceCloseCall: { type: Number, default: 0 },
        fastestLap: { type: Number, default: 0 },
        sprintCorrect: { type: Number, default: 0 }
    },
    members: [UserSchema]

}, { versionKey: false });