const path = require('path');

const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

// we know pull the logic for this route from controllers.products
router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;
