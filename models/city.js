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
    countryId: { // id of the city's country
        type: String,
    },
    isCapital: { // whether or not this city is the capital
        type: Boolean,
        default: false,
    },
    desc : {
        type: String,
    }
});

const City = mongoose.model('City', CitySchema, 'cities');
module.export = City;