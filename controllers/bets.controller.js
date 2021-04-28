const betService = require('../services/bets.services');

const _getBetByUser = async (req) => {
    const betFilter = { userId: req.params.userId };
    if (req.query.gp) betFilter.gpId = req.query.gp;
    return await betService.findBet(betFilter);
};

const _postNewBet = async (req, res) => {
    return res.status(200).send(await betService.createBet(req.body));
};

const _patchBet = async (req, res) => {
    return res
        .status(200)
        .send(await betService.updateBet(req.params.betId, req.body));
};

module.exports = {
    getBetByUser: _getBetByUser,
    postNewBet: _postNewBet,
    patchBet: _patchBet,
};
