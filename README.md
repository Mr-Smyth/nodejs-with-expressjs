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

## Middleware

This means that any incomming request is automatically funnelled through a bunch of functions called middleware. The request will pass through these middleware functions until you send a response.   
There can be multiple blocks of this and this allows for the plugable nature of expressjs - where we can easily add other 3rd party packages to give various functionalities.

**Request** => **Middleware**( (req, res, next) => { ... } ) => next() **Middleware**( (req, res, next) => { ... } ) => res.send() => **Response**.

## Setting up Middleware
+ In the server app, after we define the app object, but before we create the server - add the following line: `app.use((req, res, next) => {});`.

    + **use()**: defined by the express framework - allows us to add a new middleware function.
    + Takes in an array of request handlers.
    + Simplest way is to pass in a function that will be run for every incomming request.
    + Takes 3 args:
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


## Adding some response in the middleware

We can still use the setHeader and write, but express gives us .send();

+ send() allows us to directly insert html, and it will automatically set the header to text/html if not set otherwise.

Enter the following for example:   
`res.send(<h1>This is the send method</h1>)`


## Handling requests with Express
    
... 

# Glossary of Terms

+ .use():   use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application. Parameters: path: It is the path for which the middleware function is being called.
+ next():   included in the function passed into use, then is called from within to pass the request to the next middleware
+ .send():   Used to send a response uses default header text/html - (`res.send(<h1>This is the send method</h1>)`)
