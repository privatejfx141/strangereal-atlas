const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    _id: { // _id is the country name (lowercase)
        type: String,
        required: true,
    },
    datatype: {
        type: String,
        enum: ["country", "region", "org"],
        required: true
    },
    parentId: { // if region, id of parent country
        type: String,
    },
    name: { // name of the country (title case)
        type: String,
        required: true,
        index: true
    },
    fullname: { // full name of the country
        type: String,
    },
    gov: { // government type
        type: String,
    },
    capitalId: { // id of the country's capital
        type: String,
    },
    location: { // location this country resides
        type: String,
    },
    desc : {
        type: String,
    },
    url: {
        type: String
    }
});

const Country = mongoose.model('Country', CountrySchema, 'countries');
module.export = Country;
