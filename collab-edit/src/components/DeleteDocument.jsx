import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/delete.css';
const DeleteDocument = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const deleteDocument = async () => {
            setIsLoading(true);
            try {
                const res = await axios.delete(`http://localhost:5000/Documents/documents/${id}`);
                if (res.data) {
                    
                    navigate('/documents');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to delete document. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        deleteDocument();
    }, [id, navigate]);

    return (
        <div className="delete-container">
            {isLoading ? (
                <p>Deleting document...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : null}
        </div>
    );
};

export default DeleteDocument;
