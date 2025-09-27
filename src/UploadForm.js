// frontend/src/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

// IMPORTANT: In a real app, you'd get this from your .env file
const API_URL = process.env.REACT_APP_API_URL;// Use your deployed backend URL here later

function UploadForm({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a video file.');
            return;
        }
        setUploading(true);

        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title);
        formData.append('description', description);

        try {
            await axios.post(`${API_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Upload successful!');
            onUploadSuccess(); // Refresh the video list
        } catch (error) {
            console.error('Upload error', error);
            alert('Upload failed.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Upload Video</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <br />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <br />
            <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} required />
            <br />
            <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
        </form>
    );
}

export default UploadForm;