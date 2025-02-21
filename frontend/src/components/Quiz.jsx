//This page will serve as a template to load each question
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { SuccessSnackbar, SubmitSnackBar } from './Alerts';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';
import JSConfetti from 'js-confetti'
import sample from '../sampleQuestions';
import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_URL;
const jsConfetti = new JSConfetti()

const Quiz = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [i, seti] = useState(0);
    const [question, setQuestion] = useState(sample[i]);
    const [mcqAnswer, setMcqAnswer] = useState("");
    const [numericAns, setNumericAns] = useState("");
    const [attempt, setAttempt] = useState({ quizName: "sampleQuiz", user: user ? user.username : "", attempts: [] });
    const [timer, setTimer] = useState(20);
    const [open, setOpen] = useState(false);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpen(false);        
      };

    const request = axios.create({
        // baseURL: `${backendUrl}`,
        baseURL: `https://triviahive-backend.onrender.com`,
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    })

    // To fetch the user upon initial mounting of the component
    useEffect(() => {
        if (user) {
            setAttempt(prevAttempt => ({
                ...prevAttempt,
                user: user.username
            }));
        }
    }, [user]);

    useEffect(() => {
        setQuestion(sample[i]);
    }, [i]);

    useEffect(() => {
        const countdownTimer = setTimeout(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                handleNext();

            }
        }, 1000);

        return () => clearTimeout(countdownTimer);
    }, [timer, question, sample]);

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


        setAttempt(prevAttempt => {
            console.log(basicAttempt);
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
                navigate("/score", { state: { totalMarks } });
            }
            else {
                setMcqAnswer("");
                setNumericAns("");
                seti(prevI => {
                    console.log("i incremented", prevI + 1);
                    return prevI + 1;
                });
            }
            return updatedAttempt;
        })
        
        setOpen(true);
        // Time resetting
        setTimer(20);
    }

    return (
        <div className='quiz-body'>
            <div className='realQuizbody'>
                <div className='question'>
                    <h2 style={{fontSize:"2rem", marginBottom:"10px"}}>{question.question}</h2>
                    <div><h2>Time left</h2><p>{timer}</p></div>
                </div>

                {question.type == "mcq" ? (<FormControl>
                    {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={mcqAnswer}
                        onChange={(e) => { setMcqAnswer(e.target.value) }}
                        name="radio-buttons-group"                        
                    >
                        <FormControlLabel value={question.options[0]} control={<Radio />} label={question.options[0]} sx={{'& .MuiFormControlLabel-label':{fontSize:"1.5rem", fontFamily:"Balsamiq Sans"}}}/>
                        <FormControlLabel value={question.options[1]} control={<Radio />} label={question.options[1]} sx={{'& .MuiFormControlLabel-label':{fontSize:"1.5rem", fontFamily:"Balsamiq Sans"}}}/>
                        <FormControlLabel value={question.options[2]} control={<Radio />} label={question.options[2]} sx={{'& .MuiFormControlLabel-label':{fontSize:"1.5rem", fontFamily:"Balsamiq Sans"}}}/>
                        <FormControlLabel value={question.options[3]} control={<Radio />} label={question.options[3]} sx={{'& .MuiFormControlLabel-label':{fontSize:"1.5rem", fontFamily:"Balsamiq Sans"}}}/>
                    </RadioGroup>
                </FormControl>)
                    :
                    (<FormControl>
                        <TextField id="standard-basic" label="Answer" variant="standard" type='Number' value={numericAns} onChange={(e) => setNumericAns(e.target.value)} />
                    </FormControl>)
                }
                <p style={{fontFamily:"Gowun Batang", fontSize:"1.1rem", fontWeight:700}}>Marks: {question.marks}</p>
                <button onClick={handleNext} className='next-questionbtn'>{i === sample.length - 1 ? "Submit" : "Next"}</button>                
            </div>
            {/* <SuccessSnackbar message="Answer recorded" open={open} handleClose={handleClose}/> */}
            <SubmitSnackBar message="Answer recorded" open={open} handleClose={handleClose}/>
        </div>
    )
}

export default Quiz;