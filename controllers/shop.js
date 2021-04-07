// import model
const Product = require('../models/product');
const Cart = require('../models/cart');

// Display our products controller
exports.getProducts = (req, res, next) => {
    // we add in an anonymous function that will be a cb in the fetchAll
    Product.fetchAll((products) => {
        // once all products have been read - this function is called from within fetchAll
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'All Products',
            path :'/product-list',
        });
    });
};

// Display a products Details controller
exports.getProductDetails = (req, res, next) => {
    // we can access params in the req using express params object
    // this allows us to get productID which is the name we choose in the routes
    const prodId = req.params.productId;
    
    // call the static method to find one product
    Product.fetchOne(prodId, product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title, // dynamically set page header to name of product
            path: '/product-details'
        });
    });
};

// Display our Home Page controller
exports.getIndex = (req, res, next) => {
    // we add in an anonymous function that will be a cb in the fetchAll
    Product.fetchAll((products) => {
        // once all products have been read - this function is called from within fetchAll
        res.render('shop/index', {
            products: products,
            pageTitle: 'Home page',
            path :'/index',
        });
    });
};

// Get post data for our cart
exports.postToCart = (req, res, next) => {
    // retrieve product id from req
    const prodId = req.body.productId;
    // now we get the product using Product model and the id - we get a product that we can use to update cart
    Product.fetchOne(prodId, (product) => {
        // Now we use the Cart model - calling the addProduct static function
        Cart.addProduct(prodId, product.price)
    });
    res.redirect('/cart');
};

// Display our Cart controller
exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Shopping Cart',
        path :'/cart',
    });
};

// Display our Checkout controller
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path :'/checkout',
    });
};

// Display our Checkout controller
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path :'/orders',
    });
};