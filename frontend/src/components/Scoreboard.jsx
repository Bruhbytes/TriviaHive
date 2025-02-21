import { useLocation, useNavigate } from "react-router-dom";

const Scoreboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const totalMarks = location.state?.totalMarks || 0;
    return (
        <div style={{ height: "100vh", width: "100vw", textAlign:"center" }}>
            <div style={{
                display: "flex",
                gap:"10px",
                alignContent:"center",
                justifyContent:"center",
                height:"60vh",
                width:"60vw",
                flexDirection:"column",
                margin:"auto"
            }}>
                <h2 style={{
                    fontFamily:"Caudex",   
                    fontSize:"2rem"
                }}>Your Score</h2>
                <p style={{fontSize:"5rem", fontFamily:"Balsamiq Sans", margin:"1rem auto"}}>{totalMarks} / 20</p>
                <div>
                    <button onClick={() => navigate(-1)} className="bn3637 bn37" style={{marginRight:"1rem"}}>Retry</button>
                    <button onClick={() => navigate("/")} className="bn3637 bn37">Go to Home</button>
                </div>
            </div>
        </div>
    )
}

export default Scoreboard;