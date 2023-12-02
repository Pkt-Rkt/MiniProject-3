const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    fuel_type: String,
    drive: String,
    cylinders: Number,
    transmission: String,
    year: Number,
});

module.exports = mongoose.model('Car', carSchema);
