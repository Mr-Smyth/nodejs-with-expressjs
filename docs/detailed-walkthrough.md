# nodejs-with-expressjs - Detailed Walkthrough
Some examples and information on using Express JS with Node JS

[Return to Readme](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/README.md)

# Index

- [nodejs-with-expressjs](#nodejs-with-expressjs)
- [What is Express JS?](#what-is-express-js-)
  * [Alternatives to ExpressJS](#alternatives-to-expressjs)
- [Setup Express](#setup-express)
  * [Installing Express JS](#installing-express-js)
  * [To start using Express](#to-start-using-express)
- [Middleware](#middleware)
  * [Setting up Middleware](#setting-up-middleware)
  * [Favicon issue](#favicon-issue)
  * [Adding some response in the middleware](#adding-some-response-in-the-middleware)
  * [Handling requests/routes with Express](#handling-requests-routes-with-express)
    + [Add a default path of '/' to our first middleware](#add-a-default-path-of-----to-our-first-middleware)
    + [How to add a form and extract data](#how-to-add-a-form-and-extract-data)
- [Handling routing with Express JS](#handling-routing-with-express-js)
  * [Grouping outsourced apps under an app name](#grouping-outsourced-apps-under-an-app-name)
  * [Adding a 404 page](#adding-a-404-page)
  * [Setting up Templates](#setting-up-templates)
  * [Serving the templates](#serving-the-templates)
    + [Creating a path helper function](#creating-a-path-helper-function)
  * [Serving up Static or Public files](#serving-up-static-or-public-files)
    + [How to make our Css available](#how-to-make-our-css-available)
- [Glossary of Terms](#glossary-of-terms)
- [Useful links:](#useful-links-)



---
<br>
<br>
<br>
<br>
<br>

# What is Express JS?

ExpressJs is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. It is by far the most popular(at time of writing) and therefore there are numerous 3rd party packages which can be pulled in for various applications.

## Alternatives to ExpressJS

+ Just stick with Vanilla Js
+ Adonis.js
+ Koa
+ Sailis.js

[<< Back to Index ..](#index)

# Setup Express 

## Installing Express JS

+ Inside the project - goto a terminal
+ npm install --save express (we wont use -dev as express js is an integral part of the projects production)
+ This will now be added to dependencies withing packages.json.

## To start using Express

+ Goto app.js (or similar)
+ Import Express : `const express = require('express');`
+ Create an Express application: `const app = express();`.   

 *We execute it as a function, because if you look at the source code for express you will see it exports a funtion called 'e'. This will create a new object, where the framework will manage stuff behind the scenes.*

+ app is also a request handler so we can pass that into the create server method.   
`const server = http.createServer(app);`<br>
`server.listen(3000)`

+   or we can even leave the createServer out alltogether and just add listen onto app:   
`app.listen(3000`) [This shows you how express already does this for us.](https://github.com/expressjs/express/blob/508936853a6e311099c9985d4c11a4b1b8f6af07/lib/application.js#L616)   
+ This also means we do not have to import the http method either.

[<< Back to Index ..](#index)


# Middleware

**middleware functions are executed sequentially - so the order matters**

This means that any incomming request is automatically funnelled through a bunch of functions called middleware. The request will pass through these middleware functions until you send a response.   
There can be multiple blocks of this and this allows for the plugable nature of expressjs - where we can easily add other 3rd party packages to give various functionalities.

**Request** => **Middleware**( (req, res, next) => { ... } ) => next() **Middleware**( (req, res, next) => { ... } ) => res.send() => **Response**.

[<< Back to Index ..](#index)


## Setting up Middleware
+ In the server app, after we define the app object, but before we create the server - add the following line: `app.use((req, res, next) => {});`.

    + **use()**: defined by the express framework - allows us to add a new middleware function.
    + Takes in an array of request handlers, the first option usually being the path [See more...](http://expressjs.com/en/4x/api.html#app.use)
    + Simplest way is to pass in a function that will be run for every incomming request.
    + The function will usually take 3 args:
    + **req**: The request object
    + **res**: The response object
    + **next**: Called from within the use function to allow the request to travel on to the next Middleware.

Example:
```const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("Im here");
    next();
});

app.use((req, res, next) => {
    console.log("Im also here");
});

const server = http.createServer(app);
server.listen(3000);
```
[<< Back to Index ..](#index)


## Favicon issue

Browsers will by default request /favicon.ico from the root of the hostname - to avoid this 2nd request add the following code at the top of the middleware pile:   
```
app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});
```

[<< Back to Index ..](#index)


## Adding some response in the middleware

We can still use the setHeader and write, but express gives us .send();

+ send() allows us to directly insert html, and it will automatically set the header to text/html if not set otherwise.

Enter the following for example:   
`res.send(<h1>This is the send method</h1>)`


[<< Back to Index ..](#index)


## Handling requests/routes with Express

### Add a default path of '/' to our first middleware

`app.use('/', (req, res, next) => {...}`

You must remember to order your middleware blocks correctly as thiese are ran from top to bottom, so seeing as '/' is the start of every page - keep this one to the end so all others are checked first.

Assignment (My submission):

```
const express = require('express');

const app = express();

app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use('/', (req, res, next) => {
    console.log("Im First - im here to demonstrate that i will always run - then i use next to pass the request on...");
    next();
});

app.use('/next-page', (req, res) => {
    console.log("Im the next-page middleware - i must execute before the request gets to the '/' middleware ");
    res.send('<h1>This is the "next-page" page</h1>');
});

app.use('/', (req, res) => {
    console.log("Im the '/' Middleware - im only executed if im reached");
    res.send('<h1>This is the "/" Page</h1>');
});

app.listen(3000);
```

[<< Back to Index ..](#index)


### How to add a form and extract data

+ Add a new page/route called add-product:
```
app.use('/add-product', (req, res, next) => {
    console.log("Im the add-product page");
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button>Submit</button></form>');
});
```
+ So in the /product route we want to get the body, but trying to console.log it gives us undefined:

```
app.use('/product', (req, res, next) => {
    console.log(req.body);
    // >> undefined
});
```
+   By default, request gives us the body - but it does not try to parse the information in the body. To do this we will use another 3rd party parser package.
+ So first lets install it: `npm install --save body-parser`
+ Then import it: const bodyParser = require('body-parser')

! *Note body-parser was included in express by default - then removed - then added again - but doing this will ensure you get it no matter its status.*

+ Now we setup another middleware to handle the parsing of the body - this should usually be done towards the top of the code - no matter where we actually need to parse the body:
```
app.use(bodyParser.urlencoded({extended: false}));
```
The urlencoded function is the function that is now available from body-parser package that parses all of our body and then passes a next so that our other middleware is executed. We will be advised to include the {extended: false} option, this is if it should be able to parse non default features.   

+ So now our middleware can give us the correct content, we also here change .use() to **.post()**, which only gets triggered with a POST request:
```
app.post('/product', (req, res, next) => {
    // get the body of the incoming request to extract what was sent
    // using bodyParser
    console.log(req.body);
    // >> 
    // redirect to / page
    res.redirect('/');
});
```

[<< Back to Index ..](#index)


# Handling routing with Express JS

This is known as outsourcing your routes - (modularization)

+ Create a folder called routes. (conventional name)
+ Inside this folder it is conventional to create files which handle the various routes in our project.
+ Create the following files - for a shop example: 
    + admin.js: would handle the admin page/management functionality.
    + shop.js: What the user will see.
+ Now in each of these files import express.
+ Now we can use the Router feature - `const router = express.Router();` add this to each new file.
+ Now we can export the router: `module.exports = router
+ Cut the routes from the server file, that we want to move to a specific file, and replace app with router.
+ So this :
```
app.use('/', (req, res) => {
    console.log("Im the '/' Middleware - im only executed if im reached");
    res.send('<h1>This is the "/" Page</h1>');
});
```
becomes this:

```
router.use('/', (req, res) => {
    console.log("Im the '/' Middleware - im only executed if im reached");
    res.send('<h1>This is the "/" Page</h1>');
});
```
Inside the router related file.

+ Now with that in place in the router rile, we can now import it into the app.js file: `const shopRoutes = require('./routes/admin');`
+ As this imported code is in fact valid middleware we can place it in our app.js file where we would have placed it: `app.use(shopRoutes);`

+ Remember to take care with the order these miidleware imports are called in the app.js file - get and post will save most problems and keep everything in order, but it is better to behave like every middleware is using a use();

[<< Back to Index ..](#index)


## Grouping outsourced apps under an app name

If all the paths in a route file are associated with a particular path, this path name can be ommitted from the route and added as a filter in the app.js file, when the middleware is being referenced.

Example:
```
router.get('/admin/add-product', (req, res, next) => {...});

router.post('/admin/product', (req, res, next) => {...});
```
These 2 files have same first segment, so we can remove `/admin`:
```
router.get('/add-product', (req, res, next) => {...});

router.post('/product', (req, res, next) => {...});
```
And add the `/admin` to the app.js file:
```
// outsourced routes
app.use('/admin', adminRoutes);
```

[<< Back to Index ..](#index)


## Adding a 404 page

If we change our default '/' page to a get - then unknown url paths will result in a cannot find page, so now we will setup a 404.   

Remember the middleware is read from top to bottom searching for a condition that fits - we can use this now, by placing this at the end of the pile of middleware:
```
app.use((req, res, next) => {
    res.status(404).send('Sorry but we cannot find that page<br><a href="/"><button>Back to safety..</button></a>')
});
```

[<< Back to Index ..](#index)


## Setting up Templates
For this project - 
+ create a folder called views.
+ Create a shop and an admin.html template.
+ Create the required markup

## Serving the templates
+ In app.js - import path: `const path = require('path');`
+ Then we send a file with the join() method.
+ Join will give us a path by concatinating the followin segments:    
    + **__dirname**: a global variable which holds the absolute path on our operating system to the folder its being called from.
    + **'..':** Tells the path to go up one level - out of the routes folder - then we will find views which is a sibling folder. by not using '../' we are not making any assumptions about operating syatems, so '..' is a cleaner way to do it.
    + **"views":** the name of the folder we want to get to
    + **shop.html:** or whatever the filename is

It is important not to use slashes here, path.join will construct the path in a way that works on widows or linux, as the path slashes are different on these - no one size fits all solution. If slashes were the same we could just construct it manually using join and slashes.

+   So the finished code should look like this:   
`res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));`

+ Also setup the 404 and serve from app.js
```
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
```

Notice that we do not need to go up a level here, as app.js is in the base of the project directory anyway.
But we can also do this a different way, by creating a helper function to get us the path directly.

[<< Back to Index ..](#index)


### Creating a path helper function

+ Create a folder for the function, call it utility
+ Create a file called path.js and add following:
```
const path = require('path');

/**
 * dirname returns the directory name of a path
 * 
 * 
 * Since v14.0.0, mainModule is deprecated.
 * So instead of:
 * 
 *      module.exports = path.dirname(process.mainModule.filename)
 * 
 *  Now, you can achieve * the same thing just by writing the following line:
 * 
 *      module.exports = path.dirname(require.main.filename);
 * 
 */
module.exports = path.dirname(require.main.filename);
```

Then import this into our routes:
```
// import
const findDir = require('../utility/path');

// add to response
res.sendFile(path.join(findDir, 'views', 'shop.html'));

```
NOTE: The import path will change depending on what the relative path is, so app.js imports from'./utility/path', instead of '../utility/path'

[<< Back to Index ..](#index)


## Serving up Static or Public files

### How to make our Css available

if you ever tried to enter localhost and then something like views, shop.html, that will not work because this is simply accepted by express and it tries to find a route that matches this. It tries to find it here in app.js basically and also of course in shop routes and so on. It doesn't find that route and therefore it doesn't give you access, you can't access the file system here and that is of course good and what you want.

But now We actually want to make an exception.

So For this we need a feature expressjs offers us, we need to be able to serve files statically and statically simply means not handled
by the express router or other middleware but instead directly forwarded to the file system. And for this, we register a new middleware with app use and this this one expressjs ships with called static.


+ Create main css file and following folder structure: `public/css/main.css`
+ Place your css in here.
+ inside app.js, enter: `app.use(express.static(path.join(__dirname, 'public')));`
This tells express to goto the public folder when it gets any link to find  .css or .js files, this says to look in the public folder, so our link to the css file within the html page should be from the public folder.
+ Inside our template add the link to the css file: `<link rel="stylesheet" href="/css/main.css">`

**This method can also be used for serving images too.**

[<< Back to Index ..](#index)


---
---
---
---
<br>
<br>
<br>

# Glossary of Terms

+ .use():   use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application. Parameters: path: It is the path for which the middleware function is being called. [See More...](http://expressjs.com/en/4x/api.html#app.use)
+ .get():   Basically the same as .use() - except it will only trigger for incomming **GET** requests.
+ .post():   Basically the same as .use() and get() - except it will only trigger for incomming **POST** requests.
+ next():   included in the function passed into use, then is called from within to pass the request to the next middleware
+ .send():   Used to send a response uses default header text/html - (`res.send(<h1>This is the send method</h1>)`) [More Info](https://github.com/expressjs/express/blob/508936853a6e311099c9985d4c11a4b1b8f6af07/lib/response.js#L107)   
---

[<< Back to Index ..](#index)


# Useful links:

[Express Installing](https://expressjs.com/en/starter/installing.html)

[Official Node.js Docs:](https://nodejs.org/en/docs/guides/)

[Full Node.js Reference (for all core modules):](https://nodejs.org/dist/latest/docs/api/)

[More about the Node.js Event Loop:](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

[Blocking and Non-Blocking Code:](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/)


[<< Back to Index ..](#index)

