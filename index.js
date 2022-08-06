const express = require('express');
const port = 8888;
const app = express();
const path = require('path');
const dataBase = require('./middleware/mongoose');
const layouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const passport = require('passport');
const local_Strategy = require('./middleware/local_Strategy');
const session = require('express-session');

app.use(layouts);
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(cookieParser());

app.use(session({
    name: 'hell',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 200)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./router/index'));

app.listen(port, (err) => {
    if (err) {
        console.log('server is off' + err);
        return false;
    }
    console.log('server is on port', port);
})