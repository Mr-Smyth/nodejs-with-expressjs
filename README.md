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
`app.listen(3000`) [This shows you that express already does this for us.](https://github.com/expressjs/express/blob/508936853a6e311099c9985d4c11a4b1b8f6af07/lib/application.js#L616)   
+ This also means we do not have to import the http method either.

## Middleware

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



    
---
---
---
---   
<br>
<br>
<br>

# Glossary of Terms

+ .use():   use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application. Parameters: path: It is the path for which the middleware function is being called. [See More...](http://expressjs.com/en/4x/api.html#app.use)
+ next():   included in the function passed into use, then is called from within to pass the request to the next middleware
+ .send():   Used to send a response uses default header text/html - (`res.send(<h1>This is the send method</h1>)`) [More Info](https://github.com/expressjs/express/blob/508936853a6e311099c9985d4c11a4b1b8f6af07/lib/response.js#L107)


