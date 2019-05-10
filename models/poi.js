const mongoose = require('mongoose');

const POISchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    date: {
        type: Date,
    },
    desc: {
        type: String,
    }
});

const POI = mongoose.model('POI', CitySchema, 'poi');
module.export = POI;
