/**
 * Here we are exporting the logic required to render the add-product page
 * We are tacking it onto the exports
 * The name we give it can be anything
 * 
 * This is still a normal middleware function
 */

// import model
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    });
};

// now handle the logic for the post from the form in add-products
exports.postAddProduct = (req, res, next) => {
    // push the returned data to the products array
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

// Display our products controller
exports.getProducts = (req, res) => {
    const products = Product.fetchAll();
    res.render('shop', {
        products: products,
        pageTitle: 'Shopping page',
        path :'/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
};