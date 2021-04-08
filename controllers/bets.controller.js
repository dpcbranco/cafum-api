const betService = require("../services/bets.services");
const userService = require("../services/users.service");

const _getBetByUser = async (req, res) => {
    const betFilter = { userId: req.params.userId };
    if (req.query.gp) betFilter.gpId = req.query.gp;
    return await betService.findBet(betFilter);
};

const _postNewBet = async (req, res) => {
    if (!req.body.gpId)
        return res.status(400).send({ error: "Error: gpId not informed" });
    if (!req.body.userId)
        return res.status(400).send({ error: "Error: userId not informed" });
    const betFilter = { userId: req.body.userId, gpId: req.body.gpId };
    if (await betService.findBet(betFilter))
        res.status(400).send({ error: "Bet already created for this GP." });
    if (!(await userService.findById(req.body.userId)))
        res.status(404).send({ error: "User not found." });

    return res.status(200).send(await betService.createBet(req.body));
};

module.exports = {
    getBetByUser: _getBetByUser,
    postNewBet: _postNewBet,
};
