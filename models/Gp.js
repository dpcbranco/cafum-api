const Schema = require('mongoose').Schema;

module.exports = new Schema({
    id: Schema.Types.ObjectId,
    raceResult: {
        finishers: [{
            pilot: { type: Schema.Types.ObjectId, ref: 'Pilot' },
            bestLap: Schema.Types.Boolean
        }],
        dnf: [{ type: Schema.Types.ObjectId, ref: 'Pilot' }]
    }
},{ versionKey: false });
