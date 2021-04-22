const mongoose = require("mongoose");
const Pilot = require("../models/Pilot");
const pilotSchema = mongoose.model("Pilot", Pilot, "pilots");

const _findPilots = async (filter, sort) => {
    return await pilotSchema.find(filter).sort(sort);
};

const _findPilotById = async (id) => {
    return await pilotSchema.findById(id);
};

module.exports = {
    findPilots: _findPilots,
    findPilotById: _findPilotById,
};
