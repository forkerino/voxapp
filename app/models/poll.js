'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let pollSchema = mongoose.Schema({
    userid : String,
    question : String,
    answers : [{answer: String, votes: Number}],
    answeredBy : [{userid: String}]
});


module.exports = mongoose.model('Poll', pollSchema);
