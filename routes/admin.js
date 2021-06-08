const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const { check, body } = require('express-validator');

// get our authentication check middleware
const isAuth = require('../middleware/is-auth');

// we now pull the logic for this route from controllers.products
// The add product page
router.get('/add-product',isAuth, adminController.getAddProduct);

// Handles posting of data from add product page
router.post('/add-product', [
    body('title')
        .isString()
        .isLength({min: 3, max: 20})
        .trim(),
    body('imageUrl')
        .isURL(),
    body('price')
        .isFloat(),
    body('description')
        .isLength({min: 5, max: 400})
        .trim()
], isAuth, adminController.postAddProduct);

// Handles edit product page - takes in the product id in the url
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// handle the post from the edit-product page
router.post('/edit-product', [
    body('title')
        .isString().withMessage('The Title is not a string')
        .isLength({min: 3, max: 30}).withMessage('The Title must be between 3 and 30 characters')
        .trim(),
    body('imageUrl')
        .isURL().withMessage('Invalid Image URL'),
    body('price')
        .isFloat(),
    body('description')
        .isLength({min: 5, max: 400})
        .trim()
], isAuth, adminController.postGetEditProduct);

// handle the post from the delete-product link in admin products
router.post('/delete-product',isAuth, adminController.postDeleteProduct);

// view products in admin page
router.get('/products',isAuth, adminController.getProducts);

module.exports = router;
