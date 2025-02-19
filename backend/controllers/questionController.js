const {Question} = require('../models/questionModel');
const Quiz = require('../models/quizModel');

const postQuestion = async (req, res) => {
    const {quizName, question, options, correct} = req.body;
    
    const newQuestion = new Question({        
        question,
        options,
        correct
    });

    await newQuestion.save()
    .then(() => {
        
        Quiz.findOne({name: quizName})
        .then(async quiz => {
            quiz.questions.push(newQuestion);
            await quiz.save();
        })
        .catch(err => console.log(err));

        res.status(200).json({msg: "Successfully inserted", newQuestion});        
    })
    .catch(err => {
        res.status(500).json({error: "Internal server error"});
        console.log(err);
    });
}

const getQuestion = async (req, res) => {
    try {
        const result = await Question.find({});    
        res.status(200).json(result);        
    } catch (error) {
        res.status(400).json({"error":error});
    }
}

module.exports  = {postQuestion, getQuestion};