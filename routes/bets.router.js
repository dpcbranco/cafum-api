const router = require("express").Router();
const betValidator = require("../validators/bets.validator");
const betsController = require("../controllers/bets.controller");

router.get("/user/:userId", betsController.getBetByUser);
router.post("/new", betValidator.validateNewBet, betsController.postNewBet);

module.exports = router;
