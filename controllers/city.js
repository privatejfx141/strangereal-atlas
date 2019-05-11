/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const CityModel = mongoose.model('City');

// size for pagination
const CITY_PAGE_SIZE = 10;

// get paginated list of cities ids
// GET /api/cities/[?page]
exports.getCities = function (req, res) {
    let page = parseInt(req.query.page) || 0;
    let countryId = req.query.countryId;
    if (countryId) countryId = countryId.toLowerCase();
    let callback = function (err, cities) {
        if (err) return res.status(500).end(err);
        return res.json(cities.map(city => city._id));
    };
    if (countryId) {
        CityModel.find({countryId: countryId}, { _id: 1 })
            .skip(page * CITY_PAGE_SIZE)
            .limit(CITY_PAGE_SIZE)
            .exec(callback);
    } else {
        CityModel.find({}, { _id: 1 })
            .skip(page * CITY_PAGE_SIZE)
            .limit(CITY_PAGE_SIZE)
            .exec(callback);
    }
};

// get specific city by id
// GET /api/cities/:id/
exports.getCity = function (req, res) {
    let cityId = req.params.id.toLowerCase();
    CityModel.findOne({ _id: cityId }, function (err, city) {
        if (err) return res.status(500).end(err);
        if (!city) return res.status(404).end(`city ${cityId} does not exist`);
        return res.json(city);
    });
};