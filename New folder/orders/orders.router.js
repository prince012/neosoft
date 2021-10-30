const express = require('express');
const router = express.Router();
const ordersController = require('../orders/orders.controller');

module.exports = router;

router.post('/create_order', ordersController.create_orders);
router.patch('/update_order', ordersController.update_orders);
router.get('/getAllOrders', ordersController.getOrders);
