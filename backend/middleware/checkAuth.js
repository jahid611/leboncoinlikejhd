// middleware/checkAuth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // format "Bearer <token>"
  if (!authHeader) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // On suppose que le token contient au moins l'id, email, etc.
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};
