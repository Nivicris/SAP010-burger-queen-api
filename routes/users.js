const express = require('express');

const router = express.Router();
const usersController = require('../controller/users');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Rotas para manipulação de usuários, protegidas pela autenticação e autorização
router.post('/users', usersController.createUser);
router.get('/users/:userId', requireAuth, usersController.getUserById);
router.get('/users', requireAdmin, usersController.getUsers);
router.patch('/users/:userId', requireAdmin, usersController.updateUser);
router.delete('/users/:userId', requireAdmin, usersController.deleteUser);

module.exports = router;
