// import model
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
    });
};

// now handle the logic for the post from the form in add-products
exports.postAddProduct = (req, res, next) => {
    // push the returned data to the products array
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    // we add in an anonymous function that will be a cb in the fetchAll
    Product.fetchAll((products) => {
        // once all products have been read - this function is called from within fetchAll
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path :'/admin/products',
        });
    });
};