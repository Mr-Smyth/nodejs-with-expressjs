const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

// Landing page
router.get('/', shopController.getProducts);

// Product List page
router.get('/product-list',);

// Shopping Cart page
router.get('/cart',);

// Checkout page
router.get('/checkout',);

module.exports = router;

