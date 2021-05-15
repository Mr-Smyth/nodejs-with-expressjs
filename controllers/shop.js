// import model
const Product = require('../models/product');
const Order = require('../models/order');

// Display our products controller
exports.getProducts = (req, res, next) => {
    Product.find()
    // we should then have our products
    .then(products => {
        console.log(products);
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'All Products',
            path :'/product-list',
            isAuthenticated: req.session.isLoggedIn
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
    Product.findById(prodId)
    .then(product => {
        res.render('shop/product-details', {
            product: product, 
            pageTitle: product.title,
            path: '/product-details',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err)
    });
};

// Display our Home Page controller
exports.getIndex = (req, res, next) => {
    Product.find()
    // we should then have our products in an object
    .then(products => {
        console.log(products);
        res.render('shop/index', {
            products: products,
            pageTitle: 'Home page',
            path :'/index',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
};

// Get post data for our cart
exports.postToCart = (req, res, next) => {

    const prodId = req.body.productId;
    Product.findById(prodId)
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
    req.user
    // use populate to populate out the product - we just need to pass in the path to the productId
    .populate('cart.items.productId')
    // must add this as populate does not return a promise - execPopulate() does this for us.
    .execPopulate()
    .then(user => {
        res.render('shop/cart', {
            pageTitle: 'Shopping Cart',
            path :'/cart',
            products: user.cart.items,
            isAuthenticated: req.session.isLoggedIn
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
        isAuthenticated: req.session.isLoggedIn
    });
};

// Handle creating an order from the cart
exports.postOrder = (req, res, next) => {
    req.user
    // use populate to populate out the product - we just need to pass in the path to the productId
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        // here we prepare our product object in the format our schema expects
        // each product will be passed to the products array in the schema
        const products = user.cart.items.map(item => {
            // make productData equal to an object where we spread the productId but using a special  field that is provided by mongoose
            // that is the '._doc'
            return { productData: { ...item.productId._doc },  quantity: item.quantity }
        });
        // create a new instance of our order
        const order = new Order({
            user: {
                username: req.user.username,
                userId: req.user  // mongoose will extract the id - or we can specify and point to ._id
            },
            // pass the products to the products array
            products: products
        });
        
        // save this model, and return it so we can chain then onto it
        return order.save();
    })
    .then(result => {
        // clear out the cart
        return req.user.clearCart();
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

// Display our Checkout controller
exports.getOrders = (req, res, next) => {
    Order.find( {'user.userId' : req.user._id} )
    .then(orders => {
        res.render('shop/orders', {
            pageTitle: 'Your Orders',
            path :'/orders',
            orders: orders,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};