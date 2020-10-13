const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    _id: { // _id is the city name (lowercase)
        type: String,
        required: true,
    },
    name: { // name of the city (title case)
        type: String,
        required: true,
    },
    countryId: { // ID of the city's country
        type: String,
        required: true,
    },
    location: { // location of the city
        type: String,
    },
    isCapital: { // whether or not this city is the capital
        type: Boolean,
        default: false,
    },
    latLng: { // city adhoc position with respect to the map
        type: [Number]
    },
    dms: { // city DMS position according to lore
        lat: {
            d: Number,
            m: Number,
            s: Number,
            dir: String
        },
        lng: {
            d: Number,
            m: Number,
            s: Number,
            dir: String
        }
    },
    desc: {
        type: String
    },
    url: {
        type: String
    }
});

const City = mongoose.model('City', CitySchema, 'cities');
module.export = City;
