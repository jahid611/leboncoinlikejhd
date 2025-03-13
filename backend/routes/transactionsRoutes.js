// routes/transactionsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET mes transactions
router.get('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const sql = 'SELECT t.*, a.title FROM transactions t JOIN annonces a ON t.annonce_id = a.id WHERE t.user_id = ? ORDER BY t.transaction_date DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST créer une transaction
router.post('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const { annonce_id, amount } = req.body;
  const sql = 'INSERT INTO transactions SET ?';
  db.query(sql, { user_id: userId, annonce_id, amount }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Transaction créée' });
  });
});

// PUT mettre à jour le statut
router.put('/:id', (req, res) => {
  const transactionId = req.params.id;
  const { status } = req.body; // 'pending','completed','failed'
  const sql = 'UPDATE transactions SET status = ? WHERE id = ?';
  db.query(sql, [status, transactionId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Transaction introuvable' });
    res.json({ message: 'Transaction mise à jour' });
  });
});

module.exports = router;
