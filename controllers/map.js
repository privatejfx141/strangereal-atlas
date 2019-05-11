/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs');

// GET /api/maps/strangereal/:z/:x/:y/
exports.getTile = function (req, res) {
    let z = req.params.z;
    let x = req.params.x;
    let y = req.params.y;
};
