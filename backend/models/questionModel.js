const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    options:{
        type: [String]        
    },
    correct: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    marks:{
        type: Number,
        required: true
    }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = {
    Question,
    questionSchema
}