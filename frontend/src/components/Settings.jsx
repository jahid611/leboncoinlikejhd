// frontend/src/components/Settings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/settings')
      .then(res => setSettings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Paramètres</h2>
      <ul>
        {settings.map(s => (
          <li key={s.id}>
            {s.setting_key}: {s.setting_value} <br />
            <small>{s.description}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;
