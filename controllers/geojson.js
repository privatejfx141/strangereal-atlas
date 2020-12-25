/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs').promises;

// GET /api/geojson/:id/
exports.getGeoJSON = async function (req, res) {
    let regionId = req.params.id.toLowerCase();
    try {
        let data = await fs.readFile(`./datasets/geojson/${regionId}.geojson`);
        if (!data) return res.status(404).end(`region does not exist`);
        return res.json(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            console.log("ENOENT");
            return res.status(404).end(`region does not exist`);
        }
        return res.status(500).end(err);
    }
}