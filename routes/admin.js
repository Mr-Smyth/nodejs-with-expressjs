const path = require('path');

const findDir = require('../utility/path');

const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product',{
        products: products,
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    });
    // res.sendFile(path.join(findDir, 'views', 'add-product.html'))
});

/**
 * Adding .post restricts the middleware to only post requests
 */
router.post('/add-product', (req, res, next) => {
    // get the body of the incoming request to extract what was sent
    // using bodyParser
    console.log(req.body);
    
    // push the returned data to the products array
    products.push({ title: req.body.title });
    console.log('admin.js', products);
    // redirect to / page
    res.redirect('/');
});

// add content to our exports
exports.routes = router;
exports.products = products;