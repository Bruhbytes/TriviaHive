const {Question} = require('../models/questionModel');
const Quiz = require('../models/quizModel');

const postQuestion = async (req, res) => {
    const {quizName, question, options, correct, type, marks} = req.body;
    
    const newQuestion = new Question({        
        question,
        options,
        correct,
        type,
        marks
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

//This controller made especially if you have an array of objects where each object is a question (check sampleQuestions.js file)
//if you want to add lot of questions through one POSTMAN request, you use this 
const postQuestions = async (req, res) => {
    const data = req.body;

    Quiz.findOne({name: "sampleQuiz"}) //change the name of the quiz
    .then(async (quiz) => {
        data.forEach(async obj => {
            quiz.questions.push(obj);
            await quiz.save();
        });

        res.status(200).json({msg: "Added questions"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
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

module.exports  = {postQuestions, postQuestion, getQuestion};