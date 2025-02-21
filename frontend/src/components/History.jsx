import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
import Attempt from "./Attempt";
import { useNavigate } from "react-router-dom";

const backendUrl = process.env.REACT_APP_URL;

const History = () => {
    const { user, setUser } = useContext(AuthContext);
    const [jsonData, setJsonData] = useState();
    const [open, setOpen] = useState(true);
    const [empty, setEmpty] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const navigate = useNavigate();

    const request = axios.create({
        baseURL: `https://triviahive-backend.onrender.com`,
        // baseURL: `${backendUrl}`,
        withCredentials: true
    })

    useEffect(() => {
        request.get(`/attempt/${user.username}`)
            .then((response) => {
                // console.log(response.data.attempts);
                setJsonData(response.data.attempts); //array
                console.log(jsonData);
                if(response.data.attempts.length == 0) setEmpty(true);
                setLoading(false);
            })
            .catch(err => console.log(err));

    }, [user]);

    return (
        <div style={{textAlign:"center", width:"80vw", margin:"auto"}}>
            <h2 className="basicH2">Your Previous attempts</h2>

            {jsonData && jsonData.map((element, index) => {

                return (
                    <div key={index}>
                        <Accordion style={{backgroundColor:"#caeffd", margin:"1rem"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <h2 style={{fontFamily:"Balsamiq Sans", fontSize:"1.5rem"}}>{element.quizName}</h2>
                            </AccordionSummary>
                            <AccordionDetails>                                
                                {element.attempts.map((attempt, ind) => {
                                    const formattedDate = new Date(attempt.timestamp).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true, // Converts to 12-hour format
                                    });
                                    const answers = attempt.answers;
                                    return (
                                        <div onClick={() => { navigate("/attempt", { state: { answers } }) }} className="attempt">
                                            <p>Attempt {ind + 1}</p>
                                            <p>{formattedDate}</p>
                                        </div>
                                    )
                                })}

                            </AccordionDetails>
                        </Accordion>
                    </div>
                );
            })}
            {loading &&
                (<Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>)
            }
            {empty && (<h3>There are no Attempts</h3>)}
            <button onClick={() => navigate("/")} className="bn3637 bn37">Go Home</button>
        </div>
    )
}

export default History;