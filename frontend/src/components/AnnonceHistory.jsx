// frontend/src/components/AnnonceHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnnonceHistory = ({ annonceId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/annonce-history/${annonceId}`)
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  }, [annonceId]);

  return (
    <div>
      <h2>Historique de l'annonce</h2>
      <ul>
        {history.map(h => (
          <li key={h.id}>
            {h.title} - {h.description} - {h.price} € - {new Date(h.modified_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnonceHistory;
