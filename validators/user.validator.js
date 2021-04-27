const _validateUserRequest = (req, res, next) => {
    if (req.body.userId !== res.user.id)
        return res
            .status(401)
            .send({ message: "User not authorized to perform this action." });
    next();
};

module.exports = {
    validateUserRequest: _validateUserRequest,
};
