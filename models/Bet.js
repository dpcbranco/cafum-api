const Schema = require("mongoose").Schema;

module.exports = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        gpId: { type: Schema.Types.ObjectId, ref: "Gp" },
        qualifying: [{ pilotId: String, position: Number }],
        race: [{ pilotId: String, position: Number, bestLap: Boolean }],
        totalPoints: Number,
    },
    { versionKey: false }
);
