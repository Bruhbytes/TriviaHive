import { useLocation, useNavigate } from "react-router-dom";

const Scoreboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const totalMarks = location.state?.totalMarks || 0;
    return(
        <div>
            <h2>Your Score: {totalMarks}/20</h2>
            <button onClick={() => navigate(-1)}>Retry</button>
            <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
    )
}

export default Scoreboard;