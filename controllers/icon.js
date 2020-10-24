/* jshint node: true */
"use strict";

/**
 * Module dependencies.
 */
const fs = require('fs').promises;

// get marker icon by id
// GET /api/icon/:id.png
exports.getIcon = async function (req, res) {
    let id = req.params.id.toLowerCase();
    try {
        let icon = await fs.readFile(`./assets/icons/${id}.png`);
        res.setHeader('Content-Type', 'image/png');
        return res.end(icon, 'binary');
    } catch (err) {
        if (err.code === "ENOENT") return res.status(404).end(`icon does not exist`);
        return res.status(500).end(err);
    }
};
