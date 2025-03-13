// routes/reviewsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET reviews d’un vendeur
router.get('/seller/:sellerId', (req, res) => {
  const sql = `
    SELECT r.*, u.username AS reviewer_name
    FROM reviews r
    JOIN users u ON r.reviewer_id = u.id
    WHERE r.seller_id = ?
    ORDER BY r.created_at DESC
  `;
  db.query(sql, [req.params.sellerId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST créer une review
router.post('/', (req, res) => {
  const reviewerId = 1; // ex. req.user.id
  const { seller_id, annonce_id, rating, comment } = req.body;
  const sql = 'INSERT INTO reviews SET ?';
  db.query(sql, { reviewer_id: reviewerId, seller_id, annonce_id, rating, comment }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Review créée' });
  });
});

module.exports = router;
