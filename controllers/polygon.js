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
const INITIALIZATION = false;
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