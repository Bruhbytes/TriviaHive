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

        axios.post(`${backendUrl}auth/logout`, {}, { withCredentials: true })
            .then((response) => console.log(response.data))
            .catch(err => console.log(err));

        setStatus("Sign In");
    }

    return (
        <div className="main">
            <div>
                <h2 className="heading">TriviaHive</h2>
                <div style={{
                    display: "inline-flex",
                    gap: "16px",
                    alignItems: "center"
                }}>
                    {user ? (
                        <Button color="white" style={{ backgroundColor: "#BF2EF0", height: "80%" }} onClick={handleLogout}>
                            {status}
                        </Button>
                    ) : (
                        <Button color="white" style={{ backgroundColor: "#BF2EF0" }} onClick={handleSignIn}>
                            {status}
                        </Button>
                    )}
                    {user && <Avatar />}
                </div>
            </div>
            <div className="mid-container">
                <p className="tagline">Quiz.<br></br>Learn.<br></br>Conquer.</p>
                <p>An interactive quiz platform designed to challenge your knowledge, sharpen your skills, and make learning fun. Compete, learn, and grow with engaging quizzes across various topics!</p>
                <div>
                    <Button onClick={handleOpen}>Play a sample quiz</Button>
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
                    <button onClick={() => navigate("/history")}>View History</button>
                </div>
            </div>

        </div>
    );
}

export default Home;