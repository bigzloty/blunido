import React, { useRef, useState } from 'react';
import '../assets/css/HeroSection.css';

const HeroSection = () => {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const [isPlaying1, setIsPlaying1] = useState(false);
    const [isPlaying2, setIsPlaying2] = useState(false);

    const handleMouseEnter1 = () => {
        videoRef1.current.play();
        setIsPlaying1(true);
    };

    const handleMouseLeave1 = () => {
        videoRef1.current.pause();
        setIsPlaying1(false);
    };

    const handleMouseEnter2 = () => {
        videoRef2.current.play();
        setIsPlaying2(true);
    };

    const handleMouseLeave2 = () => {
        videoRef2.current.pause();
        setIsPlaying2(false);
    };

    const togglePlayPause1 = () => {
        if (isPlaying1) {
            videoRef1.current.pause();
        } else {
            videoRef1.current.play();
        }
        setIsPlaying1(!isPlaying1);
    };

    const togglePlayPause2 = () => {
        if (isPlaying2) {
            videoRef2.current.pause();
        } else {
            videoRef2.current.play();
        }
        setIsPlaying2(!isPlaying2);
    };

    return (
        <section className="hero-section">
            <div className="hero-video-container">
                <div
                    className="hero-video-wrapper fashion-video "
                    onMouseEnter={handleMouseEnter1}
                    onMouseLeave={handleMouseLeave1}
                >
                    <video
                        ref={videoRef1}
                        className="hero-video"
                        muted
                        loop
                        onError={() => console.log('Video 1 failed to load')}
                    >
                        <source src="/images/play_video_1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="overlay-content fashion-content">
                        <h2 className="video-title">Fashion & Accessories</h2>
                        <a href="#" className="shop-link">Shop now</a>
                    </div>
                    <span className="play-pause-icon fashion-icon" style={
                        {
                            position: 'absolute',
                            top: "67%",
                            left: "2%"
                        }
                    } onClick={togglePlayPause1}>
                        {isPlaying1 ? '❚❚' : '►'}
                    </span>
                </div>
                <div
                    className="hero-video-wrapper beauty-video"
                    onMouseEnter={handleMouseEnter2}
                    onMouseLeave={handleMouseLeave2}
                >
                    <video
                        ref={videoRef2}
                        className="hero-video"
                        muted
                        loop
                        onError={() => console.log('Video 2 failed to load')}
                    >
                        <source src="/images/blunido_video_3.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="overlay-content beauty-content">
                        <h2 className="video-title">Fragrance & Beauty</h2>
                        <a href="#" className="shop-link">Shop now</a>
                    </div>
                    <span className="play-pause-icon beauty-icon" style={
                        {
                            position: 'absolute',
                            top: "67%"
                        }
                    } onClick={togglePlayPause2}>
                        {isPlaying2 ? '❚❚' : '►'}
                    </span>
                </div>
            </div>
            <h1 className="hero-title">BLUNIDO</h1>
        </section>
    );
};

export default HeroSection;