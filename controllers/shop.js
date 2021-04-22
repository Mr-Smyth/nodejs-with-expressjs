// import model
const Product = require('../models/product');
const Cart = require('../models/cart');

// Display our products controller
exports.getProducts = (req, res, next) => {
    Product.findAll()
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
    // option A:
    // use the sequelize method findByPk() - it returns a single product
    Product.findByPk(prodId)
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


    // option B:
    // use the findAll method - which will find all occurances - note where in lowercase
    // Product.findAll({ where: {id: prodId } })
    // .then(products => {
    //     res.render('shop/product-details', {
    //         product: products[1], 
    //         pageTitle: products[0].title,
    //         path: '/product-details'
    //     });
    // })
    // .catch(err => {
    //     console.log(err)
    // });
};

// Display our Home Page controller
exports.getIndex = (req, res, next) => {
    Product.findAll()
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

    // we want to make cart available in lower anonymous functions without passing it down
    let fetchedCart

    // retrieve product id from req
    const prodId = req.body.productId;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        // first we need to check and see if the product is already in the cart
        // getProducts will return an array, but our where will make this an array of just one item
        return cart.getProducts({ where: { id: prodId }})
    })
    .then(products => {
        // check if we get anything
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        let newQuantity = 1;
        if (product) {
            // if there is a product - we need to get the old qty and add new qty to it
            // ... code here
        }
        // ----------------------------------------------------------------------------------//
        // Now handle case where product does not already exist in the cart -
        return Product.findByPk(prodId)
        .then(product => {
            // call another magic method on our copy of cart - fetchedCart
            // we need to also tell sequelize that for our inbetween table we have some additional values that need to be stored
            // in this case the quantity
            return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
        })
        .catch(err => console.log(err));
    }).then(() => {
        res.redirect('/cart')
    })
    .catch(err => console.log(err));
};



// Display our Cart controller
exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
        // so here we grab the products using a magic method
        return cart.getProducts()
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Shopping Cart',
                path :'/cart',
                products: products
            });
        })
    })
    .catch(err => {
        console.log(err);
    });
};

exports.deleteCartItem = (req, res, next) => {
    // get the product id from the request
    const prodId = req.body.productId;
    // get products so we have access to the price
    Product.fetchOne(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
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