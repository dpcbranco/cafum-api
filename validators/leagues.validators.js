const leagueService = require('../services/leagues.service');

const _validateExistingLeague = async (req, res, next) => {
    // Validates existence of league
    const league = await leagueService.findLeagueById(req.params.leagueId);
    if (!league) return res.status(404).send({
        message: 'League not found'
    });
    res.league = league;
    next();
};

const _validateManager = async (req, res, next) => {
    const managers = res.league.members.filter(
        (member) => member.owner || member.manager
    );

    // Verifies if user is manager or owner of the league
    if (!managers.some(
        (manager) => manager.user.toString() === res.user._id.toString())
    ) return res.status(401).send(
        { message: 'User not authorized to perform this action' }
    );
    
    next();
};

module.exports = {
    validateExistingLeague: _validateExistingLeague,
    validateManager: _validateManager
};