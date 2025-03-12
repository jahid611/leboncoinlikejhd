// src/components/AnnoncesList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnnoncesList = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/annonces')
      .then(response => {
        setAnnonces(response.data);
      })
      .catch(error => {
        console.error('Erreueers lors de la récupération des annonces :', error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des annonces</h1>
      {annonces.map(annonce => (
        <div key={annonce.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>{annonce.title}</h2>
          <p>{annonce.description}</p>
          <p>Prix : {annonce.price} €</p>
        </div>
      ))}
    </div>
  );
};

export default AnnoncesList;
