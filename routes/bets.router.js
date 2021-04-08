const router = require("express").Router();
const betsController = require("../controllers/bets.controller");

router.get("/user/:userId", betsController.getBetByUser);
router.post("/new", betsController.postNewBet);

module.exports = router;
