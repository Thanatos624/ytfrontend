// frontend/src/VideoPlayer.js
import React from 'react';

function VideoPlayer({ video }) {
    if (!video) return <div>Select a video to play</div>;

    return (
        <div>
            <video controls width="100%" autoPlay key={video.videoUrl}>
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
        </div>
    );
}

export default VideoPlayer;