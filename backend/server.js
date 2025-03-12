// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const annoncesRoutes = require('./routes/annoncesRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Route test
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API LeBonCoinLike !');
});

// Routes d’annonces
app.use('/api/annonces', annoncesRoutes);

// Routes d’authentification
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
