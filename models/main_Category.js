const mongoose = require('mongoose');

const maincatSchema = mongoose.Schema({
    mainCategory: {
        type: String,
        required: true
    }
})

const maincat = mongoose.model('maincat', maincatSchema);

module.exports = maincat;