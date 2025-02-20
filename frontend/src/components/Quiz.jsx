//This page will serve as a template to load each question
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';
import JSConfetti from 'js-confetti'
import sample from '../sampleQuestions';
import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTimeRemaining, getDeadTime, clearTimer, startTimer } from '../time';

const backendUrl = process.env.REACT_APP_URL;
const jsConfetti = new JSConfetti()

const Quiz = () => {
    const { user } = useContext(AuthContext);
    const [i, seti] = useState(0);
    const [question, setQuestion] = useState(sample[i]);
    const [mcqAnswer, setMcqAnswer] = useState("");
    const [numericAns, setNumericAns] = useState("");
    const [attempt, setAttempt] = useState({ quizName: "sampleQuiz", user: user ? user.username : "", attempts: [] });
    
    const [timer, setTimer] = useState("00:00");
    const Ref = useRef(null);

    const navigate = useNavigate();

    const onClickReset = () => {
        clearTimer(getDeadTime(), setTimer, Ref, handleNext);
    };

    useEffect(() => {
        clearTimer(getDeadTime(), setTimer, Ref, handleNext);
    }, [])    

    useEffect(() => {
        setQuestion(sample[i]);
    }, [i]);

    // To fetch the user upon initial mounting of the component
    useEffect(() => {
        if (user) {
            setAttempt(prevAttempt => ({
                ...prevAttempt,
                user: user.username
            }));
        }
    }, [user]);

    const request = axios.create({
        // baseURL: `${backendUrl}`,
        baseURL: `https://triviahive-backend.onrender.com`,
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    })

    const handleNext = () => {
        //Calculating the marks
        let marks = 0;
        if (question.type === "mcq") {
            if (mcqAnswer && mcqAnswer === question.correct) marks = question.marks;
        }
        else {
            if (numericAns && numericAns == Number(question.correct)) marks = question.marks;
        }
        //Add to the attempt history as per username
        const basicAttempt = {
            question: question.question,
            marksAwarded: marks,
            attemptedAns: question.type === "mcq" ? mcqAnswer : numericAns
        }        
        console.log(basicAttempt);
        
        
        setAttempt(prevAttempt => {
            const updatedAttempt = {
                ...prevAttempt,
                attempts: [...prevAttempt.attempts, basicAttempt]
            }

            //SUBMIT Logic
            if (i === sample.length - 1) {
                request.post("/attempt", updatedAttempt)
                    .then(response => {
                        console.log(response.data.message);
                    })
                    .catch(err => console.log(err));

                jsConfetti.addConfetti({
                    confettiRadius: 6,
                    confettiNumber: 500,
                })

                const totalMarks = updatedAttempt.attempts.reduce((sum, q) => sum + q.marksAwarded, 0);
                navigate("/score", {state: {totalMarks}});
            }
            else{
                setMcqAnswer("");
                setNumericAns("");                
                seti(prevI => {
                    console.log("i incremented", prevI + 1);
                    return prevI + 1;
                });
            }
            return updatedAttempt;
        })

        //NEXT Logic
        // if (i !== sample.length - 1) {
        //     // setQuestion(sample[i + 1]);
        //     setMcqAnswer("");
        //     setNumericAns("");
        //     // seti(i + 1);
        //     seti(prevI => {
        //         console.log("i incremented", prevI + 1);
        //         return prevI + 1;
        //     });
        //     // console.log("i incremented");
        // }
        console.log("Handle next button pressed");
        // Time resetting
        onClickReset();
    }

    return (
        <div className='quiz-body'>
            <h2>{question.question}</h2>

            {question.type == "mcq" ? (<FormControl>
                {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={mcqAnswer}
                    onChange={(e) => { setMcqAnswer(e.target.value) }}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value={question.options[0]} control={<Radio />} label={question.options[0]} />
                    <FormControlLabel value={question.options[1]} control={<Radio />} label={question.options[1]} />
                    <FormControlLabel value={question.options[2]} control={<Radio />} label={question.options[2]} />
                    <FormControlLabel value={question.options[3]} control={<Radio />} label={question.options[3]} />
                </RadioGroup>
            </FormControl>)
                :
                (<FormControl>
                    <TextField id="standard-basic" label="Answer" variant="standard" type='Number' value={numericAns} onChange={(e) => setNumericAns(e.target.value)} />
                </FormControl>)
            }
            <p>Marks: {question.marks}</p>
            <h2>{timer}</h2>
            <button onClick={handleNext}>{i === sample.length - 1 ? "Submit" : "Next"}</button>
        </div>
    )
}

export default Quiz;