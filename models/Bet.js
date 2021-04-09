const Schema = require("mongoose").Schema;

//Subschema to supress _id from model
const QualifyingBetPilot = new Schema(
    {
        id: { type: Schema.Types.ObjectId, ref: "Pilot" },
        position: Number,
    },
    { _id: false }
);

//Subschema to supress _id from model
const RaceBetPilot = new Schema(
    {
        id: { type: Schema.Types.ObjectId, ref: "Pilot" },
        position: Number,
        bestLap: Boolean,
    },
    { _id: false }
);

module.exports = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        gpId: { type: Schema.Types.ObjectId, ref: "Gp" },
        qualifying: [QualifyingBetPilot],
        race: [RaceBetPilot],
        totalPoints: Number,
    },
    { versionKey: false }
);
