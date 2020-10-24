/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs').promises;
const mongoose = require('mongoose');
const CountryModel = mongoose.model('Country');

// purge collection for every restart
const PURGE = true;

// populate collection with dataset, if empty
const INITIALIZATION = true;

const COUNTRY_DATASET_PATH = './datasets/countries.json';
(async () => {
    if (PURGE) {
        await CountryModel.deleteMany();
        console.log("Country dataset has been purged.");
    }
    if (INITIALIZATION && await CountryModel.countDocuments() === 0) {
        let data = await fs.readFile(COUNTRY_DATASET_PATH);
        await CountryModel.insertMany(JSON.parse(data));
        console.log("Country dataset has been initialized.");
    }
})();

// size for pagination
const COUNTRY_PAGE_SIZE = 10;

// get paginated list of countries ids
// GET /api/countries/[?page]
exports.getCountries = async function (req, res) {
    let page = parseInt(req.query.page) || 0;
    try {
        let countries = await CountryModel.find({}, { _id: 1 })
            .skip(page * COUNTRY_PAGE_SIZE)
            .limit(COUNTRY_PAGE_SIZE);
        return res.json(countries.map(country => country._id));
    } catch (err) {
        return res.status(500).end(err);
    }
};

// get specific country by id
// GET /api/countries/:id/
exports.getCountry = async function (req, res) {
    let countryId = req.params.id.toLowerCase();
    try {
        let country = await CountryModel.findOne({ _id: countryId });
        if (!country) return res.status(404).end(`country '${countryId}' does not exist`);
        return res.json(country);
    } catch (err) {
        return res.status(500).end(err);
    }
};
