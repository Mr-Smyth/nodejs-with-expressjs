# Manage Data

## Handle storing of returned data from from

### Saving data to a variable and sharing accross files

+   In admin.js
+   Add a product variable equal to an empty array. `const products = []`
+   change our exports from `module.exports = router;` to `exports.routes = router` this adds our router to our exports object.
+   We then add products to it also: `exports.products = products` So it equals the products array.
+   Now inside our post /add-product route add the returned data to the products array: `products.push({ title: req.body.title });`
+   ---
+   In app.js
+   We now need to change how we import our routes.
+   Rename adminRoutes to adminData to reflect the change to an actual data object
+   Where we use the adminRoutes, also change the name and use dot notation to get to the routes
    ```
    const adminData = require('./routes/admin');
    const shopRoutes = require('./routes/shop');
    ...
    ...
    // outsourced routes
    app.use('/admin', adminData.routes);
    app.use(shopRoutes);
    ```
+   ---
+   Now in shop.js - we want to import this data: `const adminData = require('./admin');`
+   Now we can check if the data is coming through, so add: `console.log(adminData.products);` in the route and run app to check.

This should now give us Shared data accross users and accross browsers - not usually what we want to do, but an example of how it can be done simply.

---

## Using Templating Engines to inject data

### Some Available Templating Engines for use with Express

+   **EJS**: Uses normal html and plain JS in the templates: `<p><%= name %></p>`

+   **PUG (Jade)**: Uses minimal html and custom template language: `p #{name}`

+   **Handlebars**: Uses normal HTML and custom Template language: `<p>{{ name }}</p>`
