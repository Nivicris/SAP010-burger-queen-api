const express = require('express');
const pg = require('pg');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

const { port, dbUrl, secret } = config;
const app = express();

const pgClient = new pg.Client({ connectionString: dbUrl });
pgClient.connect();
pgClient.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pgClient.end();
});

// TODO: Conexión a la Base de Datos (MongoDB o MySQL)

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});
