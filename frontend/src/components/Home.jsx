import * as React from 'react';
import Instructions from "./Instructions.jsx"
import Backdrop from '@mui/material/Backdrop';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useState } from "react";

const backendUrl = process.env.REACT_APP_URL;

const Home = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    return (
        <div className="main">
            <h2 className="heading">TriviaHive</h2>
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
                    <button>View History</button>
                </div>
            </div>

        </div>
    );
}

export default Home;