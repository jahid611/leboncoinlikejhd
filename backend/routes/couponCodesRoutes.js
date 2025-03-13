// routes/couponCodesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET tous les coupons (admin)
router.get('/', (req, res) => {
  // ex. checkAdmin
  const sql = 'SELECT * FROM coupon_codes';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST créer un coupon (admin)
router.post('/', (req, res) => {
  const { code, discount, description, is_active, start_date, end_date } = req.body;
  const sql = 'INSERT INTO coupon_codes SET ?';
  db.query(sql, { code, discount, description, is_active, start_date, end_date }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Coupon créé' });
  });
});

// PUT mettre à jour un coupon
router.put('/:id', (req, res) => {
  // ex. checkAdmin
  const couponId = req.params.id;
  const { discount, description, is_active, start_date, end_date } = req.body;
  const sql = `
    UPDATE coupon_codes 
    SET discount = ?, description = ?, is_active = ?, start_date = ?, end_date = ?
    WHERE id = ?
  `;
  db.query(sql, [discount, description, is_active, start_date, end_date, couponId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Coupon introuvable' });
    res.json({ message: 'Coupon mis à jour' });
  });
});

// Vérifier un coupon (ex. usage côté frontend)
router.get('/check/:code', (req, res) => {
  const code = req.params.code;
  const sql = 'SELECT * FROM coupon_codes WHERE code = ? AND is_active = TRUE';
  db.query(sql, [code], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (results.length === 0) return res.status(404).json({ error: 'Coupon invalide ou inactif' });
    res.json(results[0]);
  });
});

module.exports = router;
