//This page will serve as a template to load each question
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import AuthContext from '../Context/AuthContext';

import sample from '../sampleQuestions';
import { useState, useContext } from 'react';

const Quiz = () => {
    const {user} = useContext(AuthContext);
    const [i, seti] = useState(0);
    const [question, setQuestion] = useState(sample[i]);
    const [mcqAnswer, setMcqAnswer] = useState("");
    const [numericAns, setNumericAns] = useState("");

    const [attempt, setAttempt] = useState([]);

    const handleNext = () => {
        if(i === sample.length - 1){
            //submit logic
        }
        else{
            setQuestion(sample[i+1]);
            //note the mcqAnswer
            
            setMcqAnswer("");
            setNumericAns("");
            seti(i + 1);
        }
    }

    return (
        <div className='quiz-body'>
            <h2>{question.question}</h2>

            {question.type == "mcq" ? (<FormControl>
                {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={mcqAnswer}
                    onChange={(e) => {setMcqAnswer(e.target.value)}}
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
            <button onClick={handleNext}>{i === sample.length - 1 ? "Submit": "Next"}</button>
        </div>
    )
}

export default Quiz;