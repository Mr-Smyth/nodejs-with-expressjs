# NodeJS and Express - Create a basic server and templates

# Index
- [Setup node express server](#setup-node-express-server)
- [Outsource our routes](#outsource-our-routes)
- [Create our views](#create-our-views)
  * [Creating a path helper function](#creating-a-path-helper-function)
- [Serving Static CSS files](#serving-static-css-files)
- [Detailed Walkthrough](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/docs/detailed-walkthrough.md)




# Setup node express server
+ Create app.js

+ npm Init

+ Install express: `npm install --save express`

+ install nodemon: `npm install nodemon --save-dev`

+ add startup script in package.json: `"start": "nodemon app.js"`

+ insert following into [app.py](#)

  ```
  const express = require('express');
  
  const app = express();
  
  app.get('/', (req, res, next) => {
      console.log('Welcome to Node Express!!');
      res.send('<html><body><h1>Welcome to Node Express!!</h1></body></html>')
  });
  
  app.listen(3000);
  ```

  

**Server complete**

[<< Back to Index..](#index)

---



# Outsource our routes

+ Create a routes folder

+ Create the route *file_name.js files (example: shop.js, admin.js, products.js etc..)

+ Import express: `const express = require('express');`

+ Create a router: `const router = express.Router();`

+ create the routes: 
  **Example:** (filename admin.js)

  ```
  router.get('/main', (req, res, next) => {
      res.send('<html><body><h1>Welcome to the Admin main page</h1></body></html>');
  });
  ```

+ export the router: `module.exports = router;`

+ In app.js add each route file with its correct path: `const homeRoutes = require('./routes/admin');`

+ Add the instance of the route: `app.use('/admin', adminRoutes);`

+ do this for all route files.

+ Goto app.js

+ Add a route for 404, include the status(404) - this should be at the bottom of the middleware pile. Example:

  ```
  app.use((req, res, next) => {
      res.status(404).send('Sorry but we cannot find that page<br><a href="/"><button>Back to safety..</button></a>')
  });
  ```

  

As we did in the example above, if a route file has routes with a common first segment in a url like /admin/main and /admin/sub,

then we can omit the /admin from the route file and add it instead inside where the instance is called in app.js.

**Outsourcing Routes complete**

[<< Back to Index..](#index)


---

# Create our views

+ Create a views folder
+ Add html files for the different views.



## Creating a path helper function

+ Create a folder for the function, call it utility

+ Create a file called path.js and add following:

  ```
  const path = require('path');
  module.exports = path.dirname(require.main.filename);
  ```

+ Goto each route file and import these:

  ```
  const path = require('path');
  
  // this is the helper that gets the path - im calling it findDir
  const findDir = require('../utility/path');
  ```

+ Then in the response of each route - serve the template. Example(filename:home.js):

  ```
  // setup our home route
  router.get('', (req, res, next) => {
      res.sendFile(path.join(findDir, 'views', 'home.html'));
  });
  ```

+ In the admin file also import **path** and **findDir** as we do above.

+ Then in our 404 middleware serve up the 404 template:

  ```
  app.use((req, res, next) => {
      res.status(404).sendFile(path.join(findDir, 'views', '404.html'));
  });
  ```

So just make sure you have imported path and findDir in all route files and app.py



**Templates are now served**

[<< Back to Index..](#index)


---

# Serving Static CSS files

- Create main css file and following folder structure: `public/css/main.css`
- Place your css in here.
- inside app.js, enter: `app.use(express.static(path.join(__dirname, 'public')));` This tells express to goto the public folder when it gets any link to find .css or .js files, this says to look in the public folder, so our link to the css file within the html page should be from the public folder.
- Inside our template add the link to the css file: `<link rel="stylesheet" href="/css/main.css">`

**Static CSS Served**

[<< Back to Index..](#index)


---