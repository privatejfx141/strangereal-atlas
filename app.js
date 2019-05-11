const express = require('express');
const fs = require('fs');
const path = require('path');
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

const country = require('./controllers/country');
app.get('/api/countries/', country.getCountries);
app.get('/api/countries/:id/', country.getCountry);

const flag = require('./controllers/flag');
app.get('/api/countries/:id/flag/', flag.getFlag);

const city = require('./controllers/city');
app.get('/api/city/', country.getCountries);
app.get('/api/city/:id/', country.getCountry);

// setup server
const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});