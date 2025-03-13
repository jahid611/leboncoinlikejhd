// routes/subscriptionsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET mes abonnements
router.get('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const sql = 'SELECT * FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST souscrire
router.post('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const { subscription_type, start_date, end_date } = req.body;
  const sql = 'INSERT INTO subscriptions SET ?';
  db.query(sql, { user_id: userId, subscription_type, start_date, end_date }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Abonnement créé' });
  });
});

// PUT mettre à jour le statut
router.put('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const { status } = req.body; // 'active','expired','cancelled'
  const sql = 'UPDATE subscriptions SET status = ? WHERE id = ?';
  db.query(sql, [status, subscriptionId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Abonnement introuvable' });
    res.json({ message: 'Abonnement mis à jour' });
  });
});

module.exports = router;
