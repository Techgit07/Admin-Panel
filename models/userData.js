const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;