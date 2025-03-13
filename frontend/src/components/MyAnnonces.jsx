// src/components/MyAnnonces.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';
import { AuthContext } from '../context/AuthContext';
import './MyAnnonces.css';

const MyAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:5000/api/annonces/mine', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => setAnnonces(res.data))
    .catch(err => console.error(err));
  }, [token]);

  return (
    <DashboardLayout>
      <h2 className="page-title">Mes Annonces</h2>
      <div className="announces-grid">
        {annonces.map(a => (
          <div key={a.id} className="announce-card">
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <p>Prix : {a.price} €</p>
            <small>Lieu : {a.location}</small>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MyAnnonces;
