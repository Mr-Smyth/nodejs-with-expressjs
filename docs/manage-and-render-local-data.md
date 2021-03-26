# Manage Data

## Handle storing of returned data from from

### Saving data to a variable and sharing across files

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

This should now give us Shared data across users and across browsers - not usually what we want to do, but an example of how it can be done simply.

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

+   *Tell app.js that we are going to use an express conforming templating engine and we want to use it. so we use [app.set()](http://expressjs.com/en/5x/api.html#app.set). - set() can be used for many applications including sharing data across an application. But we are going to use the built in views-engine property to tell express where to find our dynamic template views.*

+   After we define our app = express, add: `app.set('view engine', 'pug');`

**NOTE** *You <ins>***CANNOT***</ins> enter just anything in the 2nd arg, it must be pug. Pug is shipped with auto express support and registers itself as pug.*

+   You can also specify a path for the location of the views. We don't really need to here as the default location for views is /views - which is where they are. But this is how you would do it: `app.set('views', 'views');

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
In a .pug file - the syntax is different and relies on indentation to set sibling/parent/child status in the Dom. The file is then compiled into html code and sent to the browser.



#### Pass data to the template

+ Inside our shop route - get the products out of the adminData: `const products = adminData.products;`

+ Now to pass it to the template we can simply add a 2nd arg to the render method: `res.render('shop', {products: products});`

+ You can also add more key, value pairs to this object - such as a title: `res.render('shop', {products: products, title: 'Shop Page'});`

+ We can now use this in our pug template:

  ```
  <!DOCTYPE html>
  html(lang="en")
      head
          meta(charset="UTF-8")
          meta(name="viewport", content="width=device-width, initial-scale=1.0")
          meta(http-equiv="X-UA-Compatible", content="ie=edge")
          title #{ docTitle }
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
          main
              if products.length > 0
                  .grid
                      each product in products
                          article.card.product-item
                              header.card__header
                                  h1.product__title #{ product.title }
                              .card__image
                                  img(src="https://cdn.pixabay.com/photo/2016/03/31/20/51/book-			 1296045_960_720.png", alt="A Book")
                              .card__content
                                  h2.product__price €19.99
                                  p.product__description #{ product.title } is a very interesting book about so many even more interesting things!
                              .card__actions
                                  button.btn Add to Cart
              else 
                  h1 No Books yet..
  
  ```

#### Using Base Template Layouts
You can also use a base template with pug.

+   Create a base pug file example: `base.pug`
+   Add in hooks where we can inject data for a particular page: `block content` or `block styles` for example.
+   Then in the extended files add in the code that extends the base: 
```
extends base.pug

block styles
    link(rel="stylesheet", href="/css/forms.css")
    link(rel="stylesheet", href="/css/product.css")

block content
    main
        form.product-form(action="/admin/add-product", method="POST")
            .form-control
                label(for="title") Title
                input(type="text", name="title")#title
            button.btn(type="submit") Add Product
```

#### Add code to check if on active page
 To do this we can simpy add a key:value pair to the response like : `res.render('shop', {products: products, pageTitle: 'Shopping page', path :'/' });` and then check the path with a Ternary in the base.html nav area : 
 ```
 li.main-header__item
    a(href="/", class=(path === '/' ? 'active' : '')) Shop
li.main-header__item
    a(href="/admin/add-product", class=(path === '/admin/add-product' ? 'active' : '')) Add Product
```

#### Learn more about PUG

Want to learn more about Pug? Check out their official docs: [Click Here..](https://pugjs.org/api/getting-started.html)

** ----------------  PUG (sample) SETUP COMPLETE  ---------------- **

### Handlebars Setup

***Due to a (temporary) breaking change introduced by the library authors (of the package we'll install in the next lecture), make sure you run npm install --save express-handlebars@3.0 before you start using that package in the next lecture.***

+   Goto app.js
+   We need to set the default engine.
+   First we import handlebars - `const expressHbs = require('express-handlebars');`
+   Now we need to call .engine() to setup a default name and to initialize it. We did not have to do this with pug - because that part of pug is already built into express. So the first arg is the chosen name and the 2nd is a call to initialize it.
+   To Initialize handlebars: `app.engine('hbs', expressHbs());`
+   Now take the name we used to initialize it - and add that to the view-engine setting: `app.set('view engine', 'hbs');`

Now that we have registered handlebars with our chosen name, we must use this chosen name as our template file extension, so `index.hbs` in this case, for example.

#### Setup our Routes

The method in which we pass data to a template does not change and is the same with all engines. See the pug section on setup for passing data to templates.

#### Setup our Templates

A Handlebars template uses normal html, with the slight difference of calling data variables with `{{ variable_name }}`