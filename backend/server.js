// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Importation des routeurs pour les 20 modules
const categoriesRoutes       = require('./routes/categoriesRoutes');
const favoritesRoutes        = require('./routes/favoritesRoutes');
const messagesRoutes         = require('./routes/messagesRoutes');
const commentsRoutes         = require('./routes/commentsRoutes');
const reviewsRoutes          = require('./routes/reviewsRoutes');
const blocksRoutes           = require('./routes/blocksRoutes');
const notificationsRoutes    = require('./routes/notificationsRoutes');
const tagsRoutes             = require('./routes/tagsRoutes');
const savedSearchesRoutes    = require('./routes/savedSearchesRoutes');
const reportsRoutes          = require('./routes/reportsRoutes');
const activityLogsRoutes     = require('./routes/activityLogsRoutes');
const annonceHistoryRoutes   = require('./routes/annonceHistoryRoutes');
const sessionsRoutes         = require('./routes/sessionsRoutes');
const settingsRoutes         = require('./routes/settingsRoutes');
const couponCodesRoutes      = require('./routes/couponCodesRoutes');
const supportTicketsRoutes   = require('./routes/supportTicketsRoutes');
const shippingOptionsRoutes  = require('./routes/shippingOptionsRoutes');
const subscriptionsRoutes    = require('./routes/subscriptionsRoutes');
const campaignsRoutes        = require('./routes/campaignsRoutes');
const authRoutes             = require('./routes/authRoutes');
const transactionsRoutes     = require('./routes/transactionsRoutes');
const annoncesRoutes         = require('./routes/annoncesRoutes');

// Route test
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API LeBonCoinLike !');
});

// Montage des routeurs
app.use('/api/categories', categoriesRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads'));


app.use('/api/blocks', blocksRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/saved-searches', savedSearchesRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/annonces', annoncesRoutes);
app.use('/api/activity-logs', activityLogsRoutes);
app.use('/api/annonce-history', annonceHistoryRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/coupons', couponCodesRoutes);
app.use('/api/support-tickets', supportTicketsRoutes);
app.use('/api/shipping-options', shippingOptionsRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/campaigns', campaignsRoutes);
app.use('/api/transactions', transactionsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
