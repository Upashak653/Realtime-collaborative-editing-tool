import { useState } from 'react';
import '../CreateRoomForm/index.css';
import { useNavigate } from 'react-router-dom';

const CreateRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert('Please enter your name before creating a room.');
      return;
    }

    const roomData = {
      username,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };

    setUser(roomData); 
    navigate(`/home`);  
    console.log(roomData)
    socket.emit('userJoined', roomData);
  };

  const handleCopyRoomId = () => {
    navigator.clipboard
      .writeText(roomId)
      .then(() => {
        alert('Room Code Copied!');
      })
      .catch((err) => {
        console.error('Failed to copy room code: ', err);
      });
  };

  const generateNewRoomId = () => {
    const newRoomId = uuid();
    setRoomId(newRoomId);
  };

  return (
    <form className="form col-md-12 mt-5" onSubmit={handleCreateRoom}>
      <div className="form-group">
        <input
          placeholder="Enter your name"
          className="form-control my-2"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </div>
      <div className="form-group">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            placeholder="Room Code"
            className="form-control my-2"
            disabled
            value={roomId}
            type="text"
          />
          <button
            className="btn btn-primary btn-sm p-2 m-2"
            type="button"
            onClick={handleCopyRoomId}
          >
            Copy
          </button>
        </div>

        <div className="input-group-append d-flex justify-content-center">
          <button
            className="btn btn-success btn-sm p-2 m-2"
            type="submit"
          >
            Create Room
          </button>
          <button
            className="btn btn-secondary btn-sm p-2 m-2"
            type="button"
            onClick={generateNewRoomId}
          >
            Generate New Code
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateRoomForm;
