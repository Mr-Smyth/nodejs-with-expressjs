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
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!(editMode === 'true')) {
        return res.redirect('/');
    }

    // now we need the product id that was passed in the url
    const prodId = req.params.productId;
    // call the static method to find one product - this passes the returned product into the template
    Product.fetchOne(prodId, product => {
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
    });
};

exports.postGetEditProduct = (req, res, next) => {
    //we dont need to get the product Headers, we just want the values from the edit form
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
    updatedProduct.save();
    return res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    let prodId = req.body.productId;
    Product.deleteOne(prodId);
    return res.redirect('/');
};


exports.getProducts = (req, res, next) => {
    // we add in an anonymous function that will be a cb in the fetchAll
    Product.fetchAll((products) => {
        // once all products have been read - this function is called from within fetchAll
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path :'/admin/products',
        });
    });
};