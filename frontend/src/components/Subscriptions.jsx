// frontend/src/components/Subscriptions.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/subscriptions')
      .then(res => setSubscriptions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Mes Abonnements</h2>
      <ul>
        {subscriptions.map(s => (
          <li key={s.id}>
            Type: {s.subscription_type} - Statut: {s.status} <br />
            Début: {s.start_date} - Fin: {s.end_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subscriptions;
