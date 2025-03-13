// src/components/PostAnnonce.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PostAnnonce = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user) {
      setError("Vous devez être connecté pour poster une annonce.");
      return;
    }

    const newAnnonce = {
      title,
      description,
      price: Number(price),
      user_id: user.id, 
      category_id: Number(categoryId),
      location,
    };

    axios.post('http://localhost:5000/api/annonces', newAnnonce, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      setSuccess('Annonce créée avec succès !');
      // Redirige vers la route qui affiche uniquement les annonces de l'utilisateur
      navigate('/annonces/mine');
    })
    .catch((err) => {
      const msg = err.response?.data?.error || 'Erreur lors de la création de l’annonce';
      setError(msg);
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h2>Poster une Annonce</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        
        <label>Titre</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Prix (€)</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Catégorie (ID)</label>
        <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />

        <label>Localisation</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

        <button type="submit">Poster l'annonce</button>
      </form>
    </div>
  );
};

export default PostAnnonce;
