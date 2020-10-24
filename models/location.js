const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    _id: { // _id is the city name (lowercase)
        type: String,
        required: true,
    },
    datatype: { // datetype of the location (lowercase)
        type: String,
        enum: ['city', 'capital', 'crater', 'base', 'airport', 'superweapon'],
        required: true,
    },
    countryId: { // ID of the location's country
        type: String,
        required: true,
    },
    name: { // name of the location (title case)
        type: String,
        required: true,
    },
    dms: { // location's DMS position
        lat: [Number],
        lng: [Number]
    },
    desc: {
        type: String
    },
    url: {
        type: String
    }
});

const Location = mongoose.model('Location', LocationSchema, 'locations');
module.export = Location;
