'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let pollSchema = mongoose.Schema({
    userid : String,
    username : String,
    question : String,
    answers : [{answer: String, votes: Number}],
    answeredByIP : []
});


module.exports = mongoose.model('Poll', pollSchema);
