/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs').promises;
const mongoose = require('mongoose');
const CountryModel = mongoose.model('Country');

// gets the flag image of the country
exports.getFlag = async function (req, res) {
    let countryId = req.params.id.toLowerCase();
    try {
        let country = await CountryModel.findOne({ _id: countryId });
        if (!country) return res.status(404).end(`country '${countryId}' does not exist`);
        let image = null;
        try {
            image = await fs.readFile(`./assets/flags/${countryId}.png`);
        } catch (err) {
            image = await fs.readFile(`./assets/unknown.png`);
        } finally {
            res.setHeader('Content-Type', 'image/png');
            return res.end(image, 'binary');
        }
    } catch (err) {
        return res.status(500).end(err);
    }
};
