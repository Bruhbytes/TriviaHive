import { useLocation, useNavigate } from "react-router-dom";

const Attempt = (props) => {
    const location = useLocation();
    const { answers } = location.state || [];

    return (
        <div style={{ width: "100vw",height:"100%", background: "url(https://t3.ftcdn.net/jpg/05/88/07/50/360_F_588075097_r1ttVbY4i1Nh6OPdSGatzfP29xe7nTCb.jpg)", backgroundSize: "cover", backgroundRepeat:"repeat" }}>
            {answers.map((answer, index) => {
                return (                    
                        <div key={index} style={{ width: "80vw", margin: "0rem auto", padding:"1rem" , fontFamily: "Balsamiq Sans", backgroundColor:"white" }}>
                            <h2 className="basicH2" style={{ fontSize: "1.5rem" }}>{answer.question}</h2>
                            <p>Your answer: {answer.attemptedAns}</p>
                            <p style={{marginBottom:"0", paddingBottom:"1rem"}}>Marks awarded: {answer.marksAwarded}</p>
                        </div>
                    
                )
            })}
        </div>
    )
}

export default Attempt;