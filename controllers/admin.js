// import model
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
    });
};

// now handle the logic for the post from the form in add-products
exports.postAddProduct = (req, res, next) => {
    // push the returned data into an object inside create()
    Product.create({
        title:  req.body.title,
        imageUrl:  req.body.imageUrl,
        price:  req.body.price,
        description:  req.body.description,
    })
    .then(response => {
        console.log(response);
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
    // call the static method to find one product - this passes the returned product into the template
    Product.findByPk(prodId)
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
            product: product
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
    // get the product we want to update
    Product.findByPk(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDescription;
        // now call save() on product and return the promise
        return product.save();
    })
    // handle the response to save()
    .then(result => {
        console.log(`"${result.title}" has been updated`);
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};


exports.postDeleteProduct = (req, res, next) => {
    let prodId = req.body.productId;
    Product.findByPk(prodId)
    .then(product => {
        product.destroy();
    })
    .then(result => {
        console.log(`Deleted - product`);
        return res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
};


exports.getProducts = (req, res, next) => {
    // we add in an anonymous function that will be a cb in the fetchAll
    Product.findAll()
    .then(products => {
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path :'/admin/products',
        });
    })
    .catch(err => {console.log(err);});
};