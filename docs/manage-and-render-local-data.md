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

### Install all 3 so we can look at them

+   `npm install --save ejs pug express-handlebars`

### PUG setup

#### tell our application about PUG

+   Goto App.js

+   *Tell app.js that we are going to use an express conforming templating engine and we want to use it. so we use [app.set()](http://expressjs.com/en/5x/api.html#app.set). - set() can be used for many applications including sharing data accross an application. But we are going to use the built in views-engine property to tell express where to find our dynamic template views.*

+   After we define our app = express, add: `app.set('view engine', 'pug');`

**NOTE** *You <ins>***CANNOT***</ins> enter just anything in the 2nd arg, it must be pug. Pug is shipped with auto express support and registers itself as pug.*

+   You can also specify a path for the location of the views. We dont really need to here as the default location for views is /views - which is where they are. But this is how you would do it: `app.set('views', 'views');

#### Tell our route about PUG
+ Instead of sending a result with the path tou our html, we can just use the res.render() method. This will use the default templating engine, which we have set as pug in app.js above. We do not need to specify a path, because we have already specified that in app.js also (even though they are in the default location anyway).

+ So our response for our shop route is: `res.render('shop')` - no need to put 'shop.pug' - as we have already told app.js we are using pug files in app.js in the line `app.set('view engine', 'pug');`

#### Create our PUG Template

+   Now in the  views, create a pug template: shop.pug

+   This file will use a different syntax than our html, below is an example of replicating a simple shop page:
```
<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        title My Shop
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
    body
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Product
        h1 This is a pug file
```
In a .pug file - the syntax is different and relies on indentation to set siblin/parent/child status in the dom. The file is then compiled into html code and sent to the browser.

** PUG SETUP COMPLETE **