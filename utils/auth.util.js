const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const userService = require("../services/users.service");

const _generateToken = (id) => {
    return jwt.sign({ id }, secretKey);
};

const _validateToken = async (req, res, next) => {
    const token = req.headers["authorization"].replace("Bearer ", "");
    if (!token)
        return res.status(400).send({ message: "Access Token not received" });
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err)
            return err.name === "TokenExpiredError"
                ? res.status(401).send({ message: "Token expired" })
                : res
                      .status(500)
                      .json({ message: "Failed to authenticate token." });
        const userId = decoded.id;
        const user = await userService.findById(userId);
        if (!user)
            return res.status(401).send({ message: "Invalid access token" });
        next();
    });
};

module.exports = {
    generateToken: _generateToken,
    validateToken: _validateToken,
};
