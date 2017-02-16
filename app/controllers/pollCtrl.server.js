'use strict';

const mongoose = require('mongoose');
const Poll = require('../models/poll.js');
const User = require('../models/user.js');

const pollCtrl = {
    getPoll: function getPoll(req, res, next){
        Poll.find({username: req.params.user, question: req.params.poll}, function(err, poll){
            if (err) throw err;
            req.poll = poll;
            next();
        });    
    },
    
    getPollsUser: function getpollsUser(req, res, next){
        Poll.find({userid : req.user._id},function(err, polls){
            if (err) throw err;
            req.polls = [];
            polls.map(poll => req.polls.push(poll));
            next();
        });  
    },
    
    deletePoll: function deletePoll(req, res, next){
        Poll.findOneAndRemove({_id: req.params.id}, function(err, doc){
            if (err) throw err;
            next();
        });  
    },
    
    addPoll: function addpoll(poll){
        process.nextTick(function(){
            let newPoll = new Poll();
            newPoll.username = poll.username;
            newPoll.userid = poll.userid;
            newPoll.question = poll.question;
            newPoll.answers = poll.answers.map(function(answer){
                return { answer: answer, votes: 0 };
            });
            newPoll.answeredBy = [];
            console.log(newPoll);
            newPoll.save(function(err, doc){
                if (err) throw err;
                
                return doc;
            });
        });
    },
    
    addVote: function addVote(vote){
        console.log(vote);
        Poll.findOneAndUpdate({answers: { $elemMatch: { '_id': vote.voteid}}},
        { $inc: {'answers.$.votes': 1}, $push: {'answeredByIP': vote.userIP}},
        {new: true}, 
        function(err, poll){
            if (err) throw err;
            console.log(poll);
        });
    }
};
module.exports = pollCtrl;