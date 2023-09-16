const express = require('express');

const router = express.Router();
const productController = require('../controller/products');
const authMiddleware = require('../middleware/auth');

// Rotas para manipulação de produtos, protegidas pela autenticação
router.post('/products', authMiddleware, productController.createProduct);
router.get('/products', authMiddleware, productController.getAllProducts);
router.get('/products/:productId', authMiddleware, productController.getProductById);
router.patch('/products/:productId', authMiddleware, productController.updateProduct);
router.delete('/products/:productId', authMiddleware, productController.deleteProduct);

module.exports = router;
