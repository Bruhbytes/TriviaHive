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

const attemptSchema = mongoose.Schema({
    user:{
        type: String
    },
    quizName:{
        type:String,
        required:true
    },
    attempts:{
        type:[basicattemptSchema]
    }
})

const Attempt = new mongoose.model("Attempt", attemptSchema);
module.exports = {Attempt};