const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

// we now pull the logic for this route from controllers.products
// The add product page
router.get('/add-product', adminController.getAddProduct);

// Handles posting of data from add product page
router.post('/add-product', adminController.postAddProduct);

// Handles edit product page - takes in the product id in the url
router.get('/edit-product/:productId', adminController.getEditProduct);

// view products in admin page
router.get('/products', adminController.getProducts);

module.exports = router;
