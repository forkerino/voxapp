'use strict';

const mongoose = require('mongoose');
const Poll = require('../models/poll.js');
const User = require('../models/user.js');

const pollCtrl = {
    getPoll: function getPoll(req, res, next){
        Poll.find({username: req.params.user, _id: req.params.pollid}, function(err, poll){
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
    
    getLatestPolls: function getLatestPolls(req, res, next){
        Poll.find().limit(5).sort({_id: -1}).exec(function(err, polls){
            if (err) throw err;
            req.polls = [];
            polls.map(poll => req.polls.push(poll));
            console.log(req.polls);
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
                if (answer !== ""){
                    return { answer: answer, votes: 0 };
                }
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
        Poll.findOneAndUpdate({answers: { $elemMatch: { '_id': vote.voteid}}, 'answeredByIP': { $nin: [vote.userIP]}},
        { $inc: {'answers.$.votes': 1}, $push: {'answeredByIP': vote.userIP}},
        {new: true}, 
        function(err, poll){
            if (err) throw err;
            console.log(poll);
        });
    }, 
    
    addOption: function addOption(option){
        Poll.findOneAndUpdate({_id: option.pollid}, 
            {$push: {answers: { answer: option.answer, votes: 0 }}}, 
            function(err, poll){
                if (err) throw err;
            }
        );
    }
};
module.exports = pollCtrl;
