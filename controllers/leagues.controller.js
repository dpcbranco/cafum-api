const leagueService = require('../services/leagues.service');
const userService = require('../services/users.service');

const _createLeague = async (req, res) => {
    if (await leagueService.findLeagueByName(req.body.name))
        return res.status(409).send({
            message: 'League already existent with this name.'
        });

    return res.status(200).send(await leagueService.createLeague(req.body));
};

const _findLeague = async (req, res) => {
    const league = await leagueService.findLeagueById(req.params.id);
    if (!league) return res.status(404).send({
        message: 'League not found'
    });
    return res.status(200).send(league);
};

const _addUser = async (req, res) => {
    // Validates existence of league
    const league = await leagueService.findLeagueById(req.params.leagueId);
    if (!league) return res.status(404).send({
        message: 'League not found'
    });

    // Validates existence of user reference in database
    const user = await userService.findById(req.params.userId);
    if (!user) return res.status(404).send({
        message: 'User not found.'
    });

    // Validates if user is already member
    if (league.members.find((member) => {
        return member._id.toString() === user._id.toString();
    })) return res.status(409).send({
        message: 'User already member of informed league.'
    });

    league.members.push(user._id);

    await leagueService.updateLeague(req.params.leagueId, {
        members: league.members
    });

    return res.status(200).send({
        message: 'User added successfully'
    });
};

module.exports = {
    createLeague: _createLeague,
    findLeague: _findLeague,
    addUser: _addUser
};