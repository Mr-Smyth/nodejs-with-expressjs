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
## Setup edit and delete functionality

+   Add the 2 buttons to our html
+   