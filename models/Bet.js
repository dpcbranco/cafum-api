const Schema = require('mongoose').Schema;

//Subschema to supress _id from model
const PilotBet = new Schema(
    {
        id: { type: Schema.Types.ObjectId, ref: 'Pilot' },
        qualifyingPosition: Number,
        racePosition: Number,
        bestLap: Boolean,
    },
    { _id: false }
);

module.exports = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        gpId: { type: Schema.Types.ObjectId, ref: 'Gp' },
        leagueId: { type: Schema.Types.ObjectId, ref: 'League' },
        pilotBets: [PilotBet],
        totalPoints: { type: Number, default: 0 },
    },
    { versionKey: false }
);
