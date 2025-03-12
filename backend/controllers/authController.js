// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const saltRounds = 10;

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Vérifier que l'utilisateur n'existe pas déjà
  const checkSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification de l’utilisateur:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (results.length > 0) {
      return res.status(409).json({ error: 'Utilisateur déjà existant' });
    }

    // Hasher le mot de passe
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Erreur lors du hash du mot de passe:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      // Insérer le nouvel utilisateur
      const sql = 'INSERT INTO users SET ?';
      const newUser = { username, email, password: hash };
      db.query(sql, newUser, (err, result) => {
        if (err) {
          console.error('Erreur lors de la création de l’utilisateur:', err);
          return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(201).json({ message: 'Utilisateur créé avec succès', id: result.insertId });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la connexion:', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    const user = results[0];
    // Comparer le mot de passe fourni avec le hash stocké
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erreur lors de la comparaison de mot de passe:', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      if (!isMatch) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }
      // Générer un token JWT
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role },
                              process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Connexion réussie', token });
    });
  });
};
