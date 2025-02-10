// Middleware pour vérifier le JWT
const jwt = require("jsonwebtoken");

const auth = async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token)
      return await res.status(401).json({ message: "Token manquant" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token invalide" });
      req.user = user; // Ajouter l'utilisateur décodé à la requête
      next();
    });
  } catch {
    console.error("error");
  }
};

module.exports = auth;
