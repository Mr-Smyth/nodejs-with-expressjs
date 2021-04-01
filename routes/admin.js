const path = require('path');

const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

// we now pull the logic for this route from controllers.products
// The add product page
router.get('/add-product', productsController.getAddProduct);

// Handles posting of data from add product page
router.post('/add-product', productsController.postAddProduct);

// view products in admin page
router.get('/products',);

module.exports = router;
