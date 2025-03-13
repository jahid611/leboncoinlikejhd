// routes/campaignsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET toutes les campagnes (admin)
router.get('/', (req, res) => {
  // ex. checkAdmin
  const sql = 'SELECT * FROM campaigns ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST créer une campagne
router.post('/', (req, res) => {
  // ex. checkAuth, check si user est le propriétaire de l’annonce
  const { annonce_id, campaign_name, budget, start_date, end_date } = req.body;
  const sql = 'INSERT INTO campaigns SET ?';
  db.query(sql, { annonce_id, campaign_name, budget, start_date, end_date }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Campagne créée' });
  });
});

// PUT mettre à jour une campagne
router.put('/:id', (req, res) => {
  const campaignId = req.params.id;
  const { budget, end_date } = req.body;
  const sql = 'UPDATE campaigns SET budget = ?, end_date = ? WHERE id = ?';
  db.query(sql, [budget, end_date, campaignId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Campagne introuvable' });
    res.json({ message: 'Campagne mise à jour' });
  });
});

module.exports = router;
