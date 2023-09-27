const auth = require('./auth');
const users = require('./users');
const products = require('./products');
const orders = require('./orders');

const root = (app, next) => {
  const pkg = app.get('pkg');
  app.get('/', (req, res) => res.json({ name: pkg.name, version: pkg.version }));
  app.all('*', (req, resp, nextAll) => {
    console.log('Request for undefined route:', req.originalUrl); // Adicione este log
    nextAll(404);
  });
  return next();
};

// eslint-disable-next-line consistent-return
const register = (app, routes, cb) => {
  if (!routes.length) {
    return cb();
  }

  routes[0](app, (err) => {
    if (err) {
      console.error('Error in route:', err); // Adicione este log
      return cb(err);
    }
    return register(app, routes.slice(1), cb);
  });
};

module.exports = (app, next) => {
  console.log('Registering routes...'); // Adicione este log
  register(app, [
    auth,
    users,
    products,
    orders,
    root,
  ], (err) => {
    if (err) {
      console.error('Error registering routes:', err); // Adicione este log
      return next(err);
    }
    console.log('Routes registered successfully!'); // Adicione este log
    return next();
  });
};
