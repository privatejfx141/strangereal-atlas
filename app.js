const path = require('path');
const express = require('express');
const app = express();

// server settings
const keys = require('./config/keys');

// connect to db
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true });

// initialize all models
const models = path.join(__dirname, './models');
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(path.join(models, file)));

// setup global middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(function (req, res, next) {
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

/* Read */

COUNTRY_PAGE_SIZE = 10;

// get the 10 latest countries
app.get('/api/countries/', function (req, res) {
    
});

// get a specific country by id
app.get('/api/countries/:id/', function (req, res) {

});
