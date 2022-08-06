const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: 'SSL',
    auth: {
        user: 'kaushalnena09@zohomail.in',
        pass: 'zoho$123'
    }
});

module.exports = transport;