//A pop-up page which will be a modal to give general instructions before starting the quiz
import { useNavigate } from "react-router-dom";

const Instructions = () => {
    const navigate = useNavigate();

    return(
        <div className="instruct">
            <h3>Here are the instructions</h3>
            <p>For multiple-choice questions, select the one best answer (A, B, C, or D).</p>
            <p>For integer-type questions, write your numerical answer clearly.</p>
            <p>No calculators unless specified.</p>
            <p>You have 30 seconds for each question.</p>
            <p>There are a total of 10 questions. All the Best</p>
            <button onClick={() => {navigate("/quiz")}} className="bn3637 bn37">Start</button>
        </div>
    )
}

export default Instructions;