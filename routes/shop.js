const path = require('path');

const findDir = require('../utility/path');
const adminData = require('./admin');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const products = adminData.products;
    res.render('shop', {
        products: products,
        pageTitle: 'Shopping page',
        path :'/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
});

module.exports = router;

