const {Attempt, AttemptEntry} = require('../models/attemptModel');


const postAttempt = async (req, res) => {
    const {user, quizName, attempts} = req.body;

    try{
        const newAttemptEntries = new AttemptEntry({
            answers: attempts
        })    
        await newAttemptEntries.save();
    
        let attempt = await Attempt.findOne({user, quizName});
        if(attempt){
            attempt.attempts.push(newAttemptEntries);
            await attempt.save();
        }
        else{
            attempt = new Attempt({
                user, quizName,
                attempts: [newAttemptEntries]
            })
            await attempt.save()
        }
        res.status(200).json({ message: "Attempt recorded successfully!", attempt });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }    

}

module.exports = {postAttempt};