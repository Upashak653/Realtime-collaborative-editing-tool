import React from 'react';
import { Link } from 'react-router-dom';

const DocumentCard = ({ document }) => {
  const { title, content, _id } = document;

  return (
    <div className="book-card">
      <div className="book-details">
        <h3>Title: {title}</h3>
        <p className="content-preview">
          Content: {content}
        </p>
      </div>

      <div className="book-actions">
        <Link to={`/documents/${_id}`} className="btn-link edit-btn">Edit</Link>
        <Link to={`/delete/${_id}`} className="btn-link delete-btn">Delete</Link>
      </div>
    </div>
  );
};

export default DocumentCard;
