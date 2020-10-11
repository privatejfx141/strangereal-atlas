const mongoose = require('mongoose');

const POISchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    conflictId: {
        type: String,
        required: true,
    },
    cityId: { // Which city does the POI take place in
        type: String,
    },
    name: {
        type: String,
    },
    altname: {
        type: String,
    },
    date: {
        type: Date,
    },
    desc: {
        type: String,
    },
    location: { // POI adhoc position with respect to the map
        type: [Number, Number]
    },
});

const POI = mongoose.model('POI', POISchema, 'poi');
module.export = POI;
