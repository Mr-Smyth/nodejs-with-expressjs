# MVC - Model View Controleer

Seperation of concerns
+   MODELS
    + REPRESENT YOUR DATA IN YOUR CODE
    + WORK WITH YOUR DATA (e.g save, fetch)

+   VIEWS
    + WHAT THE USER SEES
    + DECOUPLED FROM YOUR APPLICATION CODE

+   CONTROLLERS - (ROUTES - CAN HANDLE THIS - BUT WE WILL USE CONTROLLERS TO SEPERATE IT OUT)
    + CONNECTING YOUR MODELS AND VIEWS
    + CONTAINS THE IN BETWEEN LOGIC

## CONTROLLERS
All of the code required to act as a controller can all be contained within the route. But this quickly becomes messy in large applications. Therefore we use a controllers folder

+   Create a controllers folder
+   Inside the controllers folder create files that match the pieces of logic you want to execute. To match our projects current logic we will create a products.js file, and inside this place the logic we currently have in the /add-product route.

So this, from admin.js:
```
router.get('/add-product', (req, res, next) => {
    res.render('add-product',{
        products: products,
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    });
    // res.sendFile(path.join(findDir, 'views', 'add-product.html'))
});
```

Becomes this:   

admin.js:

```
const productsController = require('../controllers/products');

// we know pull the logic for this route from controllers.products
router.get('/add-product', productsController.getAddProduct);
```

and controllers/products.js:

```
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        products: products,
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    });
};
```

Some more changes that you would need to do to get from logic in routes to logic in controllers might be what you import. We can now display our products using the logic inside the products.js controller - which is in the same file as the logic that creates the products data - so we do not need any of those imports or exports from admin to shop.js anymore.

admin.js:
```
const path = require('path');

const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

// we know pull the logic for this route from controllers.products
router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;
```

shop.js
```
const path = require('path');

const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.get('/', productsController.getProducts);

module.exports = router;
```

contollers/products.js:
```
/**
 * Here we are exporting the logic required to render the add-product page
 * We are tacking it onto the exports
 * The name we give it can be anything
 * 
 * This is still a normal middleware function
 */

const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        products: products,
        pageTitle: 'Admin Page',
        path: '/admin/add-product',
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    });
};

// now handle the logic for the post from the form in add-products
exports.postAddProduct = (req, res, next) => {
    // push the returned data to the products array
    products.push({ title: req.body.title });
    res.redirect('/');
};

// Display our products controller
exports.getProducts = (req, res) => {
    res.render('shop', {
        products: products,
        pageTitle: 'Shopping page',
        path :'/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
};
```

app.js:
```
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// helper - to get dir
const findDir = require('./utility/path');

const app = express();

// now setup the default template engine
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/errors.js')

app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use(bodyParser.urlencoded({extended: false}));
// this tells express to look into the public folder to serve up css files
app.use(express.static(path.join(__dirname, 'public')));

// outsourced routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);
```

---

## Some m