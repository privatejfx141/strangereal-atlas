/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');
const PolygonModel = mongoose.model('Polygon');

// purge collection for every restart
const PURGE = true;

// populate collection with dataset, if empty
const INITIALIZATION = true;

const POLYGON_DATASETS_PATH='./datasets/polygons';
(async () => {    
    if (PURGE) {
        await PolygonModel.deleteMany();
        console.log("Polygon dataset has been purged.");
    }
    if (INITIALIZATION && await PolygonModel.countDocuments() === 0) {
        const files = await fs.readdir(POLYGON_DATASETS_PATH);
        for (const file of files) {
            const filePath = path.join(POLYGON_DATASETS_PATH, file);
            console.log(`Reading ${filePath}.`);
            
            let id = path.basename(filePath, '.json')
            let latlngs = await fs.readFile(filePath);
            console.log(latlngs)
            let polygon = { "_id": id, latlngs: JSON.parse(latlngs) };

            await PolygonModel.insertMany(polygon);
            console.log(`Polygon ${file} has been inserted.`);
        }
        console.log("Polygon datasets have been initialized.");
    }
})();

// get specific location summary by id
// GET /api/polygon/:id/
exports.getPolygon = async function (req, res) {
    let id = req.params.id.toLowerCase();
    try {
        let polygon = await PolygonModel.findOne({ _id: id });
        if (!polygon) return res.status(404).end(`polygon ${id} does not exist`);
        return res.json({
            id: id,
            latlngs: polygon.latlngs,
        });
    } catch (err) {
        return res.status(500).end(err);
    }
}