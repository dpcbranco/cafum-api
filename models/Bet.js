const Schema = require("mongoose").Schema;

module.exports = new Schema(
    {
        userId: { type: Schema.ObjectId, ref: "User" },
        gpId: { type: Schema.ObjectId, ref: "Bet" },
        qualifying: [{ pilotId: String, position: Number }],
        race: [{ pilotId: String, position: Number, bestLap: Boolean }],
        totalPoints: Number,
    },
    { versionKey: false }
);
