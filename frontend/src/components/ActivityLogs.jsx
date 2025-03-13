// frontend/src/components/ActivityLogs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activity-logs')
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Logs d'Activité</h2>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.username} - {log.action} - {log.description} - {new Date(log.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLogs;
