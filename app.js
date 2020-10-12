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

/* Read */

const country = require('./controllers/country');
app.get('/api/countries/', country.getCountries);
app.get('/api/countries/:id/', country.getCountry);

const flag = require('./controllers/flag');
app.get('/api/countries/:id/flag/', flag.getFlag);

const city = require('./controllers/city');
app.get('/api/allcities/', city.getAllCities);
app.get('/api/cities/', city.getCities);
app.get('/api/cities/:id/', city.getCity);
app.get('/api/cities/:id/summary/', city.getCitySummary);

const map = require('./controllers/map');
app.get('/api/maps/strangereal/:z/:x/:y.png', map.checkZXY, map.getTile);

const poi = require('./controllers/poi');
app.get('/api/poi/:conflict/', poi.getPOIs);

const polygons = require('./controllers/polygon');
app.get('/api/polygons/:id/', polygons.getPolygon)

// setup server
const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
