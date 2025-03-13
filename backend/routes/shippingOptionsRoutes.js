// routes/shippingOptionsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET options de livraison pour une annonce
router.get('/annonce/:annonceId', (req, res) => {
  const annonceId = req.params.annonceId;
  const sql = 'SELECT * FROM shipping_options WHERE annonce_id = ?';
  db.query(sql, [annonceId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST créer une option de livraison
router.post('/', (req, res) => {
  const { annonce_id, shipping_method, shipping_cost, estimated_delivery_days } = req.body;
  const sql = 'INSERT INTO shipping_options SET ?';
  db.query(sql, { annonce_id, shipping_method, shipping_cost, estimated_delivery_days }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Option de livraison ajoutée' });
  });
});

// DELETE une option
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM shipping_options WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Option introuvable' });
    res.json({ message: 'Option supprimée' });
  });
});

module.exports = router;
