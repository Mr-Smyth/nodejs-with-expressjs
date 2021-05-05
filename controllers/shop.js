// import model
const Product = require('../models/product');

// Display our products controller
exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    // we should then have our products
    .then(products => {
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'All Products',
            path :'/product-list',
        });
    })
    .catch(err => {
        console.log(err);
    });    
};

// Display a products Details controller
exports.getProductDetails = (req, res, next) => {
    // we can access params in the req using express params object
    // this allows us to get productID which is the name we choose in the routes
    const prodId = req.params.productId;

    // use our static method from product model
    Product.fetchOne(prodId)
    .then(product => {
        res.render('shop/product-details', {
            product: product, 
            pageTitle: product.title,
            path: '/product-details'
        });
    })
    .catch(err => {
        console.log(err)
    });
};

// Display our Home Page controller
exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    // we should then have our products in an object
    .then(products => {
        res.render('shop/index', {
            products: products,
            pageTitle: 'Home page',
            path :'/index',
        });
    })
    .catch(err => {
        console.log(err)
    });
};

// Get post data for our cart
exports.postToCart = (req, res, next) => {

    const prodId = req.body.productId;
    Product.fetchOne(prodId)
    .then(product => {
        // call the addToCart - expects a product - and returns a promise
        return req.user.addToCart(product)
    })
    .then(result => {
        res.redirect('/cart')
    })
    .catch(err => console.log(err));
};


// Display our Cart controller
exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(products => {
        res.render('shop/cart', {
            pageTitle: 'Shopping Cart',
            path :'/cart',
            products: products
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.deleteCartItem = (req, res, next) => {
    // get the product id from the request
    const prodId = req.body.productId;

    req.user.deleteOne(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err))
};

// Display our Checkout controller
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path :'/checkout',
    });
};

// Handle creating an order from the cart
exports.postOrder = (req, res, next) => {
    // call our user model method to add cart to order
    req.user.addToOrder()
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

// Display our Checkout controller
exports.getOrders = (req, res, next) => {
    req.user.getOrder()
    .then(orders => {
        res.render('shop/orders', {
            pageTitle: 'Your Orders',
            path :'/orders',
            orders: orders
        });
    })
    .catch(err => console.log(err));
};