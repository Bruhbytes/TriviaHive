import { useState, useEffect, useContext } from "react";
import Instructions from "./Instructions.jsx"
import Backdrop from '@mui/material/Backdrop';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AuthContext from '../Context/AuthContext.jsx';
import Avatar from "./Avatar/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/PlayQuiz.css"

const backendUrl = process.env.REACT_APP_URL;

const Home = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };
    const [status, setStatus] = useState();

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user)
            setStatus("Log out");
        else
            setStatus("Sign In");
    }, [user]);

    const handleSignIn = () => {
        navigate("/login");
    }

    const handleLogout = () => {
        localStorage.removeItem("currentUser");

        // axios.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true })
        axios.post(`https://triviahive-backend.onrender.com/auth/logout`, {}, { withCredentials: true })
            .then((response) => console.log(response.data))
            .catch(err => console.log(err));

        setStatus("Sign In");
    }

    return (
        <div className="main">
            <div className="topContainer">
                <h2 className="heading">TriviaHive</h2>
                <div>
                    {user ? (
                        <button className="bn3637 bn37" onClick={handleLogout}>
                            {status}
                        </button>
                    ) : (
                        <button className="bn3637 bn37" onClick={handleSignIn}>
                            {status}
                        </button>
                    )}
                    {user && <Avatar />}
                </div>
            </div>
            <div className="mid-container">
                <p className="tagline">Discover the <br></br>Genius Within!</p>
                <p className="smallTagline">An interactive quiz platform designed to challenge your knowledge, sharpen your skills, and make learning fun. Compete, learn, and grow with engaging quizzes across various topics!</p>
                <div>
                    <button onClick={handleOpen} className="learn-more">Play</button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={open}>
                            <div>
                                <Instructions />
                            </div>
                        </Fade>
                    </Modal>
                    <button onClick={() => navigate("/history")} className="bn3637 bn37">View History</button>
                </div>
            </div>

        </div>
    );
}

export default Home;