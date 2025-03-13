// routes/notificationsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET notifications de l'utilisateur
router.get('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const sql = 'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// PUT marquer une notification comme lue
router.put('/:id/read', (req, res) => {
  const notifId = req.params.id;
  const sql = 'UPDATE notifications SET is_read = true WHERE id = ?';
  db.query(sql, [notifId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Notification introuvable' });
    res.json({ message: 'Notification lue' });
  });
});

// (Optionnel) POST créer une notification
router.post('/', (req, res) => {
  const { user_id, message } = req.body;
  const sql = 'INSERT INTO notifications SET ?';
  db.query(sql, { user_id, message, is_read: false }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Notification créée' });
  });
});

module.exports = router;
