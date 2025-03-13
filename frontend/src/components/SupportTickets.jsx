// frontend/src/components/SupportTickets.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/support-tickets')
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Tickets de Support</h2>
      <ul>
        {tickets.map(t => (
          <li key={t.id}>
            Sujet: {t.subject} - Statut: {t.status} <br />
            Message: {t.message} <br />
            Créé: {new Date(t.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupportTickets;
