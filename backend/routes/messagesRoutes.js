// routes/messagesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET liste des messages (pour l'utilisateur courant)
router.get('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  // Option : filtrer par conversation
  const sql = `
    SELECT * FROM messages
    WHERE sender_id = ? OR receiver_id = ?
    ORDER BY created_at DESC
  `;
  db.query(sql, [userId, userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST envoyer un message
router.post('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const { receiver_id, content } = req.body;
  const sql = 'INSERT INTO messages SET ?';
  db.query(sql, { sender_id: userId, receiver_id, content, is_read: false }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Message envoyé' });
  });
});

// PUT marquer un message comme lu
router.put('/:id/read', (req, res) => {
  const msgId = req.params.id;
  const sql = 'UPDATE messages SET is_read = true WHERE id = ?';
  db.query(sql, [msgId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Message introuvable' });
    res.json({ message: 'Message marqué comme lu' });
  });
});

module.exports = router;
