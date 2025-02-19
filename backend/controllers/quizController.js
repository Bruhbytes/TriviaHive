const Quiz = require('../models/quizModel');

const getQuiz = async (req, res) => {
    try{
        const result = await Quiz.find({});
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({error: err});
    }
}

const postQuiz = async (req, res) => {
    const {name} = req.body;

    const newQuiz = new Quiz({
        name: name,
        questions: []
    });
    await newQuiz.save()
    .then(response => {
        res.status(200).json({"msg": "Successfully created new quiz"});
    })
    .catch(err =>{
        res.status(500).json({"err": "Internal server error", err});
        console.log(err);
    })
}

module.exports = {getQuiz, postQuiz};