// routes/activityLogsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET tous les logs (admin, par ex.)
router.get('/', (req, res) => {
  // ex. checkAdmin
  const sql = 'SELECT al.*, u.username FROM activity_logs al JOIN users u ON al.user_id = u.id ORDER BY al.created_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST créer un log (souvent interne, lors d’actions)
router.post('/', (req, res) => {
  // ex. userId = req.user.id si protégé
  const { user_id, action, description } = req.body;
  const sql = 'INSERT INTO activity_logs SET ?';
  db.query(sql, { user_id, action, description }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Log créé' });
  });
});

module.exports = router;
