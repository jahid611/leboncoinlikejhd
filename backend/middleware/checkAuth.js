// backend/middleware/checkAuth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // format "Bearer <token>"
  if (!authHeader) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    // le token doit contenir au moins { id, email, role } ou ce que tu y mets
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};
