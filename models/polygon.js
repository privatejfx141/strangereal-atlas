const mongoose = require('mongoose');

const PolygonSchema = new mongoose.Schema({
    _id: { // _id is the polygon name (lowercase)
        type: String,
        required: true,
    },
    latlngs: { // polygon latlngs (absolute, 2D array of [lat, lng])
        type: [[[Number]]],
        required: true,
    }
});

const Polygon = mongoose.model('Polygon', PolygonSchema, 'polygons');
module.export = Polygon;
