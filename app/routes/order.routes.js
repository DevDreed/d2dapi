var express = require('express');
var router = express.Router();
var passport = require('passport');
const OrderController = require('../controllers/order.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all tracks
router.get('/orders', AuthController.isAuthenticated, OrderController.getOrders);

// Get one Order by cuid
router.get('/orders/:cuid', AuthController.isAuthenticated, OrderController.getOrder);

// Get weekly Order count

router.get('/orders/weekly/count', AuthController.isAuthenticated, OrderController.getWeeklyOrderCountByUserId)

// Add a new Order
router.post('/orders', AuthController.isAuthenticated, OrderController.addOrder);

// Add a new Order
router.put('/orders/:cuid', AuthController.isAuthenticated, OrderController.updateOrder);

// Delete a Order by cuid
router.delete('/orders/:cuid', AuthController.isAuthenticated, OrderController.deleteOrder);

module.exports = router;