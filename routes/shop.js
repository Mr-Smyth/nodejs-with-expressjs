const path = require('path');

const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

// Landing page
router.get('/', productsController.getProducts);

// Product List page
router.get('/product-list',);

module.exports = router;

