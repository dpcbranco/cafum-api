const Schema = require('mongoose').Schema;

module.exports = new Schema({
    name: { type: String, unique: true },
    pointSystem: {
        qualiCorrect: {
            type: Number,
            default: 0
        },
        raceCorrect: {
            type: Number,
            default: 0
        },
        raceCloseCall: {
            type: Number,
            default: 0
        },
        fastestLap: {
            type: Number,
            default: 0
        },
        sprintCorrect: {
            type: Number,
            default: 0
        }
    },
    members: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        owner: { type: Boolean, default: false },
        manager: { type: Boolean, default: false }
    }]

}, {
    versionKey: false
});