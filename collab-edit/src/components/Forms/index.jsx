import React, { useState } from 'react';
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';
import './index.css';

const Forms = ({ uuid, socket, setUser }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="row h-100 pt-5">
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {loading && <div className="loading-overlay">Loading...</div>}
      <div className="form-box col-md-4 col-10 p-3 mx-auto mt-3 rounded-2 d-flex align-items-center flex-column">
        <h1 className="text-primary fw-bold">Create Room</h1>
        <CreateRoomForm 
        uuid={uuid} 
        socket={socket} 
        setUser={setUser} 
        setError={setError} 
        setLoading={setLoading} />
      </div>
      <div className="form-box col-md-4 col-10 p-3 mx-auto mt-3 rounded-2 d-flex align-items-center flex-column">
        <h1 className="text-primary fw-bold">Join Room</h1>
        <JoinRoomForm 
        uuid={uuid} 
        socket={socket} 
        setUser={setUser} 
        setError={setError} 
        setLoading={setLoading} />
      </div>
    </div>
  );
};

export default Forms;
