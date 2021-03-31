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
        return res.status(200).send({message: "Login successful!"})
    
    return res.status(401).send({message: "Username and/or password incorrect"})
})

router.post("/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        res.status(400).send({
            error: "Username or password not informed"
        })
    }

    const userCreated = await userController.signup(username, password)

    if (userCreated)
        return res.status(200).send(userCreated)
    
    return res.status(409).send({message: "User already existent."})
})

module.exports = router;