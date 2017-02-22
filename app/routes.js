'use strict';
const pollCtrl = require('./controllers/pollCtrl.server.js');

const router = function(app, passport) {
    // front end routes
    app.get('/', pollCtrl.getLatestPolls, function(req, res) {
        res.render('index.ejs', {
            user: req.user,
            polls: req.polls
        }); 
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });
    
    
    app.get('/addpoll', isLoggedIn, function(req, res) {
        res.render('addpoll.ejs', { user: req.user});
    });

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.get('/profile', isLoggedIn, pollCtrl.getPollsUser, function(req, res) {
        res.render('profile.ejs', {
            user : req.user,
            polls : req.polls
        });
    });
    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    app.get('/:user/:pollid', pollCtrl.getPoll, function(req, res){
        res.render('poll.ejs', {
            user: req.user || false,
            poll: req.poll,
            path: req.originalUrl,
            host: req.hostname,
        });
    });
    
    // API's
    app.route('/api/polls/:id')
        .get(pollCtrl.getPoll, function(req, res){
            res.status(200).send();
        })
        .delete(isLoggedIn, pollCtrl.deletePoll, function(req, res){
            res.status(200).send();
        });
    
    app.put('/api/polls/:vote', function (req, res){
        // vote on a poll
        pollCtrl.addVote({
            voteid : req.params.vote,
            userIP : req.headers['x-forwarded-for'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress ||
                     req.connection.socket.remoteAddress,
        });
        res.sendStatus(200);
    });
    
    app.post('/api/users', passport.authenticate('local-signup',{
        // add user to the db
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    app.post('/login', passport.authenticate('local-login', {
        // authenticate user with db
        successRedirect : '/profile', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));
    
    app.post('/api/addpoll', isLoggedIn, function(req, res){
        // add a poll to the db
        pollCtrl.addPoll({ 
            userid: req.user._id,
            username: req.user.local.username,
            question: req.body.question,
            answers: req.body.answers
        });
        res.redirect('/profile');
    });
    
    app.post('/api/addoption', isLoggedIn, function(req, res){
        console.log(req.query);
        pollCtrl.addOption({
            pollid: req.query.pollid,
            answer: req.query.answer,
        });
        res.sendStatus(200);
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;