'use strict';
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const configPP = function(passport){    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) {
        process.nextTick(function() {
            User.findOne({ 'local.email' :  req.body.email }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    let newUser            = new User();
                    newUser.local.email    = req.body.email;
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });    
        });
    }));
    
    passport.use('local-login', new LocalStrategy({
        usernameField : 'emailuser',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, emailuser, password, done) { 
        User.findOne({ $or : [{'local.email' :  emailuser }, {'local.username' : emailuser}]}, function(err, user) {
            if (err)
                return done(err);
            if (!user) 
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            return done(null, user);
        });
    }));
};

module.exports = configPP;