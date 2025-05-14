// Middleware för att kontrollera om användaren har rätt roll
export const requireRole = (role) => {
  return (req, res, next) => {
    // Kontrollera om användaren finns och om deras roll stämmer överens
    if (req.user && req.user.role === role) {
      return next();  // Om användaren har rätt roll, fortsätt till nästa middleware/route
    }

    // Om användaren inte har rätt roll, ge en 403 Forbidden
    return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
  };
};
