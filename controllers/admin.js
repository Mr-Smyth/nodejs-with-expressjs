// temp - to check error handling
const mongoose = require('mongoose');

// validation
const { validationResult } = require('express-validator');

// import model
const Product = require('../models/product');


// render the edit-product screen
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add a new product',
        path: '/admin/add-product',
        editing: false,
        hasError: false,
        errorMsg: null,
        errorsArray: []
    });
};

// now handle the logic for the post from the form in add-products
exports.postAddProduct = (req, res, next) => {
    // get form data
    const title = req.body.title;
    // look for req.file - we use multer to extract image
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;
    console.log(image);

    if (!image) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,
            product: {
                title: title,
                imageUrl: image,
                price: price,
                description: description
            },
            hasError: true,
            errorMsg: 'Attached image is not a valid image!',
            // dont need anything in red - so we return just empty array here
            errorsArray: []
        });
    }

    const errors = validationResult(req);

    // ==== CHECK VALIDATION ====== //

    // RENDER THE EDIT-PRODUCT TEMPLATE WHICH USES SOME TEMPLATE LOGIC TO DECIDE IF WE ARE THERE BECAUSE OF EDITING OR HASERROR
    // WE INCLUDE THE PRODUCT DETAILS FROM ABOVE SO THESE CAN BE DISPLAYED FOR THE USER IN THE CASE OF AN ERROR
    if (!errors.isEmpty()) {
        // return 422 - which is a common status code for validation errors
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,
            product: {
                title: title,
                imageUrl: image,
                price: price,
                description: description
            },
            hasError: true,
            errorMsg: errors.array()[0].msg,
            errorsArray: errors.array()
        });
    }

    // set up imageUrl as the images location on file storage
    const imageUrl = image.path

    const product = new Product(
        {
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
            userId: req.user
        });
    
    product.save()
    .then(response => {
        console.log('PRODUCT CREATED');
        res.redirect('/admin/products');
    })
    .catch(err => {

        // ====== OPTION 1 - return to same page with error

        // return res.status(500).render('admin/edit-product', {
        //     pageTitle: 'Add Product',
        //     path: '/admin/add-product',
        //     editing: false,
        //     product: {
        //         title: title,
        //         imageUrl: imageUrl,
        //         price: price,
        //         description: description
        //     },
        //     hasError: true,
        //     errorMsg: 'Db failed',
        //     errorsArray: []
        // });

        // ====== OPTION 2 - redirect
        // return res.redirect('/500');

        // ====== OPTION 3 - throw an error
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
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
            hasError: false,
            errorMsg: null,
            errorsArray: []
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
    });
};

exports.postGetEditProduct = (req, res, next) => {
    
    //collect the edited product data from the request body
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        console.log(errors.array());
        // return 422 - which is a common status code for validation errors
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: true,
            product: {
                title: updatedTitle,
                imageUrl: updatedImageUrl,
                price: updatedPrice,
                description: updatedDescription,
                _id: prodId
            },
            hasError: true,
            errorMsg: errors.array()[0].msg,
            errorsArray: errors.array()
        });
    }

    
    // find the product, then we get access to it
    Product.findById(prodId)
    .then(product => {
        
        // first check if correct user is logged in - ie - the creator
        if (product.userId.toString() !== req.user._id.toString()) {
            req.flash('message', 'Invalid user Authentication! - You do not have permission to edit this product. Please check the required user and try again.');
            return res.redirect('/');
        }
            
        // this gives us access to an object which is the product
        // update the product mongoose object
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDescription;

        // then call the built in save method save
        return product.save()
        .then(result => {
            console.log('UPDATED PRODUCT');
            res.redirect('/admin/products');
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
    });
};


exports.postDeleteProduct = (req, res, next) => {
    let prodId = req.body.productId;

    // change delete method to deleteOne - so as to also check for correct user
    // Old method => Product.findByIdAndRemove(prodId)
    Product.deleteOne({ _id: prodId, userId: req.user._id })
    .then(response => {
        // response.n gives a 1 for deletion or a 0 for no deletion - use that to redirect
        if (response.n) {
            console.log(`Deleted - product`);
            return res.redirect('/admin/products');
        }
        else {
            req.flash('message', 'Invalid user Authentication! - You do not have permission to Delete this product. You cannot delete products you did not create!');
            return res.redirect('/');
        }
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
    });
};


exports.getProducts = (req, res, next) => {
    // we find all products by current user
    // we compare the products user id field with the user we injected into the req in app.js
    Product.find({ userId: req.user._id })
    .then(products => {
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path :'/admin/products',
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        // call next with an eror passed in will call our special middleware for handling errors - see app.js
        return next(error);
    });
};