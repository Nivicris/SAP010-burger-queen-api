const express = require('express');

const router = express.Router();
const productsController = require('../controller/products');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Rotas para manipulação de produtos, protegidas pela autenticação
router.post('/products', requireAdmin, productsController.createProduct);
router.get('/products', requireAdmin, productsController.getAllProducts);
router.get('/products/:productId', requireAuth, productsController.getProductById);
router.patch('/products/:productId', requireAdmin, productsController.updateProduct);
router.delete('/products/:productId', requireAdmin, productsController.deleteProduct);

module.exports = router;
