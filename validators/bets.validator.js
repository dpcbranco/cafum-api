const userService = require("../services/users.service");
const gpService = require("../services/gps.service");
const betService = require("../services/bets.services");

const _validateNewBet = async (req, res, next) => {
    if (!req.body.gpId)
        return res.status(400).send({ error: "Error: gpId not informed" });
    if (!req.body.userId)
        return res.status(400).send({ error: "Error: userId not informed" });

    const user = await userService.findById(req.body.userId);
    if (!user) return res.status(404).send({ error: "User not found." });

    const gp = await gpService.findById(req.body.gpId);
    if (!gp) return res.status(404).send({ error: "GP not found." });

    const betFilter = {
        userId: user._id,
        gpId: gp._id,
    };

    const bet = await betService.findBet(betFilter);
    if (bet)
        return res
            .status(409)
            .send({ error: "Bet already created for this GP." });

    req.body.userId = user._id;
    req.body.gpId = gp._id;
    next();
};

module.exports = {
    validateNewBet: _validateNewBet,
};
