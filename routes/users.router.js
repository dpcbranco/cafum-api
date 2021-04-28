const router = require('express').Router();
const userController = require('../controllers/users.controller');

router.get('/login', userController.login);

router.post('/signup', userController.signup);

module.exports = router;
