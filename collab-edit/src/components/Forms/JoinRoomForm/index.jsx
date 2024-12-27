import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState({ username: '', roomId: '', general: '' });
  const navigate = useNavigate();

  const handleRoomJoin = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!roomId.trim()) newErrors.roomId = 'Room code is required.';
    if (!username.trim()) newErrors.username = 'Username is required.';
    if (Object.keys(newErrors).length > 0) { setError(newErrors);return;}

    const roomData = {
      username,
      roomId,
      userId: uuid(),
      host: false,
      presenter: true,
    };
    setUser(roomData);
    socket.emit("userJoined",roomData)
    navigate('/home')
  };

  return (
    <form className="form col-md-12 mt-5" onSubmit={handleRoomJoin}>
      <div className="form-group">
        <input
          placeholder="Enter your name"
          className="form-control my-2"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError((prev) => ({ ...prev, username: '', general: '' }));
          }}
          required
          type="text"
        />
        {error.username && <div className="error-message text-danger">{error.username}</div>}
      </div>
      <div className="form-group">
        <input
          placeholder="Enter Room Code"
          className="form-control my-2"
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
            setError((prev) => ({ ...prev, roomId: '', general: '' }));
          }}
          required
          type="text"
        />
        {error.roomId && <div className="error-message text-danger">{error.roomId}</div>}
      </div>
      {error.general && <div className="error-message text-danger">{error.general}</div>}
      <div className="input-group-append d-flex">
        <button
          className="btn btn-primary btn-sm p-2 m-2"
          type="submit"
          disabled={!username || !roomId}
          onClick={handleRoomJoin}
        >
          Join Room
        </button>
      </div>
    </form>
  );
};

export default JoinRoomForm;
