const jwt = require('jsonwebtoken');

module.exports = (secrets) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secrets, (err, decodedToken) => {
    if (err) {
      return next(403);
    }

    req.user = decodedToken;
    next();
  });
};

module.exports.isAuthenticated = (req) => req.user !== undefined;

module.exports.isAdmin = (req) => req.user && req.user.role && req.user.role === 'admin';

module.exports.requireAuth = (req, res, next) => {
  if (!module.exports.isAuthenticated(req)) {
    return res.status(401).send('Autenticação necessária');
  }
  next();
};

module.exports.requireAdmin = (req, res, next) => {
  if (!module.exports.isAuthenticated(req)) {
    return res.status(401).send('Autenticação necessária');
  }
  if (!module.exports.isAdmin(req)) {
    return res.status(403).send('Acesso proibido');
  }
  next();
};
