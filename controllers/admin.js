
// import model
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
        isAuthenticated: req.session.isLoggedIn
    });
};

// now handle the logic for the post from the form in add-products
exports.postAddProduct = (req, res, next) => {
    // get form data
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(
        {
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
            userId: req.session.user
        });
    
    product.save()
    .then(response => {
        console.log('PRODUCT CREATED');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};

// gets theproduct into a form that needs to be edited
exports.getEditProduct = (req, res, next) => {
    // check quer param to see if param sent from template is true
    const editMode = req.query.edit;
    if (!(editMode === 'true')) {
        return res.redirect('/');
    }

    // now we need the product id that was passed in the url
    const prodId = req.params.productId;

    // call the fetchOne method inside product model - returns a product
    Product.findById(prodId)
    .then(product => {
        // add a check in case product does not exist
        if (!product) {
            return res.redirect('/');
            // could also pass an error in here
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product Page',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postGetEditProduct = (req, res, next) => {
    //collect the edited product data from the request body
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    
    // find the product, then we get access to it
    Product.findById(prodId)
    .then(product => {
        // this gives us access to an object which is the product
        // update the product mongoose object
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDescription;

        // then call the built in save method save
        product.save(); 
    })
    .then(result => {
        console.log('UPDATED PRODUCT');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};


exports.postDeleteProduct = (req, res, next) => {
    let prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
    .then(() => {
        console.log(`Deleted - product`);
        return res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};


exports.getProducts = (req, res, next) => {
    // we add in an anonymous function that will be a cb in the fetchAll
    // Product.findAll()

    // use the user method
    Product.find()
    .then(products => {
        console.log(products);
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path :'/admin/products',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => {console.log(err);});
};