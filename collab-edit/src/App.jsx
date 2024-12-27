import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadDocument from './components/UploadDocument';
import Document from './components/Document';
import DeleteDocument from './components/DeleteDocument';
import EditDocument from './components/EditDocument';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Forms from './components/Forms';
import Userss from './components/Userss';

import { io } from 'socket.io-client';

const connectionOptions = {
  reconnectionAttempts: "Infinity",
  reconnection: true,
  timeout: 10000,
  path: '/socket',
  transports: ["websocket", "polling"],
};

const socket = io('http://localhost:5000', connectionOptions);

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    socket.on('connect', () => {
      console.log('Connected to WebSocket server:', socket.id);
    });

    socket.on('userJoined', (data) => {
      console.log('Received data:', data);
      if (data && data.success && Array.isArray(data.users)) {
        console.log('UserJoined, Updating users:', data.users);
        setUsers(data.users);
      } else {
        console.log('Something went wrong');
      }
    });
    
    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
      alert('Unable to connect to the WebSocket server. Please try again later.');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setUsers([]);
      alert('You have been disconnected from the server.');
    });

    return () => {
      socket.off('connect');
      socket.off('userJoined');
      socket.off('connect_error');
      socket.off('disconnect');
    };
  }, []);

  const uuid = () => {
    let S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
  };

  return (
        <Router>
      <Navbar user={user} users={users} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/Documents" element={<Document />} />
        <Route path="/users" element={<Userss user={user} users={users} socket={socket}/>} />
        <Route path="/delete/:id" element={<DeleteDocument />} />
        <Route path="/documents/:id" element={<EditDocument />} />
      </Routes>
    </Router>
    
  );
};

export default App;
