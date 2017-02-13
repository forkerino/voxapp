'use strict';

const mongoose = require('mongoose');
const Poll = require('../models/poll.js');

const addpoll = function addpoll(poll){
    process.nextTick(function(){
        let newPoll = new Poll();
        newPoll.userid = poll.user;
        newPoll.question = poll.question;
        newPoll.answers = poll.answers.map(function(answer){
            return { answer: answer, votes: 0 };
        });
        newPoll.answeredBy = [];
        newPoll.save(function(err, doc){
            if (err) throw err;
            
            return doc;
        });
    });
};

module.exports = addpoll;