// frontend/src/components/Sessions.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/sessions')
      .then(res => setSessions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Mes Sessions</h2>
      <ul>
        {sessions.map(s => (
          <li key={s.id}>
            IP: {s.ip_address} - Expires: {new Date(s.expires_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sessions;
