const mongoose = require('mongoose');
const {questionSchema} = require('../models/questionModel');

const quizSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    questions: [questionSchema]
})

module.exports = mongoose.model('Quiz', quizSchema);