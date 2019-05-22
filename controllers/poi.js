/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs');;
const mongoose = require('mongoose');
const POIModel = require('POI');

// populate collection with dataset, if empty
const INITIALIZATION = false;
const POI_DATASET_PATH = './datasets/poi.json';
POIModel.countDocuments((err, count) => {
    if (err) throw err;
    if (INITIALIZATION && count === 0) {
        fs.readFile(POI_DATASET_PATH, (err, data) => {  
            if (err) throw err;
            POIModel.insertMany(JSON.parse(data), function (err, doc) {
                if (err) throw err;
                console.log("POI dataset has been initialized.");
            });
        });
    }
});

// size for pagination
const POI_PAGE_SIZE = 10;

exports.getPOIs = function (req, res) {
    let page = parseInt(req.query.page) || 0;
    let conflictId = req.query.conflictId;
    if (conflictId) conflictId = conflictId.toLowerCase();
};
