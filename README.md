# nodejs-with-expressjs
Some examples and information on using Express JS with Node JS

# What is Express JS?

ExpressJs is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. It is by far the most popular(at time of writing) and therefore there are numerous 3rd party packages which can be pulled in for various applications.

## Alternatives to ExpressJS

+ Just stick with Vanilla Js
+ Adonis.js
+ Koa
+ Sailis.js

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

# Middleware

**middleware functions are executed sequentially - so the order matters**

This means that any incomming request is automatically funnelled through a bunch of functions called middleware. The request will pass through these middleware functions until you send a response.   
There can be multiple blocks of this and this allows for the plugable nature of expressjs - where we can easily add other 3rd party packages to give various functionalities.

**Request** => **Middleware**( (req, res, next) => { ... } ) => next() **Middleware**( (req, res, next) => { ... } ) => res.send() => **Response**.

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


## Favicon issue

Browsers will by default request /favicon.ico from the root of the hostname - to avoid this 2nd request add the following code at the top of the middleware pile:   
```
app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});
```

## Adding some response in the middleware

We can still use the setHeader and write, but express gives us .send();

+ send() allows us to directly insert html, and it will automatically set the header to text/html if not set otherwise.

Enter the following for example:   
`res.send(<h1>This is the send method</h1>)`


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

# Handling routing with Express JS

+ Create a folder called routes. (conventional name)
+ Inside this folder it is conventional to create files which handle the various routes in our project.
+ Create the following files - for a shop example: 
    + admin.js: would handle the admin page/management funtionality.
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


## Adding a 404 page

If we change our default '/' page to a get - then unknown url paths will result in a cannot find page, so now we will setup a 404.   

Remember the middleware is read from top to bottom searching for a condition that fits - we can use this now, by placing this at the end of the pile of middleware:
```
app.use((req, res, next) => {
    res.status(404).send('Sorry but we cannot find that page<br><a href="/"><button>Back to safety..</button></a>')
});
```

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


