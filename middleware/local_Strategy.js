const passport = require('passport');
const local_Strategy = require('passport-local').Strategy;

const register = require('../models/register');

passport.use(new local_Strategy({
    usernameField: 'email'
}, (email, password, done) => {
    register.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log('userMail not found');
            return done(err);
        }
        if (!user || user.password !== password) {
            console.log('password not match');
            return done(null, false);
        }
        return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    register.findById(id, (err, user) => {
        if (err) {
            console.log('usersId not found');
            return done(null, false);
        }
        return done(null, user);
    });
});

passport.checkAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/admin/login');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;

