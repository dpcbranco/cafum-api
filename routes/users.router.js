const router = require('express').Router();
const userController = require('../controllers/users.controller')

router.get("/login", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        res.status(400).send({
            error: "Username or password not informed"
        })
    }

    const loggedIn = await userController.login(username, password)

    if (loggedIn)
        return res.status(200).send(loggedIn)
    
    return res.status(401).send({message: "Username and/or password incorrect"})
})

module.exports = router;