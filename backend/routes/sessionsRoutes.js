// routes/sessionsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET sessions d’un utilisateur (admin ou l’utilisateur lui-même)
router.get('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const sql = 'SELECT * FROM sessions WHERE user_id = ? ORDER BY created_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST créer une session (lors du login)
router.post('/', (req, res) => {
  const { user_id, token, ip_address, user_agent, expires_at } = req.body;
  const sql = 'INSERT INTO sessions SET ?';
  db.query(sql, { user_id, token, ip_address, user_agent, expires_at }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Session créée' });
  });
});

// DELETE supprimer une session (logout)
router.delete('/:id', (req, res) => {
  const sessionId = req.params.id;
  const sql = 'DELETE FROM sessions WHERE id = ?';
  db.query(sql, [sessionId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Session introuvable' });
    res.json({ message: 'Session supprimée' });
  });
});

module.exports = router;
