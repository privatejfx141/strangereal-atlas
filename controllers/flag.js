/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs');
const mongoose = require('mongoose');
const CountryModel = mongoose.model('Country');

// gets the flag image of the country
exports.getFlag = function (req, res) {
    let countryId = req.params.id.toLowerCase();
    CountryModel.findOne({ _id: countryId }, function (err, country) {
        if (err) return res.status(500).end(err);
        if (!country) return res.status(404).end(`country '${countryId}' does not exist`);
        fs.readFile(`./assets/flags/${countryId}.png`, function(err, image) {
            if (err) return res.status(500).end(err);
            if (!image) return res.status(404).end(`flag for '${countryId}' does not exist`);
            res.setHeader('Content-Type', 'image/png');
            return res.end(image, 'binary');
        });
    });
};
