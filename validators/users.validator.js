const authService = require('../services/auth.service');

const validateUserExistence = async (req, res, next) => {
    
    // Validates existence of user reference in database
    const user = await authService.findById(req.params.userId);
    if (!user) return res.status(404).send({
        message: 'User not found.'
    });

    res.user = user;

    next();
};

module.exports = {
    validateUserExistence
};