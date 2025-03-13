// routes/categoriesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET toutes les catégories
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur récupération catégories:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// GET une catégorie
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM categories WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (results.length === 0) return res.status(404).json({ error: 'Catégorie introuvable' });
    res.json(results[0]);
  });
});

// POST créer une catégorie (idéalement protégé par un checkAuth + checkAdmin)
router.post('/', (req, res) => {
  const { name, description, parent_id } = req.body;
  const sql = 'INSERT INTO categories SET ?';
  db.query(sql, { name, description, parent_id }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ id: result.insertId, name, description, parent_id });
  });
});

// PUT modifier une catégorie
router.put('/:id', (req, res) => {
  const { name, description, parent_id } = req.body;
  const sql = 'UPDATE categories SET name = ?, description = ?, parent_id = ? WHERE id = ?';
  db.query(sql, [name, description, parent_id, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Catégorie introuvable' });
    res.json({ message: 'Catégorie mise à jour' });
  });
});

// DELETE supprimer une catégorie
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM categories WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Catégorie introuvable' });
    res.json({ message: 'Catégorie supprimée' });
  });
});

module.exports = router;
