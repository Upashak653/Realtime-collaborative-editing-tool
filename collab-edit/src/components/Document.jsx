import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocumentCard from './DocumentCard';
import '../css/Book.css';

const Document = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);  // Added loading state
  const [error, setError] = useState(null);  // Added error state

  useEffect(() => {
    axios.get('http://localhost:5000/Documents/documents')
      .then(res => {
        setDocuments(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load documents. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;  
  if (error) return <div>{error}</div>;  

  return (
    <div className='book-list'>
      {
        documents.map(document => (
          <DocumentCard document={document} key={document._id} />  
        ))
      }
    </div>
  );
};

export default Document;
