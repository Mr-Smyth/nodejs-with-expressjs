# MVC - Model View Controleer

[Return to Readme](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/README.md)

# Index
- [MVC - Model View Controleer](#mvc---model-view-controleer)
  * [Seperation of concerns](#seperation-of-concerns)
  * [CONTROLLERS](#controllers)
  * [Models](#models)
    + [Saving the Products to a File](#saving-the-products-to-a-file)
    + [Fetching the data from the file](#fetching-the-data-from-the-file)
- [MVC wrap up](#mvc-wrap-up)

## Seperation of concerns
+   MODELS
    + REPRESENT YOUR DATA IN YOUR CODE
    + WORK WITH YOUR DATA (e.g save, fetch)

+   VIEWS
    + WHAT THE USER SEES
    + DECOUPLED FROM YOUR APPLICATION CODE

+   CONTROLLERS - (ROUTES - CAN HANDLE THIS - BUT WE WILL USE CONTROLLERS TO SEPERATE IT OUT)
    + CONNECTING YOUR MODELS AND VIEWS
    + CONTAINS THE IN BETWEEN LOGIC

[<< Back to Index](#index)

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
[<< Back to Index](#index)

---

## Models

Simple example of a model for a product with just a title:

+   Create a models folder
+   Inside this folder for this example create a model file called product.js - because the model will represent an instance of one product.
*   create an export of a class, here we call the class Product
+   Create the constructor function inside and pass in the title of the product
+   Then inside the constructor we make the created instance title property equal whatever title is. This means that if we go newProd = new Product, then inside this newProd object, will be a title property, and we want to make that equal to title.
+   At this stage it should look like this:
    ```
    module.exports = class Product {
        constructor(title) {
            this.title = title;
        }
    
    }
    ```
+   Next we need a way to call save on the created instance, so we add a save function. First we will just create a global array to hold the data for now and call it products.
+   Next inside the save method we will push the instance to the array. It should look like this:
    ```
    save() {
        products.push(this);
    }
    ```
+   Next we need a way to get all the data from this object, so we create a function called fetchAll(). But because we do not call this on an instance of the class, but instead we want to get everything, we add static before it. 
    ```
    static fetchAll() {
        return products;
    }
    ```

[<< Back to Index](#index)

### Saving the Products to a File

We are using a json file

+   JSON.parse = takes json data and turns it into a js array
+   JSON.stringify = takes a js array and turns it into json data


+   We get the root path and setup a variable that has the path to the file we want to read and write to.
+   We create a blank products array - this is so we can push data to it, if current data does not exist
+   Then we check if there is any current info in the file, if there is we parse it into a js array
+   Then we push the object into the array, whichever one it is blank or existing
+   Then convert it back to json data using stringify
+   Then write it to file

Example save method:
```
save() {
    // create a path to the storage file
    const fPath = path.join(getRoot, 'data', 'products.json');

    // now we want to read the file in
    // We want to do something when we have finished reading it in. either we get an error or we get data in buffer form
    // So we make an arow function here as we want this data to persist until we can resolve it.
    fs.readFile(fPath, (err, fileData) => {

        // initially setup products as an empty array
        let products = [];

        // then we check if we have had NO error, - this means data was read from file
        if (!err) {
            // then we can parse the data into a js array. - JSON.parse does this.
            products = JSON.parse(fileData);
        }

        // so now we either have an epty products array, or one containing existing products from the file
        // so now we can push to it - push this, as we are still within the arrow function
        products.push(this);

        // and finally we save it back into the file - by first converting products array back to json and writing the products to file
        //JSON.stringify turns it back into a json string
        // Also include an err
        fs.writeFile(fPath, JSON.stringify(products), (err) => {
            console.log(err);
        });
    });
}
```

[<< Back to Index](#index)

### Fetching the data from the file

**Problem** readFile is asychronous code, and the logic within the readFile will be missed if we deal with it synchronously, therefore we need a callback.

What we will do is:
+   add a 'cb' into fetchAll
+   this callback refers to an anonymous function within the fetchAll call in the products.js controller.
+   This cb will be called from within the readFile function (which is asynchronous) and it will be called with the response to the readFile data
+   This garuntees the response and essentially the code will be rendered to the template from within the cb function in the products.js controller.

Example from code:

The fetchAll Method:
```
static fetchAll(cb) {
        const fPath = path.join(getRoot, 'data', 'products.json');

        // read the file - code will not wait for this response as its asynchronous - hence we will call back
        fs.readFile(fPath, (err, fileData) => {
            if (err) {
                // call the callback function in the controller with a blank array
                return cb([]);
            }
            // otherwise call the callback function in the controller with the read data
            cb(JSON.parse(fileData));
        });
    }
```

The products.js controller:
```
// Display our products controller
exports.getProducts = (req, res) => {
    // we add in an anonymous function that will be a cb in the fetchAll
    Product.fetchAll((products) => {
        // once all products have been read - this function is called from within fetchAll
        res.render('shop', {
            products: products,
            pageTitle: 'Shopping page',
            path :'/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};
```
[<< Back to Index](#index)

# MVC wrap up
Useful resources:

More on MVC: https://developer.mozilla.org/en-US/docs/Glossary/MVC

[<< Back to Index](#index)
