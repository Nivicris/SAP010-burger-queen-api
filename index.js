const express = require('express');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const users = require('./routes/users');
const userModel = require('./models/model_users')
const pkg = require('./package.json');
const sequelize = require('./db');

const { port, secret } = config;
const app = express();

app.get('/', async(req, res) => {
  res.send('Bem-vindo à minha API!');
});

app.set('config', config);
app.set('pkg', pkg);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

// Registro das rotas
app.use(users);
// app.use('/products', productRoutes);
// app.use('/orders', orderRoutes);
// app.use('/login' authRoutes);

app.use(errorHandler);
app.listen(port, ()=> console.log('Estou rodando na porta', port));

// Registrar rutas
// routes(app, (err) => {
//   if (err) {
//     throw err;
//   }
//   app.use(errorHandler);
//   sequelize.authenticate()
//     .sync()
//     .then(() => {
//       app.listen(port, () => {
//         console.info(`App listening on port ${port}`);
//       });
//     })
//     .catch((error) => {
//       console.error('Error synchronizing database:', error);
//     });
// });
