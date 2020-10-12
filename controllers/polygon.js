/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs');
const mongoose = require('mongoose');
const PolygonModel = mongoose.model('Polygon');
const PolylineModel = mongoose.model('Polyline');

// populate collection with dataset, if empty
const INITIALIZATION = true;
const POLYLINE_DATASET_PATH = './datasets/polylines.json';
const POLYGON_DATASET_PATH = './datasets/polygons.json';

PolylineModel.countDocuments((err, count) => {
    if (err) throw err;
    if (INITIALIZATION && count === 0) {
        fs.readFile(POLYLINE_DATASET_PATH, (err, data) => {  
            if (err) throw err;
            PolylineModel.insertMany(JSON.parse(data), function (err, doc) {
                if (err) throw err;
                console.log("Polyline dataset has been initialized.");
            });
        });
    }
});

PolygonModel.countDocuments((err, count) => {
    if (err) throw err;
    if (INITIALIZATION && count === 0) {
        fs.readFile(POLYGON_DATASET_PATH, (err, data) => {  
            if (err) throw err;
            PolygonModel.insertMany(JSON.parse(data), function (err, doc) {
                if (err) throw err;
                console.log("Polygon dataset has been initialized.");
            });
        });
    }
});

// get polygon of country by id
// GET /api/polygons/:id/
exports.getPolygon = function (req, res) {
    let countryId = req.params.id.toLowerCase();
    PolygonModel.findOne({ _id: countryId }, function (err, polylines) {
        if (err) return res.status(500).end(err);
        polylines.polylines.forEach(polygon => {
            PolylineModel.find({ _id: { $in: polygon } }, (err, latLngs) => {
                if (err) return res.status(500).end(err);
                if (!latLngs) return res.status(404).end(`no polygons present`);
                latLngs = latLngs.map(llArrays => llArrays.latLngs);
                return res.json(latLngs); 
            });
        });
    });
};
