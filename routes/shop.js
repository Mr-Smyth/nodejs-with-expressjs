const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

// Landing page
router.get('/', shopController.getIndex);

// Product List page
router.get('/product-list', shopController.getProducts);

// Product Details page
router.get('/product-details/:productId', shopController.getProductDetails);

// Shopping Cart page
router.get('/cart', shopController.getCart);

// Checkout page
router.get('/checkout', shopController.getCheckout);

// Orders page
router.get('/orders', shopController.getOrders);

module.exports = router;

