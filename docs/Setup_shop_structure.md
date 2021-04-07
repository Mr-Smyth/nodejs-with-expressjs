# Setting up the shop structure

## Setting up our views

+   we want to add to our views so we will group them in sub folders of the views folder
+   admin - contains all admin related pages such as add-products
+   shop - contains all customer facing pages

+   Setup all routes and controllers to suit new templates - this requires some refactoring of the code, for example we will split the controllers up into folders 1 for admin and 1 for shop. The routes will have to adjust the path of the imports to match these changes.

## Adding some fields to the form

+   We want to get some more data into our project so we add some more fields to our models properties.

```
module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        // create our constructor properties
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
```

+   Next add the form elements to the add-product page.
+   In our postAddProducts controller - extract the new fields - const price = req.body.price - make sure to match the name property from the form.
    ```
    exports.postAddProduct = (req, res, next) => {
        // push the returned data to the products array
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const product = new Product(title, imageUrl, price, description);
        product.save();
        res.redirect('/');
    };
    ```
+   This should now be saving this new data to our file.


## Display this new Data in the Template

+   Once the data has been called into our controller, and subsequently saved to the file or db its simply a matter of rendering them to the template using the correct engine syntax.

Example with ejs:
```
<main>
        <h1><%= pageTitle %></h1>
        <!-- Add the if check for products with ejs -->
        <% if (products.length > 0) { %>
        <div class="grid">
            <% for (product of products) { %>
                <article class="card product-item">
                    <header class="card__header">
                        <h1 class="product__title"><%= product.title %></h1>
                    </header>
                    <div class="card__image">
                        <img src="<%= product.imageUrl %>" alt="A Book">
                    </div>
                    <div class="card__content">
                        <h2 class="product__price">$ <%= product.price %></h2>
                        <p class="product__description"><%= product.description %></p>
                    </div>
                    <div class="card__actions">
                        <button class="btn">Add to Cart</button>
                    </div>
                </article>
            <% } %>
        </div>
        <% } else { %>
            <h1>No Products Yet!!</h1>
        <% } %>
    </main>
```

## Setup a products details page

### In models

+   Make sure we have a product id in our model. This gives each product a unique identifier. if just using a file, add some sort of id to the save method, like this `this.id = (Math.floor(Math.random()*10000)).toString();`

### In Html
+   Setup a link to point at the product details route and add it to the product in the product list page.
+   Now we add the product id of the current product: `<a href="/product-details/<%= product.id %>" class="btn">Details</a>`
+   Now we need to make sure we can extract this id from the url - in the routes.   
```
<article class="card product-item">
    <header class="card__header">
        <h1 class="product__title">
            <%= product.title %>
        </h1>
    </header>
    <div class="card__image">
        <img src="<%= product.imageUrl %>" alt="<%= product.title %>">
    </div>
    <div class="card__content">
        <h2 class="product__price">$
            <%= product.price %>
        </h2>
        <p class="product__description">
            <%= product.description %>
        </p>
    </div>
    <div class="card__actions">
        <a href="/product-list" class="btn">Back</a>
        <form action="/add-to-cart" method="POST">
            <button class="btn">Add to Cart</button>
        </form>
    </div>
</article>
```

### In our routes.
+   In the routes - add another route in this case the same as product-list, but in place of the expected incomming data which in this case is the product id - place a : then a variable name to store this data in. example: `router.get('/product-list/:productId', shopController.getProducts);`
+   To add this  dynamic route you will need to be aware that a path like /product/:productId - could fire for any url that starts with /products/. So /products/delete would never be reached if it was placed below one of these dynamic routes.

### In our Controllers
+   Next we add on a controller, that gets the information out of the url
+   We extract this by using the express params object in the request: `const prodId = req.params.productId;`. 

```
// Display a products Details controller
exports.getProductDetails = (req, res, next) => {
    // we can access params in the req using express params object
    // this allows us to get productID which is the name we choose in the routes
    const prodId = req.params.productId;
    
    // call the static method to find one product
    Product.fetchOne(prodId, product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title, // dynamically set page header to name of product
            path: '/product-details'
        });
    });
};
```

### Back to our model - setup to find one product
+   In our product model, we now need to add another static method to extract one product only
+   As at this stage of the example we are only using a JSON file to act as a db, so we will have to load all products and do a search.
+   The js find() method will work well here. With find() - it takes in a function, and will keep running that function until true is returned.
+   We will loop over the products array and check if the products id we pass in, matches the current product. If it does our function within find will return true.
+   Then we can execute our callbacck, which is the code in the controller function passed into fetchOne.

Example of the code:

```
static fetchOne(id, cb) {

    // We want to get the products first as we are just dealing with a json file in this example
    getProductsFromFile(products => {

        // now we have all the products we can use normal js
        // use the default js find() method to search an array for a value
        // This will execute a function passed to find - on every element in the array
        // and will ultimately return the element for which the function returns true

        const product = products.find(prod => {
            // REMEMBER FIND WILL ONLY RETURN TRUE
            return prod.id === id;
        });
        // note, above can be written: const product = products.find(prod => prod.id === id); 
        // because in single statement arrow functions, return is implied

        cb(product); // execute the callback code in the controller
    });
}
```
## Setup Add to Cart Functionality

### In the html

To do this, we use the fact that the add to cart button is inside a form, and the method is POST. This means that i can pass data in the request body. So this is the same as adding a product where we have an input with a name, and the user gives it a value. We then get this name and value in the request.

Here we will do something similar, we dont need a visable input, instead we will use a hidden one containing the product id of the current product, then that will be passed in the request body, like this:
```
<form action="/add-to-cart" method="POST">
    <button class="btn">Add to Cart</button>
    <input type="hidden" name="productId" value="<%= product.Id %>">
</form>
```

Note: We could pass this by using the url also, just as we do to get to the product detail page, with the correct product. But we dont need to do it that way in this case, instead we will use the request body.

### In the Models
We want to have a cart that holds all the products that we added and we also want to group products by id and increase their quantity 
in case we add a product more than once. We dont want to use a constructor here because we dont really create a cart, the cart should always be there we just need to add to it.

+   Create a new file in models called cart.js
+   create model  as per example structure below:
    ```
    module.exports = class Cart {
        static addProduct(id) {
            // First fetch the previous cart //////////////////////////////////////////////////////////////////////////////////////////////////
            // Analyze the cart, see if product being added is an existing product in cart ////////////////////////////////////////////////////
            // Add new product / increase the qty /////////////////////////////////////////////////////////////////////////////////////////////
        }
    }
    ```
+   Import fs and path
+   construct a path to our json file that will act as our database
+   Here is the commented code working with file storage
    ```
    const path = require('path');
    // import utility to get the root directory
    const getRoot = require('../utility/path');
    const fPath = path.join(getRoot, 'data', 'cart.json');


    /* We want to have a cart that holds all the products that we added
    and we also want to group products by id and increase their quantity 
    in case we add a product more than once. 

    Dont want to use a constructor here because we dont really create a cart, 
    the cart should always be there we just need to add to it.*/
    module.exports = class Cart {
        static addProduct(id, productPrice) {
            // First fetch the previous cart //////////////////////////////////////////////////////////////////////////////////////////

            // try to read the file - we will either get an err or the file content
            fs.readFile(fPath, (err, filecontent) => {
                // our cart equals a new cart by default.
                const cart = { products: [], totalPrice: 0 } 
                // if we DONT have an error - the cart exists so we redefine cart
                if (!err) {
                    // reassign cart with the data from the read file
                    cart = JSON.parse(fileContent);
                }

                // Analyze the cart, see if product being added is an existing product in cart ///////////////////////////////////////

                // see if product exists using findIndex - we use findIndex here instead of find because 
                // we will use the index to replace any existing product with an updated one
                const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
                const existingProduct = cart.products[existingProductIndex];

                // now a product from the products model does not have a qty field - so we create a new product from existing product or 
                // if no existing product in cart, then we use it to make a new object for product
                let updatedProduct;

                // Add new product / increase the qty ///////////////////////////////////////////////////////////////////////////////
                
                // now we check if the product exists already in our cart
                if (existingProduct) {
                    // then we want to increase the qty - but we use updatedProduct to make a copy of existing product
                    // Use spread to create a new object
                    updatedProduct = { ...existingProduct };
                    // then we can increment the qty - assuming for now, we can only add 1 each time
                    updatedProduct.qty = updatedProduct.qty + 1;
                    // now we use the index we got above to replace the existing product with our updated one
                    cart.products = [...cart.products];
                    cart.products[existingProductIndex] = updatedProduct;
                }
                // now if product is not existing in the cart
                else {
                    updatedProduct = { id: id, qty: 1 };
                    // now update the cart - here we can simply add the product
                    cart.products = [...cart.products, updatedProduct];
                }

                // now we need to update the price - reference the cart object - the + converts it to a number
                cart.totalPrice = cart.totalPrice + +productPrice;

                // Now lastly we write the data back into the file. - use stringify to convert back to json
                fs.writeFile(fPath, JSON.stringify(cart), (err) => {
                    console.log(err);
                });
            });
        }
    }
    ```


### In the routes
+   Go to shop.js routes
+   The getCart route, is the one to display the page, but as we are using a POST request to send the data - we need another route to handle the post request.
```
// Shopping Cart page
router.get('/cart', shopController.getCart);

// Product details to Shopping Cart Post handler
router.post('/cart', );
```

### Now Construct the controller for this post route 
+   Go to controllers/ shop.js
+   We need to get the Product id from the request body
+   We then get the correct product
+   We then call the cart static function to add the product id and the price to the cart

```
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
```






## Setup edit and delete functionality

This will involve passing a product ID as part of the url

### Edit button

+   Create a link that points to the edit route: `<a href="/admin/edit-product" class="btn">Edit</a>`
+   