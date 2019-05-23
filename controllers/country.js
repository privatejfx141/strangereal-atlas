/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs');
const mongoose = require('mongoose');
const CountryModel = mongoose.model('Country');

// populate collection with dataset, if empty
const INITIALIZATION = true;
const COUNTRY_DATASET_PATH = './datasets/countries.json';
CountryModel.countDocuments((err, count) => {
    if (err) throw err;
    if (INITIALIZATION && count === 0) {
        fs.readFile(COUNTRY_DATASET_PATH, (err, data) => {  
            if (err) throw err;
            CountryModel.insertMany(JSON.parse(data), function (err, doc) {
                if (err) throw err;
                console.log("Country dataset has been initialized.");
            });
        });
    }
});

// size for pagination
const COUNTRY_PAGE_SIZE = 10;

// get paginated list of countries ids
// GET /api/countries/[?page]
exports.getCountries = function (req, res) {
    let page = parseInt(req.query.page) || 0;
    CountryModel.find({}, { _id: 1 })
        .skip(page * COUNTRY_PAGE_SIZE)
        .limit(COUNTRY_PAGE_SIZE)
        .exec(function (err, countries) {
            if (err) return res.status(500).end(err);
            return res.json(countries.map(country => country._id));
        });
};

// get specific country by id
// GET /api/countries/:id/
exports.getCountry = function (req, res) {
    let countryId = req.params.id.toLowerCase();
    CountryModel.findOne({ _id: countryId }, function (err, country) {
        if (err) return res.status(500).end(err);
        if (!country) return res.status(404).end(`country '${countryId}' does not exist`);
        return res.json(country);
    });
};
