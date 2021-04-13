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
    ```


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


### Display items in Cart Template
Here we need to get all products, that we have in the cart. So first we need to get the products that are listed in the cart along with the total. Then we need to get all products, so we have the full products details. After that we can build a list of products that are in the cart.

#### Templates
+   Setup Template.

#### models
+   Goto the cart model
+   Add a new static funtion to get contents of the cart
+   get the data from the file and call a callback to act on it
```
/**
* get the cart contents from the file
* @param {*CallBack} cb 
*/
static getCart(cb) {
    fs. readFile(fPath, (err, fileContent) => {
        const cart = JSON.parse(fileContent);
        //run the callback on the data in the file
        if (err) {
            cb (null);
        }
        else {
            cb(cart);   
        }
    });
}
```

#### Controllers
+ Go to getCart controller

+ Get the cart :  `Cart.getCart(cart => {});`

+ Inside this function we also need to get the products :`Product.fetchAll(products => {}`

+ Now we can loop over the products and see if any of the products id's, match an id in the cart. If they do then push that product into cartProducts for our template

+ Include the qty for any products pushed, this will be available from the cart data

+ Now we just need to return cartProducts to the template

  Completed function:

  ```
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
  ```

  



## Setup edit and delete functionality

This will involve passing a product ID as part of the url

### Edit button

We could reuse the add-product page here and combine both into one template called edit-product, but for clarity here i will use seperate template files

#### HTML
+   Add the same markup as the add product page for now
+   Create a link that points to the edit route: `<a href="/admin/edit-product" class="btn">Edit</a>`
+   Make sure the action goes to edit-product

+   Once the routes and controllers are set up we can pre populate our form using the value property and point it at our passed in product object 

#### Routes
+   Add the route to handle edit product - but takes in the product id in the url.   
`router.get('/edit-product/:productId', adminController.getEditProduct);`

#### Controllers
+   Add a controller for the edit-product route
+   We need to get the products, but first check the optional use of query params in next section.
+   Once you have checked query params we can construct our controller to get the product to be edited from the product id passed in the url as follows:
```
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
```

#### Using optional Query Params

For this purpose it is redundant, but as an example we can pass an optional query param in the url from the html link that we can also check for and act on accordingly. the query object is produced and managed by express,  So in this example i will add a query param as follows

+   In the link that sends a user to the edit page add in `?edit = true`
+   In the controller for edit-product add the following param: `editing: editMode`. this allows us to check for editing in the template itself, redundant here but useful if you aree sharing a template with add-product perhaps, in that case you can check this parameter to possibly change a button name or action.
+   Then in the same controller, check this param and act accordingly, if it does not exist return user to home page, you must check if it is equal to the string 'true', as true will be a string in the url.
    ```
    exports.getEditProduct = (req, res, next) => {
        const editMode = req.query.edit;
        if (!(editMode === 'true')) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product Page',
            path: '/admin/edit-product',
            editing: editMode
        });
    };
    ```

So now we will only enter edit mode if the edit param is true and present in the url.

### Post our edited product

#### In Template
Make sure in the edit-product template that we have a hidden input to send the product.id.

#### In routes

Add a post route for edit product: `router.post('/edit-product', adminController.postGetEditProduct);`


#### In the Product Model
+   As the product we get from the edit-product will already have an id, we can therefore accept an id in the constructor. now because this is the same constructor that add-product will use, we will need to set a 'null' arg for id, when we call this constructor to create a new item.
+   Now we can add `this.id = id` to the constructor.
+   Next then in the save method, we will have to add a check to see if the id already exists, before one is created, so we will ad an if to check inside the callback and also add the current product id create code below the check
+   Now what we want to do is find the product being edited, so we can do all this inside the if check for a product id, because if there is already a product id that means the call is coming from edit product.
+   So we use findIndex to find the product idex of the product we want to edit, product in this function is an array that is retrieved from the helper function.
+   From this we will use a function on each product in the array to check if prod.id === the id we are looking for: `const existingProductIndex = products.findIndex(prod => prod.id === this.id);`
+   Make a new array called updatedProducts = to the current products array.
+   Then update the new array at the correct index - with this, as this represents all the data from our edited product, and will be passed by the controller.:
    ```
    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(fPath, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            }
            else {
                this.id = (Math.floor(Math.random()*10000)).toString();
                // because either an existing or a blank array is returned in the products variable we can push to it.
                products.push(this);
                fs.writeFile(fPath, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }
    ```

#### In controllers

+   Add null as a first arg in the `postAddProduct` controller.
+   Add a new controller to handle the post edited product. Use the name we used in the route above, so - `postGetEditProduct`:
+   Now we want to get the information from the edit-product template and pass it to the model. Because we used post, we can get  this data from the request body: 
```
exports.postGetEditProduct = (req, res, next) => {
    //we dont need to get the product Headers, we just want the values from the edit form
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedTImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedTImageUrl, updatedPrice, updatedDescription);
    updatedProduct.save();
    return res.redirect('/admin/products');
};
```
**Basic Edit Functionality done**


### Delete from cart functionality

#### in the cart.js model
+   Here we need to create a new static method that we can call from the delete method in the products model
+   It must take in the id and the products price, so we can reduce the cart total.
+   It must get the current carts products
+   Create a copy of the cart for us to edit
+   It must get the product we want to delete and extract the qty
+   create an update products array excluding the product to be deleted - using filter
+   Update the cart total - using products price X qty
+   Write back to file.
```
static deleteProduct (id, productPrice) {
    // try to read the cart file
    fs.readFile(fPath, (err, fileContent) => {
        if (err) {
            return;
        }
        const updatedCart = { ...JSON.parse(fileContent) };

        // lets see how many times we have the product to be deleted in the cart
        const toBeDeleted = updatedCart.products.find(prod => prod.id === id);
        const toBeDeletedQty = toBeDeleted.qty;

        // Update the file - the products key
        updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);

        // so we can adjust price
        updatedCart.totalPrice = updatedCart.totalPrice - productPrice*toBeDeletedQty;

        // write to file
        fs.writeFile(fPath, JSON.stringify(updatedCart), (err) => {
            console.log(err);
        });
    });
}
```

### Delete functionality

+   In the template use a form to post the products id via a hidden input
+   Create a new route for this path, imake it a post route: `router.post('/delete-product', adminController.postDeleteProduct);`
+   Create a controller called postDeleteProduct, in the controller get the product id we want to delete from the req.body
+   Create a static method in the model, that takes in the productId and then creates an updated list of all products - excluding the product with the product id we want to delete - do this simply with filter()
+   rewrite to our json file
+   Import the cart model and call the cart.deleteProduct from inside the write function, passing in the id and the product price - ***(This will require getting the product first at the top of the method)***.
+   Call the static method from the controller - a callback should be used - but will be added later.
+   redirect to a template.

```
static deleteOne(id) {
    // get the products from the file
    getProductsFromFile(products => {
        const toBeDeleted = products.find(prod => prod.id === id);
        // Create a new list using filter -  filter takes a funtion to return everything except our id item
        let updatedProducts = products.filter(prod => prod.id !== id);
        //Write our list back into file.
        fs.writeFile(fPath, JSON.stringify(updatedProducts), err => {
            if (!err) {
                Cart.deleteProduct(id, toBeDeleted.price)
            }
            console.log(err);
        });
    });
}
```