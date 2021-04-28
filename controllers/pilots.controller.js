const pilotsService = require('../services/pilots.service');

const _getAllPilots = async (req, res) => {
    const sort = req.query.orderBy
        ? { [req.query.orderBy]: req.query.desc ? -1 : 1 }
        : {};
    return res.status(200).send(await pilotsService.findPilots({}, sort));
};

module.exports = {
    getAllPilots: _getAllPilots,
};
