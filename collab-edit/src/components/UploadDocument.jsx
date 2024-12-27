import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/document.css';

const UploadDocument = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

        
    try {
      const response = await axios.post('http://localhost:5000/Upload/upload', 
       {title,content}
      );
      console.log(response.data);
      alert('Document uploaded successfully');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error uploading document', error);
      alert('Failed to upload document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Upload Document</h1>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              placeholder="Enter content"
              value={content}
              id="content"
              name="content"
              className="area"
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="btn btn-primary m-2" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
          <Link to="/documents">
            <button type="button" className="btn btn-primary m-2">
              See Documents
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UploadDocument;
