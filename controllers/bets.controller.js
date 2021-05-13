const betService = require('../services/bets.services');

const _getBetById = async (req, res) => {
    const bet = await betService.findBetById(req.params.id);
    if (bet.leagueId.toString() !== res.league._id.toString())
        return res.status(401).send(
            { message: 'Bet does not belong to this league' }
        );
    return bet ? 
        res.status(200).send(bet) : 
        res.status(404).send({ message: 'Bet not found' });
};

const _getBetsByUser = async (req) => {
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
    getBetById: _getBetById,
    getBetsByUser: _getBetsByUser,
    postNewBet: _postNewBet,
    patchBet: _patchBet,
};
