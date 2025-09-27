// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadForm from './UploadForm';
import VideoPlayer from './VideoPlayer';
import './App.css'; // You can add some basic styles here

// IMPORTANT: Replace with your deployed backend URL
const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const fetchVideos = () => {
        axios.get(`${API_URL}/videos`)
            .then(res => {
                setVideos(res.data);
                if (res.data.length > 0 && !selectedVideo) {
                    setSelectedVideo(res.data[0]); // Select the first video by default
                }
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchVideos();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="App">
            <header className="App-header">
                <h1>MyTube</h1>
            </header>
            <div className="main-content">
                <div className="video-player-section">
                    <VideoPlayer video={selectedVideo} />
                    <UploadForm onUploadSuccess={fetchVideos} />
                </div>
                <div className="video-list-section">
                    <h2>Videos</h2>
                    {videos.map(video => (
                        <div key={video._id} className="video-list-item" onClick={() => setSelectedVideo(video)}>
                            <p>{video.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;