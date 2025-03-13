// routes/savedSearchesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET recherches sauvegardées de l'utilisateur
router.get('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const sql = 'SELECT * FROM saved_searches WHERE user_id = ? ORDER BY created_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST sauvegarder une recherche
router.post('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const { search_query } = req.body; // peut être un JSON ou string
  const sql = 'INSERT INTO saved_searches SET ?';
  db.query(sql, { user_id: userId, search_query }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Recherche sauvegardée' });
  });
});

// DELETE retirer une recherche
router.delete('/:id', (req, res) => {
  const userId = 1; // ex. req.user.id
  const searchId = req.params.id;
  const sql = 'DELETE FROM saved_searches WHERE id = ? AND user_id = ?';
  db.query(sql, [searchId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Recherche introuvable' });
    res.json({ message: 'Recherche supprimée' });
  });
});

module.exports = router;
