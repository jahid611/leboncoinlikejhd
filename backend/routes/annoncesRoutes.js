// backend/routes/annoncesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Connexion MySQL
const checkAuth = require('../middleware/checkAuth.js'); // Middleware d'authentification
const multer = require('multer');
const path = require('path');

// Configuration Multer pour plusieurs images (max 5)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Le dossier "uploads" doit exister
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

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

// 2. Récupérer les annonces de l'utilisateur connecté (GET /api/annonces/mine)
router.get('/mine', checkAuth, (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT * FROM annonces WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des annonces de l’utilisateur :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// 3. Récupérer une annonce par ID (GET /api/annonces/:id)
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

// 4. Créer une nouvelle annonce avec upload de plusieurs images (POST /api/annonces)
router.post('/', checkAuth, upload.array('images', 5), (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, price, category_id, location } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: "Le titre est requis" });
    }
    
    // Traiter les fichiers uploadés
    let imagesPaths = [];
    if (req.files && req.files.length > 0) {
      imagesPaths = req.files.map(file => file.path.replace(/\\/g, '/'));
    }
    // Convertir le tableau en chaîne JSON pour le stocker en BDD
    const imagesJson = JSON.stringify(imagesPaths);
    
    const newAnnonce = {
      title,
      description,
      price,
      user_id: userId,
      category_id,
      location,
      images: imagesJson // stocke le tableau d'images en JSON
    };

    const sql = 'INSERT INTO annonces SET ?';
    db.query(sql, newAnnonce, (err, result) => {
      if (err) {
        console.error('Erreur lors de la création de l’annonce :', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.status(201).json({ message: 'Annonce créée avec succès', id: result.insertId, ...newAnnonce });
    });
  } catch (error) {
    console.error('Erreur lors de la création de l’annonce :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 5. Mettre à jour une annonce (PUT /api/annonces/:id)
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

// 6. Supprimer une annonce (DELETE /api/annonces/:id)
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
