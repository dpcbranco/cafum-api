const userService = require("../services/users.service");
const gpService = require("../services/gps.service");
const betService = require("../services/bets.services");
const pilotService = require("../services/pilots.service");

const _validateNewBet = async (req, res, next) => {
    // Validates mandatory fields sent in the request body
    if (!req.body.gpId)
        return res.status(400).send({ error: "Error: gpId not informed" });
    if (!req.body.userId)
        return res.status(400).send({ error: "Error: userId not informed" });

    // Validates existence of user reference in database
    const user = await userService.findById(req.body.userId);
    if (!user) return res.status(404).send({ error: "User not found." });

    // Validates existence of GP reference in database
    const gp = await gpService.findById(req.body.gpId);
    if (!gp) return res.status(404).send({ error: "GP not found." });

    let pilotBets = [];

    // Validates pilot list from qualifying bet
    if (req.body.pilotBets) {
        const pilotsNotFound = [];
        const pilotPromises = await req.body.pilotBets.map(async (pilot) => {
            const pilotDB = await pilotService.findPilotById(pilot.id);
            if (!pilotDB) pilotsNotFound.add(pilot.id);
            return { id: pilotDB._id, ...pilot };
        });
        if (pilotsNotFound.length > 0)
            return res.status(404).send({
                error: "Pilots not found in database",
                pilotsNotFound,
            });
        await Promise.all(pilotPromises).then((results) => {
            pilotBets = results;
        });
    }

    const betFilter = {
        userId: user._id,
        gpId: gp._id,
    };

    const bet = await betService.findBet(betFilter);
    if (bet)
        return res
            .status(409)
            .send({ error: "Bet already created for this GP." });

    req.body = {
        ...betFilter,
        pilotBets,
    };
    next();
};

module.exports = {
    validateNewBet: _validateNewBet,
};
