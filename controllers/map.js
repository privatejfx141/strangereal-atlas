/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs').promises;

const MIN_ZOOM = 0;
const MAX_ZOOM = 5;

// integer validator for getting tile at coordinates
exports.checkZXY = function (req, res, next) {
    const err = `parameters not valid`;
    const regex = /^[0-9]+$/;
    [req.params.z, req.params.x, req.params.y].forEach(param => {
        if (!param.match(regex)) return res.status(400).end(err);
    });
    let z = parseInt(req.params.z) || 0;
    if (z < MIN_ZOOM || z > MAX_ZOOM) return res.status(400).end(err);
    next();
};

// GET /api/maps/strangereal/
exports.getMapInfo = function (_, res) {
    return res.json({
        "mapId": "strangereal",
        "width": 8192,
        "height": 4743,
        "minZoom": MIN_ZOOM,
        "maxZoom": MAX_ZOOM
    });
};

// GET /api/maps/strangereal/:z/:x/:y.png
exports.getTile = async function (req, res) {
    let z = req.params.z;
    let x = req.params.x;
    let y = req.params.y;
    try {
        let tile = await fs.readFile(`./assets/maps/strangereal/${z}/${x}/${y}.png`);
        if (!tile) return res.status(404).end(`tile does not exist`);
        res.setHeader('Content-Type', 'image/png');
        return res.end(tile, 'binary');
    } catch (err) {
        if (err.code === "ENOENT") return res.status(404).end(`tile does not exist`);
        return res.status(500).end(err);
    }
};
