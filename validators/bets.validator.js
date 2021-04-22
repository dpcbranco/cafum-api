const userService = require("../services/users.service");
const gpService = require("../services/gps.service");
const betService = require("../services/bets.services");
const pilotService = require("../services/pilots.service");

const _validateNewBet = async (req, res, next) => {
    const errors = [];

    // Validates mandatory fields sent in the request body
    if (!req.body.gpId) errors.push({ message: "gpId not informed" });
    if (!req.body.userId) errors.push({ message: "userId not informed" });

    // Validates existence of user reference in database
    const user = await userService.findById(req.body.userId);
    if (!user) return res.status(404).send({ message: "User not found." });

    // Validates existence of GP reference in database
    const gp = await gpService.findById(req.body.gpId);
    if (!gp) return res.status(404).send({ message: "GP not found." });

    const betFilter = {
        userId: user._id,
        gpId: gp._id,
    };

    const bet = await betService.findBet(betFilter);

    if (bet)
        return res
            .status(409)
            .send({ message: "Bet already created for this GP." });

    req.body = {
        ...req.body,
        ...betFilter,
    };
    next();
};

const _validatePilotsRequest = async (req, res, next) => {
    let pilotBets = req.body.pilotBets;

    const errors = [];

    // Validates duplicated pilots
    const duplicatedPilots = [];

    pilotBets.forEach((pilot) => {
        if (
            pilotBets.filter(
                (pilotBet) => pilot === pilotBet || pilot.id === pilotBet.id
            ).length > 1
        )
            duplicatedPilots.push(pilot);
    });

    if (duplicatedPilots.length > 0)
        errors.push({
            message: `Pilots duplicated on request body`,
            duplicated: duplicatedPilots,
        });

    // Validates duplicated qualifying bets
    const duplicatedQuali = [];
    pilotBets.forEach((pilot) => {
        if (
            pilotBets.filter(
                (pilotBet) =>
                    pilot.qualifyingPosition === pilotBet.qualifyingPosition
            ).length > 1
        )
            duplicatedQuali.push(pilot);
    });

    if (duplicatedQuali.length > 0)
        errors.push({
            message: `Qualifying bet position duplicated`,
            duplicated: duplicatedQuali,
        });

    //Validates duplicated race bets
    const duplicatedRace = [];
    pilotBets.forEach((pilot) => {
        if (
            pilotBets.filter(
                (pilotBet) => pilot.racePosition === pilotBet.racePosition
            ).length > 1
        )
            duplicatedRace.push(pilot);
    });

    if (duplicatedRace.length > 0)
        errors.push({
            message: `Race bet position duplicated`,
            duplicated: duplicatedRace,
        });

    if (errors.length > 0) return res.status(400).send({ errors });

    // Validates existence of pilot in database
    const pilotsNotFound = [];
    const pilotPromises = await pilotBets.map(async (pilot) => {
        const pilotDB = await pilotService.findPilotById(pilot.id);
        if (!pilotDB) pilotsNotFound.push(pilot.id);
        return { id: pilotDB._id, ...pilot };
    });
    if (pilotsNotFound.length > 0)
        return res.status(404).send({
            message: "Pilots not found in database",
            pilotsNotFound,
        });
    await Promise.all(pilotPromises).then((results) => {
        pilotBets = results;
    });

    req.body = {
        ...req.body,
        pilotBets,
    };

    next();
};

module.exports = {
    validateNewBet: _validateNewBet,
    validatePilotsRequest: _validatePilotsRequest,
};
