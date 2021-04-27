const express = require("express");
const logger = require("morgan");
const initializeDatabase = require("./database");
const authUtils = require("../utils/auth.util");

const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users.router");
const pilotsRouter = require("../routes/pilots.router");
const betsRouter = require("../routes/bets.router");

const app = express();

initializeDatabase(
    "mongodb+srv://admin:admin@cluster0.jimdg.mongodb.net/cafum?retryWrites=true&w=majority"
);
app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/pilots", authUtils.validateToken, pilotsRouter);
app.use("/bets", authUtils.validateToken, betsRouter);
app.use(function (req, res, next) {
    res.status(404).send({ error: "Endpoint Not Found!" });
});

module.exports = app;
