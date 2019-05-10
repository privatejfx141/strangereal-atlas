/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const CountryModel = mongoose.model('Country');

// size for pagination
const COUNTRY_PAGE_SIZE = 10;

// get paginated list of countries ids
exports.getCountries = function (req, res) {
    let page = parseInt(req.query.page) || 0;
    let continent = req.query.continent;
    CountryModel.find({}, { _id: 1 })
        .skip(page * COUNTRY_PAGE_SIZE)
        .limit(COUNTRY_PAGE_SIZE)
        .exec(function (err, countries) {
            if (err) return res.status(500).end(err);
            return res.json(countries);
        });
};

// get specific country by id
exports.getCountry = function (req, res) {
    let countryId = req.params.id;
    CountryModel.findOne({ _id: countryId }, function (err, country) {
        if (err) return res.status(500).end(err);
        if (!country) return res.status(404).end(`country ${countryId} does not exist`);
        return res.json(country);
    });
};