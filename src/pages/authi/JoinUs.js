// src/components/JoinUs.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/JoinUs.css';
import Navbar from '../../components/Navbar';

function JoinUs() {
    const navigate = useNavigate();

    // Redirect to the sign-up page
    const handleSignUpClick = () => {
        navigate('/SignUp');
    };

    return (
        <>
            <Navbar />
            <div className="join-us-container">
                <video
                    className="hero-video"
                    src="/images/blunido_video_2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>
                <div className="hero-content">
                    <h1>IT'S BETTER AS A MEMBER</h1>
                    <p>Move, Shop, Customize, and Celebrate with the best of Blunido.</p>
                    <button onClick={handleSignUpClick} className="sign-up-button">Sign Up</button>
                </div>
            </div>
        </>
    );
}

export default JoinUs;