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
    Cart.getCart(cart => {
        // need to get the information for the products in the cart - get this from the product model
        Product.fetchAll(products => {
            // declare our empty list to contain all product data for the template
            const cartProducts = [];
            // loop over products so we can check if a products id is in the cart
            for (product of products) {
                // create a list of products that have a matching id in the cart
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                // check if there is any data - then push it to the cartProducts.
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Shopping Cart',
                path :'/cart',
                products: cartProducts
            });
        });
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