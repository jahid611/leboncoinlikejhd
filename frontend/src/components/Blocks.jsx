// frontend/src/components/Blocks.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blocks')
      .then(res => setBlocks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Utilisateurs Bloqués</h2>
      <ul>
        {blocks.map(b => (
          <li key={b.blocked_id}>
            Bloqué : {b.blocked_user} (ID: {b.blocked_id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blocks;
