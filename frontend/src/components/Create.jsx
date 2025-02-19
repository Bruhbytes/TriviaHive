import { useState } from "react";
import axios from 'axios';
const backendUrl = process.env.REACT_APP_URL;

const Create = () => {
    //Add type,marks to the question
    const [quizName, setQuizName] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correct, setCorrect] = useState("");

    function handleOptionChange(index, data){
        const updatesOptions = [...options];
        updatesOptions[index] = data;
        setOptions(updatesOptions);
    }

    function handleSubmit(e){
        e.preventDefault();

        const data = {
            quizName,
            question,
            options,
            correct
        }        
       
        axios.post(`${backendUrl}/question`, JSON.stringify(data),
         {headers:{"Content-Type" : "application/json"}})
        .then(response => {
            if (response.status === 200) {
                console.log('Question added successfully!');
                console.log(response);
                // Reset the form after successful submission
                setQuestion('');
                setOptions(['', '', '', '']);
                setCorrect('');
                setQuizName('');
            } else {
                console.error('Failed to add question');
            }
        })
        .catch(error => {
            console.error('Error adding question:', error.response.data);
        });
    }

    return (        
        <div>
            <h3>Enter your Question</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Give existing Quiz name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" value={quizName} onChange={(e) => setQuizName(e.target.value)}/>
                </div>

                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Question</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" value={question} onChange={(e) => setQuestion(e.target.value)}/>
                </div>

                {options.map((option, index) => {
                    return (
                        <div key={index} className="mb-3">
                            <label htmlFor={`option${index}`} className="form-label">Option {index + 1}</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`option${index}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                        </div>
                    )
                })}


                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Correct answer</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" value={correct} onChange={(e) => setCorrect(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Create;