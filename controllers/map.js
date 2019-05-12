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
    fs.readFile(`./assets/maps/strangereal/${z}/${x}/${y}.png`, function (err, image) {
        if (err) return res.status(500).end(err);
        if (!image) return res.status(404).end(`tile does not exist`);
        res.setHeader('Content-Type', 'image/png');
        return res.end(image, 'binary');
    });
};
