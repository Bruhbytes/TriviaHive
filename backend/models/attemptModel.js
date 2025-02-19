const mongoose = require('mongoose');

const basicattemptSchema = mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    marksAwarded:{
        type: Number,
        required:true
    },
    attemptedAns:{
        type: String
    }
})

const attemptEntrySchema = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now 
    },
    answers: [basicattemptSchema] // List of question attempts
});

const AttemptEntry = new mongoose.model("AttemptEntry", attemptEntrySchema);

const attemptSchema = mongoose.Schema({
    user:{
        type: String
    },
    quizName:{
        type:String,
        required:true
    },
    attempts:{
        type:[attemptEntrySchema]
    }
})

const Attempt = new mongoose.model("Attempt", attemptSchema);
module.exports = {Attempt, AttemptEntry};