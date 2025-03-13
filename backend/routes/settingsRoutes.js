// routes/settingsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET tous les settings (admin)
router.get('/', (req, res) => {
  // ex. checkAdmin
  const sql = 'SELECT * FROM settings';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// GET un setting par key
router.get('/:key', (req, res) => {
  const settingKey = req.params.key;
  const sql = 'SELECT * FROM settings WHERE setting_key = ?';
  db.query(sql, [settingKey], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (results.length === 0) return res.status(404).json({ error: 'Clé introuvable' });
    res.json(results[0]);
  });
});

// POST créer un setting
router.post('/', (req, res) => {
  // ex. checkAdmin
  const { setting_key, setting_value, description } = req.body;
  const sql = 'INSERT INTO settings SET ?';
  db.query(sql, { setting_key, setting_value, description }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Setting créé' });
  });
});

// PUT modifier un setting
router.put('/:key', (req, res) => {
  // ex. checkAdmin
  const settingKey = req.params.key;
  const { setting_value, description } = req.body;
  const sql = 'UPDATE settings SET setting_value = ?, description = ? WHERE setting_key = ?';
  db.query(sql, [setting_value, description, settingKey], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Setting introuvable' });
    res.json({ message: 'Setting mis à jour' });
  });
});

module.exports = router;
