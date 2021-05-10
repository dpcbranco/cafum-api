const betService = require('../services/bets.services');
const pilotService = require('../services/pilots.service');

const _validateNewBet = async (req, res, next) => {
    const errors = [];

    // Validates mandatory fields sent in the request body
    if (!req.body.gpId) errors.push({ message: 'gpId not informed' });
    if (req.body.pilotBets) {
        validatePilotDuplicates(req.body.pilotBets).forEach(
            error => errors.push(error)
        );
    }
    if (errors.length > 0) return res.status(400).send({ errors });

    next();
};

const _validateBetConflict = async (req, res, next) => {
    const betFilter = {
        userId: res.user._id,
        leagueId: res.league._id,
        gpId: res.gp._id,
    };

    const bet = await betService.findBet(betFilter);

    if (bet)
        return res
            .status(409)
            .send({ message: 'Bet already created for this GP.' });

    req.body = {
        ...req.body,
        ...betFilter,
    };

    next();
};

const validatePilotDuplicates = (pilotBets) => {

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
            message: 'Pilots duplicated on request body',
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
            message: 'Qualifying bet position duplicated',
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
            message: 'Race bet position duplicated',
            duplicated: duplicatedRace,
        });
    
    return errors;
};

const _validateBetPilots = async (req, res, next) => {
    let pilotBets = req.body.pilotBets;

    // Validates existence of pilot in database
    const pilotsNotFound = [];
    const pilotPromises = await pilotBets.map(async (pilot) => {
        const pilotDB = await pilotService.findPilotById(pilot.id);
        if (!pilotDB) pilotsNotFound.push(pilot.id);
        return { id: pilotDB._id, ...pilot };
    });
    if (pilotsNotFound.length > 0)
        return res.status(404).send({
            message: 'Pilots not found in database',
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

const _validateBetExistence = async (req, res, next) => {
    const bet = await betService.findBetById(req.params.betId);

    if (!bet)
        return res
            .status(404)
            .send({ message: 'Bet not found' });

    next();
};

module.exports = {
    validateNewBet: _validateNewBet,
    validateBetConflict: _validateBetConflict,
    validateBetPilots: _validateBetPilots,
    validateBetExistence: _validateBetExistence
};
