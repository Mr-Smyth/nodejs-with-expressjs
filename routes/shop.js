const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

// get our authentication check middleware
const isAuth = require('../middleware/is-auth');

// Landing page
router.get('/', shopController.getIndex);

// Product List page
router.get('/product-list',isAuth, shopController.getProducts);

// Product Details page - takes in the product id in the url
router.get('/product-details/:productId',isAuth, shopController.getProductDetails);

// Shopping Cart page
router.get('/cart',isAuth, shopController.getCart);

// handle delete item from cart post method
router.post('/cart-delete-item',isAuth, shopController.deleteCartItem);

// Product details to Shopping Cart Post handler
router.post('/cart',isAuth, shopController.postToCart);

// Handle creating an order from the cart
router.post('/create-order',isAuth, shopController.postOrder);

// Checkout page
router.get('/checkout',isAuth, shopController.getCheckout);

// Orders page
router.get('/orders',isAuth, shopController.getOrders);

module.exports = router;

