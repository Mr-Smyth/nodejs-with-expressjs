const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

// get our authentication check middleware
const isAuth = require('../middleware/is-auth');

// we now pull the logic for this route from controllers.products
// The add product page
router.get('/add-product',isAuth, adminController.getAddProduct);

// Handles posting of data from add product page
router.post('/add-product',isAuth, adminController.postAddProduct);

// Handles edit product page - takes in the product id in the url
router.get('/edit-product/:productId',isAuth, adminController.getEditProduct);

// handle the post from the edit-product page
router.post('/edit-product',isAuth, adminController.postGetEditProduct);

// handle the post from the delete-product link in admin products
router.post('/delete-product',isAuth, adminController.postDeleteProduct);

// view products in admin page
router.get('/products',isAuth, adminController.getProducts);

module.exports = router;
