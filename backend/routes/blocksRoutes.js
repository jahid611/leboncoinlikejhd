// routes/blocksRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET liste des blocages
router.get('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const sql = `
    SELECT b.*, u.username AS blocked_user
    FROM blocks b
    JOIN users u ON b.blocked_id = u.id
    WHERE b.blocker_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST bloquer un utilisateur
router.post('/', (req, res) => {
  const blockerId = 1; // ex. req.user.id
  const { blocked_id } = req.body;
  const sql = 'INSERT INTO blocks SET ?';
  db.query(sql, { blocker_id: blockerId, blocked_id }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Utilisateur bloqué' });
  });
});

// DELETE débloquer un utilisateur
router.delete('/:blockedId', (req, res) => {
  const blockerId = 1; // ex. req.user.id
  const blockedId = req.params.blockedId;
  const sql = 'DELETE FROM blocks WHERE blocker_id = ? AND blocked_id = ?';
  db.query(sql, [blockerId, blockedId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Blocage introuvable' });
    res.json({ message: 'Utilisateur débloqué' });
  });
});

module.exports = router;
