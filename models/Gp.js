const Schema = require('mongoose').Schema;

module.exports = new Schema({
    id: Schema.Types.ObjectId,
    result: {
        finishers: [{
            pilot: { type: Schema.Types.ObjectId, ref: 'Pilot' },
            bestLap: Schema.Types.Boolean
        }],
        dnf: [{ type: Schema.Types.ObjectId, ref: 'Pilot' }]
    }
},{ versionKey: false });
