const mongoose = require('mongoose');

const PolygonSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    polylines: {
        type: [[String]],
        required: true,
    }
});

const Polygon = mongoose.model('Polygon', PolygonSchema, 'polygons');
module.export = Polygon;
