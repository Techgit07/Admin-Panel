const express = require('express');
const passport = require('passport')
const router = express.Router();

const catController = require('../../../controllers/Api/ver_1/category_Controller');

router.get('/mainCategoryPage', passport.checkAuthenticatedUser, catController.mainCategoryPage);

router.get('/subCategoryPage', passport.checkAuthenticatedUser, catController.subCategoryPage);

router.post('/addMainCat', passport.checkAuthenticatedUser, catController.addMainCat);

router.post('/addSubCat', passport.checkAuthenticatedUser, catController.addSubCat);

router.get('/viewcatData', passport.checkAuthenticatedUser, catController.viewcatData);

module.exports = router;