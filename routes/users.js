const express = require('express');

const router = express.Router();
const userController = require('../controller/users');
const authMiddleware = require('../middleware/auth');

// Rotas para manipulação de usuários, protegidas pela autenticação e autorização
router.post('/users', authMiddleware, userController.createUser);
router.get('/users/:userId', authMiddleware, userController.getUserById);
router.put('/users/:userId', authMiddleware, userController.updateUser);
router.delete('/users/:userId', authMiddleware, userController.deleteUser);

module.exports = router;
