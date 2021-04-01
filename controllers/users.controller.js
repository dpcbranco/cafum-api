const User = require("../models/User");
const mongoose = require("mongoose");
const cryptography = require("../utils/cryptography.util");
const userModel = mongoose.model("User", User, "users");

const _login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(400).send({
            error: "Username or password not informed",
        });
    }

    const user = await userModel.findOne({ username });

    if (!user) return res.status(404).send({ message: "Username not found" });

    const decryptedPassword = cryptography.decrypt({
        content: user.password,
        iv: user.iv,
    });

    return decryptedPassword === password
        ? res.status(200).send({ message: "Login successful!" })
        : res.status(401).send({ message: "Password incorrect" });
};

const _signup = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(400).send({
            error: "Username or password not informed",
        });
    }

    let user = await userModel.findOne({ username });

    if (user)
        return res.status(409).send({ message: "User already existent." });

    const encryptedPassword = cryptography.encrypt(password);

    user = await userModel.create({
        username,
        password: encryptedPassword.content,
        iv: encryptedPassword.iv,
    });

    return res.status(200).send(user);
};

module.exports = {
    login: _login,
    signup: _signup,
};
