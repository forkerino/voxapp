'use strict';

const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const configDB = require('./config/database.js');
const routes = require('./app/routes.js');
const configPP = require('./config/passport.js');

const app = express();

mongoose.connect(configDB.url);

configPP(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

app.set('view engine', 'ejs');

app.use(session({ secret: 'whateveryouwantwhateveryouneed' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

routes(app, passport);

app.listen(port, function(){
    console.log(`listening on port ${port}`);
});