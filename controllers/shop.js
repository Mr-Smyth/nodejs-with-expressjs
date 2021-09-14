// import model
const Product = require('../models/product');
const Order = require('../models/order');
const fs = require('fs');
const path = require('path');
const { type } = require('os');

const pdfDocument = require('pdfkit');

// Display our products controller
exports.getProducts = (req, res, next) => {
    Product.find()
    // we should then have our products
    .then(products => {
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'All Products',
            path :'/product-list',
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
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
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
    });
};

// Display our Home Page controller
exports.getIndex = (req, res, next) => {
    Product.find()
    // we should then have our products in an object
    .then(products => {
        let message = req.flash('message');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        res.render('shop/index', {
            products: products,
            pageTitle: 'Home page',
            path :'/index',
            message: message
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
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
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
    });
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
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
    });
};

exports.deleteCartItem = (req, res, next) => {
    // get the product id from the request
    const prodId = req.body.productId;

    req.user.deleteOne(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
    });
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
                username: req.session.user.username,
                email: req.session.user.email,
                userId: req.session.user  // mongoose will extract the id - or we can specify and point to ._id
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
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
    });
};

// Display our Checkout controller
exports.getOrders = (req, res, next) => {
    Order.find( {'user.userId' : req.session.user._id} )
    .then(orders => {
        res.render('shop/orders', {
            pageTitle: 'Your Orders',
            path :'/orders',
            orders: orders,
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
    });
};

// handle download invoice
exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;

    // check is user the correct user
    Order.findById(orderId)
    .then(order => {
        if (!order) {
            return next(new Error('No order found for this one!'))
        }
        // if we do have an order can we check is the order from the user who is logged in
        if (order.user.userId.toString() !== req.user._id.toString()){
            return next(new Error('You are not the authorized user!'))
        }

        // if we make it past these 2 checks then we can output the file
        const invoiceName = 'invoice-' + orderId + '.pdf'; 
        // use path to find the path to the invoice - first look in data folder - then invoices
        const invoicePath = path.join('data', 'invoices', invoiceName);

        // set up to create a doc on the fly
        const pdfDoc = new pdfDocument();
        // pipe the document into a write stream to the invoice path

        res.setHeader('Content-Type', 'application/pdf' );
        res.setHeader(
            'Content-Disposition',
            'inline; filename="' + invoiceName + '"'
        );

        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        // ALSO WE WANT TO RETURN IT TO THE CLIENT - SO PIPE THE DOCUMENT INTO OUR RESPONSE - 
        // res is a writable readstream - pdf is readable - so we can do that

        pdfDoc.pipe(res);

        // create our doc
        pdfDoc.fontSize(26).text('Invoice', {
            underline: true,
        });
        pdfDoc.text('--------------------------------');

        let totalPrice = 0;
        order.products.forEach(prod => {
            console.log('Yippee')
            totalPrice += prod.quantity * prod.productData.price;
            console.log(prod)
            pdfDoc.fontSize(16).text(`${prod.productData.title}: ${prod.quantity} x €${prod.productData.price} -- Line Total €${prod.quantity * prod.productData.price}`);
        });
        pdfDoc.text('--------------------------------');
        pdfDoc.fontSize(20).text(`Total is: €${totalPrice}`);
        pdfDoc.text('--------------------------------');
        pdfDoc.text('--------------------------------');

        pdfDoc.end();


        // readFile gives a callback - this is our arrow function which will be executed when its done reading the file
        // so we will either get an error, or we will get some data

        // process by reading the file is ok for small files
        // fs.readFile(invoicePath, (err, data) => {
        //     if (err) {
        //         // next it - so the default error handling can take over
        //         return next(err);
        //     }
        //     // so no error - we can continue
        //     res.setHeader('Content-Type', 'application/pdf' );
        //     res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
        //     res.send(data);
        // });

        // =====  version of sreaming a static created file - example. This is now handled above where we create the pdf. =====
        // do same as above but by streaming the data rather than reading the whole file - better for larger files.
        // const file = fs.createReadStream(invoicePath);
        // // we still setup the headers to tell browser how to deal with the file.
        // res.setHeader('Content-Type', 'application/pdf' );
        // res.setHeader(
        //     'Content-Disposition',
        //     'inline; filename="' + invoiceName + '"'
        // );
        // // use the file (created above to read the stream) - using the pipe method 
        // // to forward the data which is read in to my response. res is a writable stream
        // file.pipe(res);
        // ======          ==========            ===========         ===========           ===========         ============ 
    })
    //.catch(err => next(err))
};