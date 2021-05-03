const express = require('express');
const logger = require('morgan');
const initializeDatabase = require('./database');
const authUtils = require('../utils/auth.util');

const authRouter = require('../routes/auth.router');
const pilotsRouter = require('../routes/pilots.router');
const betsRouter = require('../routes/bets.router');
const leagueRouter = require('../routes/leagues.router');

const app = express();

initializeDatabase(
    // eslint-disable-next-line max-len
    'mongodb+srv://admin:admin@cluster0.jimdg.mongodb.net/cafum?retryWrites=true&w=majority'
);
app.use(logger('dev'));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/pilots', authUtils.validateToken, pilotsRouter);
app.use('/bets', authUtils.validateToken, betsRouter);
app.use('/leagues', authUtils.validateToken, leagueRouter);
app.use(function (req, res) {
    return res.status(404).send({ error: 'Endpoint Not Found!' });
});

module.exports = app;
