const express = require('express');

const router = express.Router();
const orderController = require('../controller/order');
const { requireAuth } = require('../middleware/auth');

router.post('/orders', requireAuth, orderController.createOrder);
router.get('/orders', requireAuth, orderController.getAllOrders);
router.get('/orders/:orderId', requireAuth, orderController.getOrderById);
router.patch('/orders/:orderId', requireAuth, orderController.updateOrder);
router.delete('/orders/:orderId', requireAuth, orderController.deleteOrder);

module.exports = router;
