const express = require('express');
const passport = require('passport');
const routes = express.Router();

const adminController = require('../../../controllers/Api/ver_1/admin_Controller');

routes.get('/', adminController.dashBoard);

routes.get('/register', adminController.register);

routes.post('/regData', adminController.regData);

routes.get('/login', adminController.login);

routes.post('/loginUser', passport.authenticate('local', { failureRedirect: '/admin/login' }), adminController.loginUser);

routes.get('/logOut', adminController.logOut);

routes.get('/changePass', passport.checkAuthenticatedUser, adminController.changePass);

routes.post('/confirmchangePass', adminController.confirmchangePass);

routes.get('/lostPassword', adminController.lostPassword);

routes.post('/recoverPasssword', adminController.recoverPasssword);

routes.get('/otpPage', adminController.otpPage);

routes.post('/checkOtp', adminController.checkOtp);

routes.get('/setPassword', adminController.setPassword);

routes.post('/newchangePass', adminController.newchangePass);

routes.get('/formBasic', passport.checkAuthenticatedUser, adminController.formBasic);

routes.post('/addUser', passport.checkAuthenticatedUser, adminController.addUser);

routes.get('/viewForm', passport.checkAuthenticatedUser, adminController.viewForm);

routes.get('/removeData/:id', passport.checkAuthenticatedUser, adminController.removeData);

routes.get('/updateData/:id', passport.checkAuthenticatedUser, adminController.updateData);

routes.post('/updateUser', passport.checkAuthenticatedUser, adminController.updateUser);

module.exports = routes;