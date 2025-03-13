// backend/routes/annoncesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import de la connexion MySQL (db.js)
const checkAuth = require('../middleware/checkAuth.js'); // Assure-toi d'avoir créé ce middleware


// 1. Récupérer toutes les annonces (GET /api/annonces)
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM annonces';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des annonces :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// 2. Récupérer une annonce par ID (GET /api/annonces/:id)
router.get('/:id', (req, res) => {
  const annonceId = req.params.id;
  const sql = 'SELECT * FROM annonces WHERE id = ?';
  db.query(sql, [annonceId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l’annonce :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Annonce introuvable' });
    }
    res.json(results[0]);
  });
});

// 3. Créer une nouvelle annonce (POST /api/annonces)
router.post('/', (req, res) => {
  const { title, description, price, user_id, category_id, location } = req.body;
  
  // Prépare l'objet à insérer
  const newAnnonce = { 
    title,
    description,
    price,
    user_id,
    category_id,
    location
  };

  const sql = 'INSERT INTO annonces SET ?';
  db.query(sql, newAnnonce, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de l’annonce :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    // Récupère l'ID auto-incrémenté
    res.status(201).json({ id: result.insertId, ...newAnnonce });
  });
});

// 4. Mettre à jour une annonce (PUT /api/annonces/:id)
router.put('/:id', (req, res) => {
  const annonceId = req.params.id;
  const { title, description, price, location } = req.body;

  const sql = `
    UPDATE annonces
    SET title = ?, description = ?, price = ?, location = ?
    WHERE id = ?
  `;
  db.query(sql, [title, description, price, location, annonceId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l’annonce :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Annonce introuvable' });
    }
    res.json({ message: 'Annonce mise à jour avec succès' });
  });
});

router.get('/mine', checkAuth, (req, res) => {
    const userId = req.user.id;
    const sql = 'SELECT * FROM annonces WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des annonces de l’utilisateur:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json(results);
    });
  });

// 5. Supprimer une annonce (DELETE /api/annonces/:id)
router.delete('/:id', (req, res) => {
  const annonceId = req.params.id;
  const sql = 'DELETE FROM annonces WHERE id = ?';

  db.query(sql, [annonceId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l’annonce :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Annonce introuvable' });
    }
    res.json({ message: 'Annonce supprimée avec succès' });
  });
});

module.exports = router;
