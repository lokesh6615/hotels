const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || !requiredRole.includes(req.user.role)) {
      return res.status(403).send("Access denied.");
    }
    next();
  };
};

module.exports = roleMiddleware;
