const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).send("Access denied.");
    }
    next();
  };
};

module.exports = roleMiddleware;
