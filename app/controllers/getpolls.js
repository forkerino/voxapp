'use strict';

const mongoose = require('mongoose');
const Poll = require('../models/poll.js');

const getpollsUser = function getpollsUser(userid){
    return Poll.find({userid : userid}, function(err, polls){
        if (err) throw err;
        return polls;
    });  
};

module.exports = getpollsUser;