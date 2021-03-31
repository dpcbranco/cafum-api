const express = require('express');
const logger = require('morgan');
const initializeDatabase = require('./database')

const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');

var apiRequester = require('./api-caller')

const app = express();

//initializeDatabase("mongodb+srv://admin:admin@cluster0.jimdg.mongodb.net/cafum?retryWrites=true&w=majority")


app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(function (req, res, next) {
    res.status(404).send({error: "Endpoint Not Found!"})
})

module.exports = app;
