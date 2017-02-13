'use strict';
const addpollCtrlServer = require('./controllers/addpollCtrl.server.js');
const getpollsUser = require('./controllers/getpolls.js');

const router = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user,
            polls : getpollsUser(req.user._id),
        });
    });
    
    app.get('/poll/:id', function (req, res){

    });
    
    app.get('/addpoll', isLoggedIn, function(req, res) {
        res.render('addpoll.ejs');
    });
    
    app.post('/api/addpoll', function(req, res){
        let newPoll = addpollCtrlServer({ 
            user: req.user._id, 
            question: req.body.question,
            answers: req.body.answers
        });
        res.redirect('/profile');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;