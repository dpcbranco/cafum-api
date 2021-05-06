const gpService = require('../services/gps.service');

const _validateGpExistence = async (req, res, next) => {
    // Validates existence of GP reference in database
    const gp = await gpService.findById(req.body.gpId);
    if (!gp) return res.status(404).send({ message: 'GP not found.' });

    res.gp = gp;

    next();
};

module.exports = {
    validateGpExistence: _validateGpExistence
};