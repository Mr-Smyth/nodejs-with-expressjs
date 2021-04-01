// import model
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
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