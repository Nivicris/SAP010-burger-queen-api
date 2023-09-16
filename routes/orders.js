const express = require('express');

const router = express.Router();
const orderController = require('../controller/order');
const authMiddleware = require('../middleware/auth');

router.post('/orders', authMiddleware, orderController.createOrder);
router.get('/orders', authMiddleware, orderController.getAllOrders);
router.get('/orders/:orderId', authMiddleware, orderController.getOrderById);
router.patch('/orders/:orderId', authMiddleware, orderController.updateOrder);
router.delete('/orders/:orderId', authMiddleware, orderController.deleteOrder);

module.exports = router;
