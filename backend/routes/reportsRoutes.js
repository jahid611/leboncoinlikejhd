// routes/reportsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST créer un report (signalement)
router.post('/', (req, res) => {
  const reporterId = 1; // ex. req.user.id
  const { annonce_id, reported_user_id, reason, description } = req.body;
  const sql = 'INSERT INTO reports SET ?';
  db.query(sql, { reporter_id: reporterId, annonce_id, reported_user_id, reason, description, status: 'pending' }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Report créé' });
  });
});

// GET tous les reports (admin)
router.get('/', (req, res) => {
  // ex. checkAdmin
  const sql = 'SELECT * FROM reports ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// PUT mettre à jour le statut d’un report
router.put('/:id', (req, res) => {
  // ex. checkAdmin
  const reportId = req.params.id;
  const { status } = req.body; // 'reviewed' ou 'resolved'
  const sql = 'UPDATE reports SET status = ? WHERE id = ?';
  db.query(sql, [status, reportId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Report introuvable' });
    res.json({ message: 'Report mis à jour' });
  });
});

module.exports = router;
