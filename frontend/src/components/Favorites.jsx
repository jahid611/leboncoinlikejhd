// frontend/src/components/Favorites.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Ajouter un header Authorization si nécessaire
    axios.get('http://localhost:5000/api/favorites')
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Mes Favoris</h2>
      <ul>
        {favorites.map(fav => (
          <li key={fav.annonce_id}>
            Annonce ID: {fav.annonce_id} - {fav.title} ({fav.price} €)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
