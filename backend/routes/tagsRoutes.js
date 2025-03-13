// routes/tagsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET tous les tags
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM tags';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST créer un tag
router.post('/', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO tags SET ?';
  db.query(sql, { name }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ id: result.insertId, name });
  });
});

// Lier un tag à une annonce
router.post('/annonce/:annonceId', (req, res) => {
  const annonceId = req.params.annonceId;
  const { tag_id } = req.body;
  const sql = 'INSERT INTO annonce_tags SET ?';
  db.query(sql, { annonce_id: annonceId, tag_id }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Tag associé à l’annonce' });
  });
});

// Retirer un tag d’une annonce
router.delete('/annonce/:annonceId/:tagId', (req, res) => {
  const annonceId = req.params.annonceId;
  const tagId = req.params.tagId;
  const sql = 'DELETE FROM annonce_tags WHERE annonce_id = ? AND tag_id = ?';
  db.query(sql, [annonceId, tagId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Association introuvable' });
    res.json({ message: 'Tag retiré de l’annonce' });
  });
});

module.exports = router;
