const leagueService = require('../services/leagues.service');

const _createLeague = async (req, res) => {
    if (await leagueService.findLeagueByName(req.body.name))
        return res.status(409).send({
            message: 'League already existent with this name.'
        });
    
    return res.status(200).send(await leagueService.createLeague(req.body));
};

const _findLeague = async (req, res) => {
    const league = await leagueService.findLeagueById(req.params.id);
    if (!league) return res.status(404).send({ message: 'League not found' });
    return res.status(200).send(league);
};

module.exports = {
    createLeague: _createLeague,
    findLeague: _findLeague
};