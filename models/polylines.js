const mongoose = require('mongoose');

const PolylineSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    latLngs: {
        type: [Number, Number],
        required: true,
    }
});

const Polyline = mongoose.model('Polyline', PolylineSchema, 'polylines');
module.export = Polyline;
