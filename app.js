const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// server settings
const keys = require('./config/keys');
console.log(keys.mongoURI);

// connect to db
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

// initialize all models
const models = path.join(__dirname, './models');
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(path.join(models, file)));

// setup global middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(function (req, res, next) {
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

// country
const country = require('./controllers/country');
app.get('/api/countries/', country.getCountries);
app.get('/api/countries/:id/', country.getCountry);

// flag
const flag = require('./controllers/flag');
app.get('/api/countries/:id/flag.png', flag.getFlag);

// map tile
const icon = require('./controllers/icon');
app.get('/api/icons/:id.png', icon.getIcon);

// location (city, base, airport, superweapon)
const location = require('./controllers/location');
app.get('/api/locations/', location.getLocations);
app.get('/api/locations/:id/', location.getLocation);

// map tile
const map = require('./controllers/map');
app.get('/api/maps/strangereal/:z/:x/:y.png', map.checkZXY, map.getTile);

// setup server
const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
