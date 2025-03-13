// frontend/src/components/Notifications.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/notifications')
      .then(res => setNotifs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifs.map(n => (
          <li key={n.id}>
            {n.message} - {n.is_read ? 'Lu' : 'Non lu'} - {new Date(n.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
