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

const _getLeagueBets = async (req, res) => {
    const betFilter = { 
        leagueId: res.league._id.toString() 
    };
    if (req.query.userId) betFilter.userId = req.query.userId;
    if (req.query.gpId) betFilter.gpId = req.query.gp;
    const bets = await betService.findBet(betFilter);
    return bets.length > 0 ?
        res.status(200).send(bets) : 
        res.status(404).send({ message: 'No bets found.' });
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
    getLeagueBets: _getLeagueBets,
    postNewBet: _postNewBet,
    patchBet: _patchBet,
};
