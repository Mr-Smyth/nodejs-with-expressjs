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

+   Make sure we have a product id in our model. if just using a file, add some sort of id to the save method, like this `this.id = (Math.floor(Math.random()*10000)).toString();`
+   Setup a link to point at the product details route and add it to the product in the product list page.
+   Now we add the product id of the current product: `<a href="/product-details/<%= product.id %>" class="btn">Details</a>`
+   Now we need to make sure we can extract this id from the url - in the routes. 
+   In the routes - add another route in this case the same as product-list, but in place of the expected incomming data which in this case is the product id - place a : then a variable name to store this data in. example: `router.get('/product-list/:productId', shopController.getProducts);`
+   To add this  dynamic route you will need to be aware that a path like /product/:productId - could fire for any url that starts with /products/. So /products/delete would never be reached if it was placed below one of these dynamic routes.
+   Next we add on a controller, that gets the information out of the url
+   We extract this by using the express params object in the request: `const prodId = req.params.productId;`.   

### in our model - setup to find one product
+   In our product model, we now need to add another static method to extract one product only
+   As at this stage of the example we are only using a JSON file to act as a db, we will have to load all products and do a search.
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


## Setup edit and delete functionality

This will involve passing a product ID as part of the url

### Edit button

+   Create a link that points to the edit route: `<a href="/admin/edit-product" class="btn">Edit</a>`
+   