// routes/annonces.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Tu récupères la connexion MySQL depuis un module commun
// ou tu peux créer une connexion directement ici.
// Ici, on part du principe que tu l'exportes depuis server.js
// ou un fichier db.js

let db; // on l'initialisera dans server.js

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM annonces';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des annonces :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const annonceId = req.params.id;
  const sql = 'SELECT * FROM annonces WHERE id = ?';
  db.query(sql, [annonceId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l’annonce :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Annonce introuvable' });
    }
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { title, description, price, user_id, category_id, location } = req.body;
  // Ajoute d'autres champs si nécessaire

  const sql = 'INSERT INTO annonces SET ?';
  const newAnnonce = {
    title,
    description,
    price,
    user_id,
    category_id,
    location,
    // Par exemple : item_condition, status, etc.
  };

  db.query(sql, newAnnonce, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de l’annonce :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    // Récupère l'ID généré
    const insertedId = result.insertId;
    res.status(201).json({ id: insertedId, ...newAnnonce });
  });
});

router.put('/:id', (req, res) => {
  const annonceId = req.params.id;
  const { title, description, price, location } = req.body;

  const sql = 'UPDATE annonces SET title = ?, description = ?, price = ?, location = ? WHERE id = ?';
  db.query(sql, [title, description, price, location, annonceId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l’annonce :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Annonce introuvable' });
    }
    res.json({ message: 'Annonce mise à jour avec succès' });
  });
});

router.delete('/:id', (req, res) => {
  const annonceId = req.params.id;
  const sql = 'DELETE FROM annonces WHERE id = ?';
  db.query(sql, [annonceId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l’annonce :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Annonce introuvable' });
    }
    res.json({ message: 'Annonce supprimée avec succès' });
  });
});

module.exports = (database) => {
  db = database;
  return router;
};
