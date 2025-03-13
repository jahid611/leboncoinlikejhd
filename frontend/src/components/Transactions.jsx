// frontend/src/components/Transactions.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions')
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Mes Transactions</h2>
      <ul>
        {transactions.map(t => (
          <li key={t.id}>
            Annonce ID: {t.annonce_id} - Montant: {t.amount} € <br />
            Statut: {t.status} - Date: {new Date(t.transaction_date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
