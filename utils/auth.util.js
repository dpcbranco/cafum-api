const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const authService = require('../services/auth.service');

const _generateToken = (id) => {
    return jwt.sign({ id }, secretKey, {
        expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    });
};

const _validateToken = async (req, res, next) => {
    if (!req.headers['authorization'])
        return res.status(400).send({ message: 'Access Token not received' });
    const token = req.headers['authorization'].replace('Bearer ', '');
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err)
            return err.name === 'TokenExpiredError'
                ? res.status(401).send({ message: 'Token expired' })
                : res
                    .status(500)
                    .json({ message: 'Failed to authenticate token.' });
        const userId = decoded.id;
        const user = await authService.findById(userId);
        if (!user)
            return res.status(401).send({ message: 'Invalid access token' });
        res.user = user;
        next();
    });
};

module.exports = {
    generateToken: _generateToken,
    validateToken: _validateToken,
};
