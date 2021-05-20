const leagueService = require('../services/leagues.service');
const betService = require('../services/bets.services');

const _createLeague = async (req, res) => {
    return res.status(200).send(await leagueService.createLeague(
        { ...req.body, members: [{ user: res.user._id, owner: true }] }
    ));
};

const _findLeague = async (req, res) => {
    return res.status(200).send(res.league);
};

const _addUser = async (req, res) => {
    const league = res.league;
    const user = res.user;

    // Validates if user is already member
    if (league.members.find((member) => {
        return member.user.toString() === user._id.toString();
    })) return res.status(409).send({
        message: 'User already member of informed league.'
    });

    league.members.push({
        user: user._id, owner: req.query.owner, manager: req.query.manager 
    });

    await leagueService.updateLeague(req.params.leagueId, {
        members: league.members
    });

    return res.status(200).send({
        message: 'User added successfully'
    });
};

const _removeUser = async (req, res) => {
    const league = res.league;
    const user = res.user;

    league.members = league.members.filter(
        (member) => member.user.toString() !== user._id.toString() 
    );

    await leagueService.updateLeague(req.params.leagueId, {
        members: league.members
    });

    return res.status(200).send({
        message: 'User removed successfully'
    });
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

const _postNewLeagueBet = async (req, res) => {
    return res.status(200).send(await betService.createBet(req.body));
};

module.exports = {
    createLeague: _createLeague,
    findLeague: _findLeague,
    addUser: _addUser,
    removeUser: _removeUser,
    getLeagueBets: _getLeagueBets,
    postNewLeagueBet: _postNewLeagueBet,
};