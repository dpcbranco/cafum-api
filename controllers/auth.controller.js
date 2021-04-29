const cryptography = require('../utils/cryptography.util');
const auth = require('../utils/auth.util');
const authService = require('../services/auth.service');

const _login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(400).send({
            error: 'Username or password not informed',
        });
    }

    const user = await authService.findByUsername(username);

    if (!user) return res.status(404).send({ message: 'Username not found' });

    const decryptedPassword = cryptography.decrypt({
        content: user.password,
        iv: user.iv,
    });

    return decryptedPassword === password
        ? res.status(200).send({ token: auth.generateToken(user._id) })
        : res.status(401).send({ message: 'Incorrect password' });
};

const _signup = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(400).send({
            error: 'Username or password not informed',
        });
    }

    let user = await authService.findByUsername({ username });

    if (user)
        return res.status(409).send({ message: 'User already existent.' });

    const encryptedPassword = cryptography.encrypt(password);

    return await res.status(200).send(
        authService.create({
            username,
            password: encryptedPassword.content,
            iv: encryptedPassword.iv,
        })
    );
};

module.exports = {
    login: _login,
    signup: _signup,
};
