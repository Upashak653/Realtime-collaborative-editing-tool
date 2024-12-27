const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

dotenv.config();

const io = new Server(server, {
  transports: ['websocket', 'polling'],
  path: '/socket',
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
  allowEIO3: true,
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/Documents',require("./routes/documents"))
app.use('/Upload',require("./routes/upload"))


// Store room information
let usersInRoom = {}; 

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('userJoined',(data)=>{
    const { username, userId, roomId, host, presenter } = data;
    if (!roomId || !username) {
      socket.emit('userJoined', { success: false, error: 'Invalid room code or username.' });
      return;
    }
    if (!usersInRoom[roomId]) {
      usersInRoom[roomId] = [];
    }
    usersInRoom[roomId].push({
      username,
      userId,
      socketId: socket.id,
      host,
      presenter,
    });
    socket.join(roomId);
    socket.emit('userJoined', { success: true, users: usersInRoom[roomId] });
    socket.to(roomId).emit('userJoined', { success: true, users: usersInRoom[roomId] });
    
  })
  
  // Event for a user disconnecting
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    for (const roomId in usersInRoom) {
      const roomUsers = usersInRoom[roomId];
      const userIndex = roomUsers.findIndex((user) => user.socketId === socket.id);

      if (userIndex !== -1) {
        const username = roomUsers[userIndex].username;
        roomUsers.splice(userIndex, 1);
        console.log(`User ${username} removed from room ${roomId}`);

        if (roomUsers.length === 0) {
          delete usersInRoom[roomId];
          console.log(`Room ${roomId} deleted`);
        } else {
          io.to(roomId).emit('userLeft', { success: true, users: roomUsers });
        }
        break;
      }
    }
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error('Failed to connect to MongoDB:', err));


