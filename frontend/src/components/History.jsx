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
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const navigate = useNavigate();

    const request = axios.create({
        baseURL: `${backendUrl}`,
        withCredentials: true
    })

    useEffect(() => {
        request.get(`/attempt/${user.username}`)
            .then((response) => {
                console.log(response.data.attempts);
                setJsonData(response.data.attempts); //array
            })
            .catch(err => console.log(err));
    }, [user]);

    return (
        <div>
            <h2>Your Previous attempts</h2>

            {jsonData ? jsonData.map((element, index) => {

                return (
                    <div key={index}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component="span">{element.quizName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* <p>blah</p> */}
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
                                    return(                                                                        
                                    <div onClick={() => {navigate("/attempt", {state:{answers}})}}>
                                        <p>Attempt {ind + 1}</p>
                                        <p>{formattedDate}</p>
                                    </div>
                                )})}

                            </AccordionDetails>
                        </Accordion>
                    </div>
                );
            })
                :
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </div>
    )
}

export default History;