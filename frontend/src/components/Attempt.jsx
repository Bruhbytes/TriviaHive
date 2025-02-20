import { useLocation, useNavigate } from "react-router-dom";

const Attempt = (props) => {
    const location = useLocation();
    const {answers} = location.state || [];

    return(
        <div>
            {answers.map((answer, index) => {
                return(
                    <div key={index}>
                        <h3>{answer.question}</h3>
                        <p>{answer.attemptedAns}</p>
                        <p>{answer.marksAwarded}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Attempt;