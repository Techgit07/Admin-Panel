const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Admins');

const dataBase = mongoose.connection;

dataBase.on('error', console.error.bind(console, 'dataBase is off'));

dataBase.once('open', (err) => {
    if (err) {
        console.log('dataBase is off' + err);
        return false;
    }
    console.log('dataBase is open');
})

module.exports = dataBase;