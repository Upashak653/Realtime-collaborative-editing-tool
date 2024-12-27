import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const EditDocument = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/Documents/documents/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to load document.');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`http://localhost:5000/Documents/documents/${id}`, { title, content })
      .then((res) => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to update document.');
        setLoading(false);
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Upload Document</h1>

          {/* Display loading spinner */}
          {loading && <p>Loading...</p>}

          {/* Display success message */}
          {success && <p style={{ color: 'green' }}>Document updated successfully!</p>}

          {/* Display error message */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              placeholder="Content"
              value={content}
              id="content"
              name="content"
              className="area"
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary m-2" disabled={loading}>
            Update
          </button>

          <div>
            <Link to="/documents">
              <button type="button" className="btn btn-primary m-2">
                See Document
              </button>
            </Link>

            <Link to="/documents">
              <button className="btn btn-primary m-2">Back</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDocument;
