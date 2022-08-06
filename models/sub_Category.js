const mongoose = require('mongoose');

const subcatSchema = mongoose.Schema({
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'maincat'
    },
    subcategory: {
        type: String,
        required: true
    }
})

const subcat = mongoose.model('subcat', subcatSchema);

module.exports = subcat;