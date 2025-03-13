// routes/annonceHistoryRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET l’historique d’une annonce
router.get('/:annonceId', (req, res) => {
  const annonceId = req.params.annonceId;
  const sql = 'SELECT * FROM annonce_history WHERE annonce_id = ? ORDER BY modified_at DESC';
  db.query(sql, [annonceId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// (Optionnel) POST créer un historique manuellement
router.post('/', (req, res) => {
  const { annonce_id, title, description, price } = req.body;
  const sql = 'INSERT INTO annonce_history SET ?';
  db.query(sql, { annonce_id, title, description, price }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Historique ajouté' });
  });
});

module.exports = router;
