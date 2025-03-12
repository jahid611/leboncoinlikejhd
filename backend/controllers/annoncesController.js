// backend/controllers/annoncesController.js
const db = require('../db');

exports.getAll = (req, res) => {
  const sql = 'SELECT * FROM annonces';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des annonces :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
};

exports.getById = (req, res) => {
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
};

exports.create = (req, res) => {
  const {
    title,
    description,
    price,
    user_id,
    category_id,
    location,
    item_condition = 'used',
    status = 'active'
  } = req.body;

  const sql = 'INSERT INTO annonces SET ?';
  const newAnnonce = {
    title,
    description,
    price,
    user_id,
    category_id,
    location,
    item_condition,
    status
  };

  db.query(sql, newAnnonce, (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de l’annonce :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    const insertedId = result.insertId;
    res.status(201).json({ id: insertedId, ...newAnnonce });
  });
};

exports.update = (req, res) => {
  const annonceId = req.params.id;
  const {
    title,
    description,
    price,
    location,
    item_condition,
    status
  } = req.body;

  const sql = `UPDATE annonces 
               SET title = ?, 
                   description = ?, 
                   price = ?, 
                   location = ?,
                   item_condition = ?,
                   status = ?
               WHERE id = ?`;

  db.query(sql, [title, description, price, location, item_condition, status, annonceId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l’annonce :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Annonce introuvable' });
    }
    res.json({ message: 'Annonce mise à jour avec succès' });
  });
};

exports.remove = (req, res) => {
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
};
