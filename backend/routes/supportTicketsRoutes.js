// routes/supportTicketsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET tous les tickets (admin) ou seulement ceux de l’utilisateur
router.get('/', (req, res) => {
  // ex. si admin => tous, sinon => user_id = req.user.id
  const sql = 'SELECT st.*, u.username FROM support_tickets st JOIN users u ON st.user_id = u.id ORDER BY st.created_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// POST créer un ticket
router.post('/', (req, res) => {
  const userId = 1; // ex. req.user.id
  const { subject, message } = req.body;
  const sql = 'INSERT INTO support_tickets SET ?';
  db.query(sql, { user_id: userId, subject, message }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.status(201).json({ message: 'Ticket créé' });
  });
});

// PUT mettre à jour le statut d’un ticket (admin ou propriétaire)
router.put('/:id', (req, res) => {
  const ticketId = req.params.id;
  const { status } = req.body; // 'open','in_progress','resolved','closed'
  const sql = 'UPDATE support_tickets SET status = ? WHERE id = ?';
  db.query(sql, [status, ticketId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Ticket introuvable' });
    res.json({ message: 'Ticket mis à jour' });
  });
});

module.exports = router;
