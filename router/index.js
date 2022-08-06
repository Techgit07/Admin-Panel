const express = require('express');
const passport = require('passport')
const router = express.Router();

router.use('/admin', require('./Api/ver_1/admin'));
router.use('/category', require('./Api/ver_1/category'));

module.exports = router;