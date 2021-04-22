const mongoose = require("mongoose");
const Pilot = require("../models/Pilot");
const pilotSchema = mongoose.model("Pilot", Pilot, "pilots");

const _findPilots = async (filter, sort) => {
    return await pilotSchema.find(filter).sort(sort);
};

module.exports = {
    findPilots: _findPilots,
};
