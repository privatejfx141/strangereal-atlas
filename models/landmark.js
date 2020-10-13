const mongoose = require('mongoose');

const LandmarkSchema = new mongoose.Schema({
    _id: { // _id is the landmark name (lowercase)
        type: String,
        required: true,
    },
    name: { // name of the landmark (title case)
        type: String,
        required: true,
    },
    class: { // class of the landmark
        type: String,
    },
    latLng: { // landmark adhoc position with respect to the map
        type: [Number]
    },
    dms: { // landmark DMS position according to lore
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
        type: String,
    },
    url: {
        type: String
    }
});

const Landmark = mongoose.model('Landmark', LandmarkSchema, 'landmarks');
module.export = Landmark;
