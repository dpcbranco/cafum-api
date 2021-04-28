const express = require('express');
const logger = require('morgan');
const initializeDatabase = require('./database');

const usersRouter = require('../routes/users.router');
const pilotsRouter = require('../routes/pilots.router');
const betsRouter = require('../routes/bets.router');

const app = express();

initializeDatabase(
    'mongodb+srv://admin:admin@cluster0.jimdg.mongodb.net/cafum?retryWrites=true&w=majority'
);
app.use(logger('dev'));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/pilots', pilotsRouter);
app.use('/bets', betsRouter);
app.use(function (req, res) {
    res.status(404).send({ error: 'Endpoint Not Found!' });
});

module.exports = app;
