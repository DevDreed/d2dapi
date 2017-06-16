var express = require('express');
var router = express.Router();
var passport = require('passport');
const OrderController = require('../controllers/order.controller');
var AuthController = require('../controllers/passportAuth.controller');

// Get all tracks
router.get('/orders', AuthController.isAuthenticated, OrderController.getOrders);

// Get one track by cuid
router.get('/orders/:cuid', AuthController.isAuthenticated, OrderController.getOrder);

// Add a new Track
router.post('/orders', AuthController.isAuthenticated, OrderController.addOrder);

// Add a new Track
router.put('/orders/:cuid', AuthController.isAuthenticated, OrderController.updateOrder);

// Delete a track by cuid
router.delete('/orders/:cuid', AuthController.isAuthenticated, OrderController.deleteOrder);

module.exports = router;