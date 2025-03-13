// routes/commentsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET tous les commentaires d’une annonce
router.get('/annonce/:annonceId', (req, res) => {
  const sql = `
    SELECT c.*, u.username
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.annonce_id = ?
    ORDER BY c.created_at DESC
  `;
  db.query(sql, [req.params.annonceId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST un commentaire sur une annonce
router.post('/annonce/:annonceId', (req, res) => {
  const userId = 1; // ex. req.user.id
  const { comment_text } = req.body;
  const annonceId = req.params.annonceId;
  const sql = 'INSERT INTO comments SET ?';
  db.query(sql, { annonce_id: annonceId, user_id: userId, comment_text }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Commentaire ajouté' });
  });
});

// DELETE un commentaire
router.delete('/:commentId', (req, res) => {
  const commentId = req.params.commentId;
  const sql = 'DELETE FROM comments WHERE id = ?';
  db.query(sql, [commentId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Commentaire introuvable' });
    res.json({ message: 'Commentaire supprimé' });
  });
});

module.exports = router;
