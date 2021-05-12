const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

// Landing page
router.get('/', shopController.getIndex);

// Product List page
router.get('/product-list', shopController.getProducts);

// Product Details page - takes in the product id in the url
router.get('/product-details/:productId', shopController.getProductDetails);

// Shopping Cart page
router.get('/cart', shopController.getCart);

// // handle delete item from cart post method
// router.post('/cart-delete-item', shopController.deleteCartItem);

// Product details to Shopping Cart Post handler
router.post('/cart', shopController.postToCart);

// // Handle creating an order from the cart
// router.post('/create-order', shopController.postOrder);

// // Checkout page
// router.get('/checkout', shopController.getCheckout);

// // Orders page
// router.get('/orders', shopController.getOrders);

module.exports = router;

