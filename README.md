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

## Handling requests with Express