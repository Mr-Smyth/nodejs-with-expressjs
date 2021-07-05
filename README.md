# NodeJS and Express - Create a basic server and templates

# Index
- [Setup node express server](#setup-node-express-server)
- [Outsource our routes](#outsource-our-routes)
- [Create our views](#create-our-views)
  * [Creating a path helper function](#creating-a-path-helper-function)
- [Serving Static CSS files](#serving-static-css-files)
- [Detailed Walkthrough](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/docs/detailed-walkthrough.md)
- [Manage and render local data using Templates](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/docs/manage-and-render-local-data.md)
- [The Model View Controller](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/docs/MVC.md)
- [Setup shop functionality](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/docs/setup-shop-structure.md)
- [Databases](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/docs/databases.md)
- [Authentication](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/docs/authentication.md)
- [Env variables](#dotenv)
- [Emails](#emails)


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


## DotEnv

* `npm install dotenv --save`
* In the file where you need to access an env variable : `require('dotenv').config();`
* To use - example: `creatingBranchId: process.env.BRANCH_ID,` - BRANCH_ID being the variable in the env file

Example.env file:
```
USER='userdatahere$jskdjsfsjkdsbfdsfdsfsnj'
PASSWORD='dfsfdsnfdsfsbdsnfnsjkfhdkjnfs'
BRANCH_ID='fjdfksdffsfnjskfdsfnskjdfnsf

```

[<< Back to Index..](#index)

---

## Emails


### Setup

+ Setup a mailTrap account
+ install nodemailer: `npm install --save nodemailer`
+ import into auth.js: `const nodemailer = require('nodemailer');`
+ Get the setup for the transporter from the mailtrap site and paste it into auth.js:
```
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5f11b7883cab99",
    pass: "89d2b76e180136"
  }
});
```

Initiate an email from your code



### setup to send an email after Signing up:

+ Gotot the controller handling the signup (postSignup), and goto where we redirect back to the login page after successfull signup.

Example:

```
exports.postSignup = (req, res, next) => {

    // get form data - without validation
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    // check if user exists - try to find it
    User.findOne({email: email})
    .then(userDoc => {
        if (userDoc) {
            req.flash('signupError', 'Email exists already');
            return res.redirect('/signup');
        }
        
        // if we get here - we can go ahead and create a new user
        // create a hashed password - 12 represents an approved salt value
        return bcrypt.hash(password, 12)
        // then we have a hashed password - create the user
        .then(hashedPassword => {
            user = new User({username: username,
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            });
            // save it to mongo
            return user.save();
        })
        // then we have the result of the user creation

        *******************************************************************************
        *******************************************************************************
        EMAIL sent here - below
        *******************************************************************************
        .then(result => {
            res.redirect('/login');
            // send an email after signup - use transporter - it gives a promise so we return it
            return transport.sendMail({
                to: email,
                from: 'registration@node-shop.com',
                subject: 'Signup succeeded',
                html: '<h1>You signed up - well done</h1>'
            });
        })
        // catch any errors in email
        .catch(err => console.log(err));

    })
    .catch(err => console.log(err));
};
```

now view the inbox in mailtrap and see the email sent





[<< Back to Index..](#index)
 
 ---