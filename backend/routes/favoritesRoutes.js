// routes/favoritesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET tous les favoris de l'utilisateur courant (supposons checkAuth)
router.get('/', (req, res) => {
  const userId = 1; // ex. req.user.id si token
  const sql = `
    SELECT f.annonce_id, a.title, a.price
    FROM favorites f
    JOIN annonces a ON f.annonce_id = a.id
    WHERE f.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST ajouter un favori
router.post('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const { annonce_id } = req.body;
  const sql = 'INSERT INTO favorites SET ?';
  db.query(sql, { user_id: userId, annonce_id }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Favori ajouté' });
  });
});

// DELETE retirer un favori
router.delete('/:annonceId', (req, res) => {
  const userId = 1; // ex. req.user.id
  const annonceId = req.params.annonceId;
  const sql = 'DELETE FROM favorites WHERE user_id = ? AND annonce_id = ?';
  db.query(sql, [userId, annonceId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Favori introuvable' });
    res.json({ message: 'Favori supprimé' });
  });
});

module.exports = router;
