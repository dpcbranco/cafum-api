const leagueService = require('../services/leagues.service');

const _createLeague = async (req, res) => {
    if (leagueService.findLeagueByName(req.body.name))
        return res.status(409).send({
            message: 'League already existent with this name.'
        });
    
    return res.status(200).send(leagueService.createLeague(req.body));
};

module.exports = {
    createLeague: _createLeague
};