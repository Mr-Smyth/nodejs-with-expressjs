// import model
const Product = require('../models/product');
const Cart = require('../models/cart');

// Display our products controller
exports.getProducts = (req, res, next) => {
    // we add in an anonymous function that will be a cb in the fetchAll
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            products: rows,
            pageTitle: 'All Products',
            path :'/product-list',
        });
    })
    .catch(err => {
        console.log(err)
    });
    
};

// Display a products Details controller
exports.getProductDetails = (req, res, next) => {
    // we can access params in the req using express params object
    // this allows us to get productID which is the name we choose in the routes
    const prodId = req.params.productId;
    
    // call the static method to find one product
    Product.fetchOne(prodId)
    // use destructuring to get the data
    .then(([product]) => {
        res.render('shop/product-details', {
            product: product[0], // because product is still an array, qith 1 object - we pass the first and only element of that array
            pageTitle: product.title, // dynamically set page header to name of product
            path: '/product-details'
        });
    })
    .catch(err => {
        console.log(err)
    });
};

// Display our Home Page controller
exports.getIndex = (req, res, next) => {
    // we add in an anonymous function that will be a cb in the fetchAll
    Product.fetchAll()
    // instead of using response here we can use destructuring. because we already know the response is a 2 part nested array
    // rows will represent the data because it is the first nested element and 
    // fieldDat will represent the metaData
    .then(([rows, fieldData]) => {
        res.render('shop/index', {
            products: rows,
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