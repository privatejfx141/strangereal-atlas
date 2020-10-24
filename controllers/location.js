/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs').promises;
const mongoose = require('mongoose');
const LocationModel = mongoose.model('Location');
const CountryModel = mongoose.model('Country');

// purge collection for every restart
const PURGE = true;

// populate collection with dataset, if empty
const INITIALIZATION = true;

const LOCATION_DATASET_PATH = './datasets/locations.json';
(async () => {    
    if (PURGE) {
        await LocationModel.deleteMany();
        console.log("Location dataset has been purged.");
    }
    if (INITIALIZATION && await LocationModel.countDocuments() === 0) {
        let data = await fs.readFile(LOCATION_DATASET_PATH);
        await LocationModel.insertMany(JSON.parse(data));
        console.log("Location dataset has been initialized.");
    }
})();

// get all locations
// GET /api/locations/
exports.getLocations = async function (_, res) {
    try {
        let locations = await LocationModel.find({}, { _id: 1, dms: 1, name: 1, datatype: 1 });
        if (!locations) return res.status(404).end(`no locations present`);
        return res.json(locations);
    } catch (err) {
        return res.status(500).end(err);
    }
}

// get specific location summary by id
// GET /api/location/:id/
exports.getLocation = async function (req, res) {
    let id = req.params.id.toLowerCase();
    try {
        let location = await LocationModel.findOne({ _id: id });
        if (!location) return res.status(404).end(`location ${id} does not exist`);
        let region = await CountryModel.findById(location.countryId);
        let country = region.parentId ? await CountryModel.findOne({ _id: region.parentId }) : region;
        return res.json({
            datatype: location.datatype,
            name: location.name,
            country: country.name,
            region: region.name,
            dms: location.dms,
            desc: location.desc,
            url: location.url
        });
    } catch (err) {
        return res.status(500).end(err);
    }
};