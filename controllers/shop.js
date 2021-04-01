// import model
const Product = require('../models/product');

// Display our products controller
exports.getProducts = (req, res) => {
    // we add in an anonymous function that will be a cb in the fetchAll
    Product.fetchAll((products) => {
        // once all products have been read - this function is called from within fetchAll
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'Shopping page',
            path :'/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};