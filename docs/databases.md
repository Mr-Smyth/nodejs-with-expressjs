# Databases

[Return to Readme](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/README.md)

# Index

- [Types of Databases](#types-of-databases)

- [SQL](#sql)
    + [Horizontal scaling](#horizontal-scaling)
    + [Vertical scaling](#vertical-scaling)
  ---
  
  * [The SQL setup with Node JS](#the-sql-setup-with-node-js)
    + [Installation](#installation)
    + [Connecting Node to the sql database](#connecting-node-to-the-sql-database)
      - [In database.js](#in-databasejs)
      - [In app.js](#in-appjs)
    + [Setup a Table Using Workbench](#setup-a-table-using-workbench)
    + [Node - Retrieve data using node with SQL commands](#node---retrieve-data-using-node-with-sql-commands)
    + [Using Models to interact with our data](#using-models-to-interact-with-our-data)
      - [Setting up fetchAll()](#setting-up-fetchall--)
        * [models](#models)
      - [controllers](#controllers)
      - [Setting up ability to add products](#setting-up-ability-to-add-products)
        * [models](#models-1)
        * [controllers](#controllers-1)
      - [Setting up ability to get product details for 1 particular product](#setting-up-ability-to-get-product-details-for-1-particular-product)
        * [models](#models-2)
        * [controllers](#controllers-2)
  
---
  
  * [Using Sequelize](#using-sequelize)
    
    + [Install sequelize](#install-sequelize)
    + [Using Sequelize](#using-sequelize-1)
      - [Setup - In Workbench](#setup---in-workbench)
      - [Setup - In database.js - for our connection](#setup---in-databasejs---for-our-connection)
      - [Setup sequelize - In models](#setup-sequelize---in-models)
      - [Setup sequelize - Create a product table in our database](#setup-sequelize---create-a-product-table-in-our-database)
      - [Using sequelize - creating a product using sequelize](#using-sequelize---creating-a-product-using-sequelize)
        * [Controllers - admin.js](#controllers---adminjs)
      - [Using sequelize - Finding and fetching Data](#using-sequelize---finding-and-fetching-data)
        * [controllers - shop](#controllers---shop)
        * [controllers](#controllers-3)
      - [Using sequelize - Updating Products](#using-sequelize---updating-products)
        * [In Controllers - admin.js](#in-controllers---adminjs)
        * [in Controllers - app.js](#in-controllers---appjs)
      - [Using Sequelize - Deleting Products](#using-sequelize---deleting-products)
        * [in controllers - admin.js](#in-controllers---adminjs)
    
---
    
    
    
  * [Setting up users with sequelize](#setting-up-users-with-sequelize)
    + [Creating associations/ relations](#creating-associations--relations)
      - [Create a sample user in app.js](#create-a-sample-user-in-appjs)
      - [Add a new product that has the user linked.](#add-a-new-product-that-has-the-user-linked)
      - [Fetching associated products](#fetching-associated-products)
    + [Setup the cart with sequelize](#setup-the-cart-with-sequelize)
      - [Relationships](#relationships)
      - [Creating a cart and fetching from cart](#creating-a-cart-and-fetching-from-cart)
      - [Posting Items to the cart](#posting-items-to-the-cart)
      - [Displaying the cart](#displaying-the-cart)
      - [Deleting a product from the cart](#deleting-a-product-from-the-cart)
    + [Orders](#orders)
      - [Setup the Order Model](#setup-the-order-model)
      - [In app.js](#in-appjs-1)
      - [Create our checkout button functionality](#create-our-checkout-button-functionality)
      - [Display our order on the orders page](#display-our-order-on-the-orders-page)

---
---

- [NoSql](#nosql)
  
    + [Horizontal scaling](#horizontal-scaling-1)
  + [Vertical scaling](#vertical-scaling-1)
  * [What is Mongo Db](#what-is-mongo-db)
    + [Manage relations in Mongo](#manage-relations-in-mongo)
  * [Setup MongoDb](#setup-mongodb)
    + [Initial setup - Cluster](#initial-setup---cluster)
    + [Setup User](#setup-user)
    + [IP Whitelist](#ip-whitelist)
    + [Connect to our mongoDb server from inside our NodeJs app](#connect-to-our-mongodb-server-from-inside-our-nodejs-app)
      - [In Mongo](#in-mongo)
      - [In Node - Install the MongoDb Driver](#in-node---install-the-mongodb-driver)
      - [Connect to the database](#connect-to-the-database)
  * [Implement MongoDb CRUD in node](#implement-mongodb-crud-in-node)
    + [Creating Products](#creating-products)
      - [Product model](#product-model)
      - [Routes - Admin.js file](#routes---adminjs-file)
      - [Controllers - Admin Js file](#controllers---admin-js-file)
    + [Getting Products](#getting-products)
      - [In models](#in-models)
      - [In our shop Controllers - get Index and getProducts](#in-our-shop-controllers---get-index-and-getproducts)
    + [Compass](#compass)
      - [Setup Compass](#setup-compass)
      - [Using compass](#using-compass)
    + [Getting a single product - setting up product details functionality](#getting-a-single-product---setting-up-product-details-functionality)
      - [Routes](#routes)
      - [Views - in index and products pages](#views---in-index-and-products-pages)
      - [in models - product.js](#in-models---productjs)
      - [Controllers - shop.js / .getProductDetails](#controllers---shopjs---getproductdetails)
    + [Edit Products](#edit-products)
      - [Routes](#routes-1)
      - [In related views](#in-related-views)
      - [Models - product model - save method](#models---product-model---save-method)
      - [Controllers getEditProduct](#controllers-geteditproduct)
      - [Controllers postEditProduct](#controllers-posteditproduct)
    + [Delete Products](#delete-products)
      - [Routes](#routes-2)
      - [In related views](#in-related-views-1)
      - [models - product model](#models---product-model)
      - [Controllers - admin - postDeleteProduct](#controllers---admin---postdeleteproduct)
  * [Relations in MongoDb](#relations-in-mongodb)
    + [Setting up Users](#setting-up-users)
      - [User Models](#user-models)
      - [In Compass](#in-compass)
      - [In app.js](#in-appjs-2)
    + [Linking created products to current user](#linking-created-products-to-current-user)
    + [Setting up the cart - Adding Items to a cart](#setting-up-the-cart---adding-items-to-a-cart)
      - [In User Model](#in-user-model)
      - [In App.js - wire up user in the request](#in-appjs---wire-up-user-in-the-request)
      - [In shop.js controller - postToCart](#in-shopjs-controller---posttocart)
      - [In Views / Includes](#in-views---includes)
      - [In Routes - shop.js](#in-routes---shopjs)
      - [In Models - user.js - addToCart](#in-models---userjs---addtocart)
      - [Now we make the model work for updating and/or adding a new item to the cart](#now-we-make-the-model-work-for-updating-and-or-adding-a-new-item-to-the-cart)
    + [Setting up the cart - Displaying the cart](#setting-up-the-cart---displaying-the-cart)
      - [In Models - user.js](#in-models---userjs)
      - [In Controllers - shop.js - getCart](#in-controllers---shopjs---getcart)
      - [In routes - shop routes](#in-routes---shop-routes)
      - [In views - make sure you are displaying data correctly](#in-views---make-sure-you-are-displaying-data-correctly)
    + [Setting up the cart - Deleting items](#setting-up-the-cart---deleting-items)
      - [In Models - deleteOne](#in-models---deleteone)
      - [In controllers - shop.js - deleteCartItem](#in-controllers---shopjs---deletecartitem)
    + [Add Orders](#add-orders)
      - [In Models - user model - create addToOrder](#in-models---user-model---create-addtoorder)
      - [In Controllers - postOrder](#in-controllers---postorder)
    + [Get Orders](#get-orders)
      - [In Models - user model - create getOrder](#in-models---user-model---create-getorder)
      - [In Controllers - GetOrders](#in-controllers---getorders)
      - [In routes](#in-routes)
      - [In Views](#in-views)

---

- [Mongoose](#mongoose)
  * [Mongoose Setup](#mongoose-setup)
    + [Install mongoose](#install-mongoose)
    + [Connect Mongoose to our database](#connect-mongoose-to-our-database)
  * [Using Mongoose - Setting up a schema](#using-mongoose---setting-up-a-schema)
    + [Models - product.js](#models---productjs)
    + [Exporting the model](#exporting-the-model)
    + [Using the exported model - Setup postAddProduct controller in Admin](#using-the-exported-model---setup-postaddproduct-controller-in-admin)
  * [Fetching products to display on page - using Mongoose](#fetching-products-to-display-on-page---using-mongoose)
    + [In Controllers - Shop.js - getProducts](#in-controllers---shopjs---getproducts)
    + [In Controllers - Shop.js - getIndex](#in-controllers---shopjs---getindex)
  * [Fetching a single product - for product details - using Mongoose](#fetching-a-single-product---for-product-details---using-mongoose)
    + [In controllers - the getProductDetails](#in-controllers---the-getproductdetails)
  * [Edit product page - using Mongoose](#edit-product-page---using-mongoose)
    + [In Admin controller - get products](#in-admin-controller---get-products)
    + [In Admin controller - getEditProduct](#in-admin-controller---geteditproduct)
    + [In Controllers - postGetEditProduct()](#in-controllers---postgeteditproduct--)
  * [Delete Products](#delete-products)
    + [In controllers - postDeleteProduct](#in-controllers---postdeleteproduct)
  * [Setting up a User model/Schema - using Mongoose](#setting-up-a-user-model-schema---using-mongoose)
    + [In Models - In user.js](#in-models---in-userjs)
    + [In app.js](#in-appjs)
  * [Setting up a relationship between user and product - using Mongoose](#setting-up-a-relationship-between-user-and-product---using-mongoose)
    + [In models - product schema](#in-models---product-schema)
    + [In Controllers - admin - addProduct controller](#in-controllers---admin---addproduct-controller)
  * [Side note - populate and select](#side-note---populate-and-select)
    + [Populate()](#populate--)
    + [Select()](#select--)
  * [The Cart - using Mongoose](#the-cart---using-mongoose)
    + [In Models - User model](#in-models---user-model)
    + [In controllers - shop - postToCart](#in-controllers---shop---posttocart)
  * [Get the Cart - using Mongoose](#get-the-cart---using-mongoose)
    + [Controllers - getCart()](#controllers---getcart--)
  * [Delete item from cart using Mongoose](#delete-item-from-cart-using-mongoose)
    + [Models - User - deleteOne](#models---user---deleteone)
    + [Controllers - shop deleteCartItem](#controllers---shop-deletecartitem)
  * [Order - with mongoose](#order---with-mongoose)
    + [Models - order.js](#models---orderjs)
    + [In Controllers - shop.js - postOrder](#in-controllers---shopjs---postorder)
  * [Clearing the cart - Using Mongoose](#clearing-the-cart---using-mongoose)
    + [in Models - user.js - add a clearCart method](#in-models---userjs---add-a-clearcart-method)
    + [In controllers - shop - postOrder](#in-controllers---shop---postorder)
  * [Get the Orders page - Using Mongoose](#get-the-orders-page---using-mongoose)
    + [In Routes - Shop - orders.ejs](#in-routes---shop---ordersejs)

---
---

  
- [Future Improvements](#future-improvements)

- [Resources](#resources)






# Types of Databases

+   SQL

+   NoSQL

# SQL



**Example: MySQL.** 

+ Uses tables.
+ Tables contain fields which you can think of as headers for your data
+ Requires a schema. We must pre define our schema before we add data to a sql database, and all data must strictly fit the schema.
+ Can have relations:
  + one to one
  + one to many
  + many to many
+ Uses queries to interact with the database. Example: `SELECT * FROM users WHERE age > 28` - this selects all users in the users table where the age is greater than 28.



### Horizontal scaling

Means adding more servers, and composing code to spread and read data across these new servers, so in effect is not limited

+ SQL makes horizontal scaling almost impossible, due to the complexities of sharing a single database with relationships across multiple servers.

### Vertical scaling

Means Upgrading existing hardware. So in effect this method is limited, only so much cpu power you can fit into a machine.

+ Vertical scaling is very possible with SQL

[<< Back to Index](#index)

## The SQL setup with Node JS

All previous code in this node project written up to this point, and which used JSON to store data, is now in the Archive folder under using JSON

### Installation

MySQL is free for the basic version and is what we will use

+ Goto mysql.com
+ Click on downloads
+ Select the  [[MySQL Community (GPL) Downloads ??](https://dev.mysql.com/downloads/)](https://dev.mysql.com/downloads/)

---

**For mac and linux:**

+ We will need the mySQL community server and the mySQL Workbench.
+ Firstly select the mySQL community server

+ Select system
+ Download
+ Run installer
+ At introduction - click continue
+ At Licence - click agree.
+ You can use default location - unless you plan otherwise.
+ On Installation type - click Customize 
  + Make sure correct items are ticked.
  + Click install

+ Once Installation is done, a configuration will start automatically.
+ Make sure you choose the legacy password authentication, as at time of writing is perfectly fine, and the newer version is simply not supported by the Node SQL Package we will use here.
+ Now return to the MySQL downloads and install mySQL Workbench.
+ Make sure both sql server and workbench are installed and running by starting the workbench and making sure a local instance is running

***For mac and linux - END***

---

+ On windows you can use the combined installer - MySQL on windows (Installer & Tools).
+ Select operating system
+ Download and open installer
+ In Choose setup type - select custom
+ In select products interface you can select the server and the workbench from available products and move them to the right window under products to be installed
+ click next 
+ click next again
+ Click execute to install
+ Once Installation is done, a configuration will start automatically.
+ Make sure you choose the legacy password authentication, as at time of writing is perfectly fine, and the newer version is simply not supported by the Node SQL Package we will use here.
+ Make sure both sql server and workbench are installed and running by starting the workbench and making sure a local instance is running
+ Open workbench and select the server.
+ In the schema window on the left, right click and create new server
+ give it a name - in this case node-complete
+ Click apply in bottom right - this will create a new database
+ Database is now ready to interact with via node.



### Connecting Node to the sql database

+ Install mysql2 using --save as it is a dependency for any project: `npm install --save mysql2`
+ This allows us to **write sql code and interact with sql from Node**
+ In the utility folder create a new js file called database.js - for example

#### In database.js

+ Now create the code that will allow us to connect to the sql database, this will give us a connection object that will allow us to run queries. You can setup a connection that you manually must open and close, but this is inefficient, a better way is to create something known as a pool. Pools allow us to reach out to the pool for a new connection whenever we need one, when finished the connection will be handed back to the pool. The pool will then finish when the application is shut down.

  ```
  const mysql = require('mysql2');
  
  // create a pool for connecting
  const pool = mysql.createPool();
  ```

+ We need to include some options:

  + Define a host: `host: localhost;` - the host here is localhost because we are running on our local machine

  + Define a user: `user: root` - by default the user should be root

  + Define a database, as above 2 options give us access to the server, which could have multiple databases: `database: node-complete` - this is what we setup in the mysql workbench schema section.

  + Define the root password which you setup in the mysql setup configuration: `password: <password_here>`.

    ```
    const pool = mysql.createPool(
        {
            host: 'localhost',
            user: 'root',
            database: 'node-complete',
            password: '############'
        }
    );
    ```

+ Now export the pool export the pool - export it with promise, allowing us to use promises because these connections can handle Asynchronous code. This is better than using callbacks.: `module.exports = pool.promise();`

#### In app.js

For test purposes we can import the database connection pool

+ `const db = require('./utility/database');`

[<< Back to Index](#index)



### Setup a Table Using Workbench

in Mysql Workbench - Setup some dummy data:



+ Firstly we will go back to our mysql workbench and add something

+ Right click on Tables and select create table

+ Give the table the name of `products`

+ Now there is a table design page and we can define the fields we will use in our table by clicking on them.

+ So the first field we will give a column name of id

+ Datatype can be INT - as id will be a number.

+ Option (tick boxes) :

  + PK = means the table can be identified by the pk and make this field the primary key
  + NN = means contents must not be null
  + UQ = means contents must be unique
  + BN = should hold binary data
  + UN = Unsigned - tick if the field holds no negative values
  + ZF = means is it its zero fill
  + AI = means is it auto incrementing
  + G = 

+ Enter the following fields with the settings shown:

  + column: id, Datatype:INT, options: PK, NN, UQ, UN, AI
  + column: title , Datatype:VARCHAR(255), options: NN
  + column:price , Datatype:DOUBLE, options: NN - double is for the 2 decimal places.
  + column:description , Datatype:TEXT, options: NN
  + column:imageUrl , Datatype:VARCHAR(255), options: NN

+ Now click apply in bottom right

+ It then shows the sql statement it will execute, this code could be executed in node, and it would create the table.

  ```
  CREATE TABLE `node-complete`.`products` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` TEXT NOT NULL,
    `imageUrl` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  ```

  

+ Click apply

+ Click Finish

+ Now double click on Tables in the left Navigator - and we will see the new table.

+ If we hover over it we have 3 icons on the right of it - 2nd is settings and the 3rd allows adding of data - click the 3rd option

+ Add a dummy product - then save and apply - the id will be automatically added when applied if you do not enter it.

  

### Node - Retrieve data using node with SQL commands

.then and .catch are functions we can chain onto the result of the execute call, and they well act on whatever the response is. That response is known as a promise.

A promise is a basic js object that allows us to work with Asynchronous code. It is an alternative to using callbacks and allows the writing of more structured code.

**For example**: this: `db.execute('SELECT * FROM products', cb => {.... some code here});` includes a nested anonymous function as a callback.   

But instead we can use a .then() function block, which will then get the anonymous function to execute. So instead it would look like this: 

```
// test sql database query
db.execute('SELECT * FROM products')
// then execute an anonymous function
.then(() => {})
// this executes in case of an error
.catch(err => {
    console.log(err);
});
```

which is much more readable.

+ In app.js - for testing purposes

+ Add the above query with .then and catch blocks:

+ We can give a name to the argument received by the then function, we will call it result for now.

+ We can then console.log the result:

  ```
  .then(result => {
      console.log(result);
  })
  ```

+ What we get back is a nested array, with the first part being our data and the 2nd nested array being some meta data, so result[0] is what we want



So now this :

```
// test sql database query
db.execute('SELECT * FROM products')
// then execute an anonymous function
.then(result => {
    console.log(result[0]);
})
// this executes in case of an error
.catch(err => {
    console.log(err);
});
```



gives us this in the console:

```
[
  BinaryRow {
    id: 1,
    title: 'Databases for Dummies',
    price: 26.99,
    description: 'A complete guide to a fool starting on databases',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoDXr4is7-bVjWtE-TI4q-l0jHX0SPN4_4Uw&usqp=CAU'
  }
]
```



[<< Back to Index](#index)



### Using Models to interact with our data

base model code:

```
// get the database pool
const db = require('../utility/database');

// get cart model
const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        // create our constructor properties
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {}

    static fetchAll() {}

    static fetchOne(id) {}

    static deleteOne(id) {}
```



#### Setting up fetchAll()

##### models

+ In the product model, inside the fetchAll method - return a promise of a query to select all products inside the database.

  ```
  static fetchAll() {
      // return the promise so we can use it somewhere else.
      return db.execute('SELECT * FROM products')
  }
  ```

#### controllers

+ In any of the controllers in which we call all products, instead of passing in a function as a callback, as we did when using a json file for a db.

+ Instead, here we can add our .then and .catch

  ```
  Product.fetchAll()
  .then(response => {
  	res.render('shop/index', {
      products: response[0],
      pageTitle: 'Home page',
      path :'/index',
      });
  })
  .catch(err => {
  	console.log(err)
  });
  
  ```

+ But a nicer way to do this is using destructuring - we know the response is a 2 part nested array containing the first part - our data and the 2nd part - metaData:

  ```
  exports.getIndex = (req, res, next) => {
      Product.fetchAll()
      .then(([rows, fieldData]) => {
          res.render('shop/index', {
              products: rows,
              pageTitle: 'Home page',
              path :'/index',
          });
      })
      .catch(err => {
          console.log(err)
      });
  };
  ```

+ Repeat this for any of the controllers needing to fetch all products.

[<< Back to Index](#index)



#### Setting up ability to add products

##### models

+ Go to the save method in the product method.

+ We need this to reach out to the db and save the data 

+ We must define the field names to match the database, followed by the values.

+ To avoid sql injection attack - use ? - followed by an array containing the data we want to inject into the database - the data pattern must match the ?'s:

  ```
  return db.execute(
          'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
          [this.title, this.price, this.imageUrl, this.description]
          );
  ```

+ make sure to return this, as we are returning the promise to execute this.

##### controllers

+ In our postAddProduct page we can now call our save method which will create the product.

+ We add .then code to perform the redirecting after the inserting of new products

  ```
  exports.postAddProduct = (req, res, next) => {
      // push the returned data to the products array
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description = req.body.description;
      const product = new Product(null, title, imageUrl, price, description);
      product.save().then(() => {
          res.redirect('/');
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

  

[<< Back to Index](



#### Setting up ability to get product details for 1 particular product

##### models

+ Goto the fetchOne method
+ Here execute a query to get the item whose id is passed in.
+ `return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);`

##### controllers

+ In the controller for getProductDetails, we will use destructuring with .then.catch to render the data.

+ We only need product, so we dont need to bother taking in the meta data.

+ `.then(([product]) => {` will retrieve an array with the product object inside.

+ Because the template is expecting an object in this case we need to render element 0 of this array, so we are just sending the object: `product: product[0]`

+ finished working controller:

  ```
  exports.getProductDetails = (req, res, next) => {
      // we can access params in the req using express params object
      // this allows us to get productID which is the name we choose in the routes
      const prodId = req.params.productId;
      
      // call the static method to find one product
      Product.fetchOne(prodId)
      
      // use destructuring to get the data
      .then(([product]) => {
          res.render('shop/product-details', {
              product: product[0],
              pageTitle: product.title,
              path: '/product-details'
          });
      })
      .catch(err => {
          console.log(err)
      });
  };
  ```




Code relating to this section can be found in the Archive under - [**node using sql queries**](https://github.com/Mr-Smyth/nodejs-with-expressjs/tree/main/archive/node%20using%20sql%20queries)

[<< Back to Index](#index)



## Using Sequelize

<u>**Sequelize is an ORM - Object Relational Mapping Library**</u>

Sequelize lets us write and concentrate on js code and objects, and it handles the SQL queries. it does all the heavy lifting, all the SQL code behind the scenes for us and maps it into JavaScript objects with convenience methods which we can call to execute that behind the scenes SQL code so that we never have to write SQL code on our own.

### Install sequelize

**<u>Sequelize requires having mysql2 already installed</u>**

+ `npm install --save sequelize`

### Using Sequelize

#### Setup - In Workbench

+ Go into workbench - node-complete database and drop the products table - as we want sequelize to manage the tables now.

#### Setup - In database.js - for our connection

+ We use sequelize to create a new instance and pass in (database name, username, password, {options})

  ```
  // This gives us a constructor called Sequelize
  const Sequelize = require('sequelize');
  
  // create a new instance and pass in (database name, username, password, {options})
  const sequelize = new Sequelize('node-complete', 'root', 'Birgu@2011', {dialect: 'mysql', 'host': 'localhost'});
  
  module.exports = sequelize;
  ```

#### Setup sequelize - In models

+ We create a product model, by using sequelize.define.

+ This takes in the name of the model in lowercase

+ It also takes in an object of the structure of our model/database.

  ```
  // This gives us a constructor called Sequelize
  const Sequelize = require('sequelize');
  
  const sequelize = require('../utility/database');
  
  // define a model - managed by sequelize
  // define takes (model name in lowercase, {define the structure - the fields our model should have})
  const product = sequelize.define('product', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      // define the title using shorthand, to only set the type (example)
      title: Sequelize.STRING,
      price: {
          type: Sequelize.DOUBLE,
          allowNull: false
      },
      imageUrl: {
          type: Sequelize.STRING,
          allowNull: false
      },
      description: {
          type: Sequelize.STRING,
          allowNull: false
      }
  });
  
  module.exports = Product;
  ```

  



#### Setup sequelize - Create a product table in our database

+ In app.js

+ here we need to make sure that all our models are transferred to tables, if a table already exists - we dont want to overwrite them - although this can be done. If a table does not exist we want it created.

+ make sure we have sequelize object : `const sequelize = require('./utility/database');`

+ Then near the bottom of the file use the sync method - this looks at all the models we defined, and creates tables for them, and also any relations if they are setup: 

+ We use .then to listen to the result of sync and we can actually start our server from inside this 

  ```
  sequelize.sync()
  .then(response => {
      console.log(response); // optional to view response
      app.listen(3000);
  })
  .catch(err => {
      console.log(err);
  });
  ```

+ Running the above will log out what happens - and it shows that each time the server is started the product model table is checked for and if not present - it is created.

+ [<< Back to Index](#index)



#### Using sequelize - creating a product using sequelize

##### Controllers - admin.js

+ goto the postAddProduct controller

+ We will use the product model here with the create method. create both creates a new object based in the model and immediately stores it. build on the other hand - is another option, except it creates a js object, but does not store it in the db

+ create takes an object containing the fields and values:

  ```
  exports.postAddProduct = (req, res, next) => {
      // push the returned data into an object inside create()
      Product.create({
          title:  req.body.title,
          imageUrl:  req.body.imageUrl,
          price:  req.body.price,
          description:  req.body.description,
      })
      .then(response => {
          console.log(response);
          res.redirect('/admin/add-product');
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

[<< Back to Index](#index)



####  Using sequelize - Finding and fetching Data

**<u>Note</u>** 

With Sequelize v5, `findById()` was replaced by `findByPk()`.

##### controllers - shop

We want to get all our products for the index page and the products page

+ goto getIndex controller

+ Use the findAll() method - which will retrieve all data - it can take options where you could use WHERE - to filter the data we receive - but in this case we just want all the data.

  ```
  exports.getIndex = (req, res, next) => {
      Product.findAll()
      // we should then have our products
      .then(products => {
          res.render('shop/index', {
              products: products,
              pageTitle: 'Home page',
              path :'/index',
          });
      })
      .catch(err => {
          console.log(err)
      });
  };
  ```



**To find just one product - as you do for finding a products details we have 2 main options : `findByPk()`** & **findAll({})**

##### controllers

+ Goto the getProductDetails controller.

+ Both options A and B are shown below - option b returns an array as there could be more than 1 result, thats why in this case we use index 0 - as we know there is only 1 match for an id.

  ```
  exports.getProductDetails = (req, res, next) => {
      // we can access params in the req using express params object
      // this allows us to get productID which is the name we choose in the routes
      const prodId = req.params.productId;
      
      // option A:
      // use the sequelize method findByPk() - it returns a single product
      Product.findByPk(prodId)
      .then(product => {
          res.render('shop/product-details', {
              product: product, 
              pageTitle: product.title,
              path: '/product-details'
          });
      })
      .catch(err => {
          console.log(err)
      });
  
  
      // option B:
      // use the findAll method - which will find all occurances - note where in lowercase
      Product.findAll({ where: {id: prodId } })
      .then(products => {
          res.render('shop/product-details', {
              product: products[1], 
              pageTitle: products[0].title,
              path: '/product-details'
          });
      })
      .catch(err => {
          console.log(err)
      });
  };
  ```

  

[<< Back to Index](#index)



####  Using sequelize - Updating Products

##### In Controllers - admin.js

+ goto the getEditProduct Controller.

+ use `Product.findByPk(prodId)` to get our product

  ```
  exports.getEditProduct = (req, res, next) => {
      // check quer param to see if param sent from template is true
      const editMode = req.query.edit;
      if (!(editMode === 'true')) {
          return res.redirect('/');
      }
  
      // now we need the product id that was passed in the url
      const prodId = req.params.productId;
      // call the static method to find one product - this passes the returned product into the template
      Product.findByPk(prodId)
      .then(product => {
          // add a check in case product does not exist
          if (!product) {
              return res.redirect('/');
              // could also pass an error in here
          }
          res.render('admin/edit-product', {
              pageTitle: 'Edit Product Page',
              path: '/admin/edit-product',
              editing: editMode,
              product: product
          });
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```



##### in Controllers - app.js

+ Goto the postEditProduct controller

+ Get the relevant fields from the request body

+ firstly we want to again get the product that we want to update using findByPk()

+ then once we have the product, we can update the fields - locally - to the values we pulled from the req body.

+ then we can return  product.save() which is a promise to save to the database

+ Outside this we can add a .then to console.log a success message

+ The one catch will handle errors for both .then blocks

  ```
  exports.postGetEditProduct = (req, res, next) => {
      //collect the edited product data from the request body
      const prodId = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedPrice = req.body.price;
      const updatedImageUrl = req.body.imageUrl;
      const updatedDescription = req.body.description;
      // get the product we want to update
      Product.findByPk(prodId)
      .then(product => {
          product.title = updatedTitle;
          product.price = updatedPrice;
          product.imageUrl = updatedImageUrl;
          product.description = updatedDescription;
          // now call save() on product and return the promise
          return product.save();
      })
      // handle the response to save()
      .then(result => {
          console.log(`"${result.title}" has been updated`);
          res.redirect('/admin/products');
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

  

[<< Back to Index](#index)



#### Using Sequelize - Deleting Products

##### in controllers - admin.js

+ Goto postDeleteProduct
+ Use use the destroy method



[<< Back to Index](#index)




## Setting up users with sequelize

+   Create a basic user model
    ```
    // require the sequelize constructor class
    const Sequelize = require('sequelize');
    
    // import our own sequelize object
    const sequelize = require('../utility/database');
    
    const user = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    module.exports = user;
    ```

[<< Back to Index](#index)



### Creating associations/ relations

+   a product can belong to many carts as each user can add the same product to their own carts- so its a one to many relationship
+   a product can belong to many orders as each user can add the same product to their own carts, therefore it will also be in their order- so its a one to many relationship
+   a user has only one shopping cart - so its a one to one relationship
+   a user can have multiple orders - so its a one to many relationship
+   a user technically could create a product on the system, and a user could create many products therfore a one to many

---

+   Import both models into the app.js file - we can now relate them
    ```
    // relate our models - CASCADE IT SO ANY PRODUCTS BELONGING TO A DELETED USER ARE ALSO DELETED
    Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE' });
    // THIS IS OPTIONAL - AND COULD ALSO BE USED INSTEAD OF ABOVE BELONGSTO, WE ARE ADDING IT HERE TO BE CLEAR ABOUT THE RELATIONSHIP
    User.hasMany(Product);
    ```
+    sequelize sync will not just create tables for our models but also define the relations in our database as we define them in the app.js file above.
+   Here a slight problem is that we already have a products table, and therefore it will not override it with the new information.
+   we can get around this in this case by using `{ force: true }` - inside the sync method call. This will force the overwriting and creating of the required new fields: `sequelize.sync({ force: true })`
+   Restart and in console we will get:
    ```
    Executing (default): DROP TABLE IF EXISTS `products`;
    Executing (default): DROP TABLE IF EXISTS `users`;
    Executing (default): DROP TABLE IF EXISTS `users`;
    Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
    Executing (default): SHOW INDEX FROM `users`
    Executing (default): DROP TABLE IF EXISTS `products`;
    Executing (default): CREATE TABLE IF NOT EXISTS `products` (`id` INTEGER NOT NULL auto_increment , `title` VARCHAR(255), `price` DOUBLE PRECISION NOT NULL, `imageUrl` VARCHAR(255) 
    NOT NULL, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
    Executing (default): SHOW INDEX FROM `products`
    ```

We now have the updated relational fields in the products table, and the new users table.

[<< Back to Index](#index)



#### Create a sample user in app.js

+   This is simply  to hardcode in a test user for our database.
```
sequelize.sync()
.then(() => {
    return User.findByPk(1);
})
.then(user => {
    if (!user) {
        return User.create({ username: 'Eamonn', email: 'eamonn@test.com'});
    }
    return user;
    // .then blocks always return a promise - so we know here we are returning a promise in either case
})
.then(user => {
    console.log(user);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});
```

Using npm start - which starts the server and runs the sequelize code within - basically the code in the snippit above, will create a default user now every time we run it - if no user is already present.   
What we need to do now is register a new middleware - middleware takes care of the requests, and we need to include the default user in the request

```	
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
```



[<< Back to Index](#index)



#### Add a new product that has the user linked.

+ This can be done quite simply by adding the id to the controller and continue to use the Product.create() method:

  ```
  Product.create({
          title:  req.body.title,
          imageUrl:  req.body.imageUrl,
          price:  req.body.price,
          description:  req.body.description,
          userId: req.user.id
      })
      .then(response => {
          console.log(response);
          res.redirect('/admin/products');
      })
      .catch(err => {
          console.log(err);
      });
  ```

+ Or we can use the fact we have set up an association of one to many and the functionality that now lives inside the user sequelize object - The .createProduct method. This method is created within the user object when we setup the user object in app.js.

  ```
  // push the returned data into an object inside req.user.createProduct()
      req.user.createProduct({
          title:  req.body.title,
          imageUrl:  req.body.imageUrl,
          price:  req.body.price,
          description:  req.body.description,
      })
      .then(response => {
          console.log(response);
          res.redirect('/admin/products');
      })
      .catch(err => {
          console.log(err);
      });
  ```




[<< Back to Index](#index)



#### Fetching associated products

We could set up the edit product functionality to only edit products that the logged in user has created

+ We can do this also by using the magic methods stored inside the user sequelize object we created above in app.js

+ So what was this:

  ```
  Product.findByPk(prodId)
      .then(product => {
          // add a check in case product does not exist
          if (!product) {
              return res.redirect('/');
              // could also pass an error in here
          }
          res.render('admin/edit-product', {
              pageTitle: 'Edit Product Page',
              path: '/admin/edit-product',
              editing: editMode,
              product: product
          });
      })
      .catch(err => {
          console.log(err);
      });
  ```

+ Becomes this:

  ```
      req.user.getProducts({ where: { id: prodId }})
      .then(products => {
          const product = products[0];
          // add a check in case product does not exist
          if (!product) {
              return res.redirect('/');
              // could also pass an error in here
          }
          res.render('admin/edit-product', {
              pageTitle: 'Edit Product Page',
              path: '/admin/edit-product',
              editing: editMode,
              product: product
          });
      })
      .catch(err => {
          console.log(err);
      });
  ```




[<< Back to Index](#index)



### Setup the cart with sequelize



#### Relationships

A cart should belong to a user, and a user should have only one cart

We will scrap our old cart model here, and start from scratch and create a couple of new models to handle cart

+ Create a model called cart - The cart table should hold the different carts for the different users - this will be called cart

+ We create another cart called cart-Items. This will hold the quantity of the product and the product. It will also hold a cart Id - which will reference which cart from the cart table it belongs. 

  ```
  // require the sequelize constructor class
  const Sequelize = require('sequelize');
  
  // import our own sequelize object
  const sequelize = require('../utility/database');
  
  const cart = sequelize.define('cart', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      }
  });
  
  module.exports = cart;
  ```

  and:

  ```
  // require the sequelize constructor class
  const Sequelize = require('sequelize');
  
  // import our own sequelize object
  const sequelize = require('../utility/database');
  
  const cartItem = sequelize.define('cartItem', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      quantity: Sequelize.INTEGER
  });
  
  module.exports = cartItem;
  ```

  

+ The cart ID and the Product Id will be auto added and managed by sequelize, by way of setting up the relationship between cart and products -  and we shall add this code into app.js:

  ```
  const Cart = require('./models/cart');
  const CartItem = require('./models/cart-item');
  .......
  .......
  .......
  
  // either of these 2 will add a user id to the cart
  User.hasOne(Cart);
  Cart.belongsTo(User);
  
  // this only works with an intermediary table which connects them - in this case that is the cart-items table.
  // so we will tell sequelize where these connections should be stored - in the CartItem model
  Cart.belongsToMany(Product, { where: { through: CartItem }});
  Product.belongsToMany(Cart, { where: { through: CartItem }});
  ```

+ We again need to restart the app, and force the rebuilding of our tables with `sequelize.sync({ force: true })` in our app.js file

[<< Back to Index](#index)



#### Creating a cart and fetching from cart

We now want to use the cart associated with my existing user to get all the products in it and render them to the screen.

+ Firstly we will need to create a cart for our default user. - this will eventually be done when new users are created - but for this purpose we are creating both the user and the cart when the app is started.

+ We will also check here to make sure the cart does not already exist, before creating it.

+ **We can use the so called magic methods - which are created within the user sequelize object, when we created the user within the app.js file. the magic methods are created in accordance with the relationships that we also create within app.js. So `User.hasOne(Cart);` or `Cart.belongsTo(User);` - gives us the user.createCart or getCart methods**

+ So in app.js - add the following.

  ```
  sequelize.sync()
  .then(() => {
      return User.findByPk(1);
  })
  .then(user => {
      if (!user) {
          return User.create({ username: 'Eamonn', email: 'eamonn@test.com'});
      }
      return user;
  })
  .then(user => {
  
      // need a nested block here to check for existing cart
      user.getCart()
      .then(cart => {
          // if there is a cart - return it
          if (cart) {
              return cart;
          }
          // otherwise create one
          return user.createCart();
      })
  })
  .then(cart => {
      app.listen(3000);
  })
  .catch(err => {
      console.log(err);
  });
  ```



+ Now goto the getCart controller

+ We will use another magic method getProducts this time to get all the products from the cart

  ```
  exports.getCart = (req, res, next) => {
      req.user.getCart()
      .then(cart => {
          // so here we grab the products using a magic method
          return cart.getProducts()
          .then(products => {
              res.render('shop/cart', {
                  pageTitle: 'Shopping Cart',
                  path :'/cart',
                  products: products
              });
          })
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```



[<< Back to Index](#index)



#### Posting Items to the cart

+ Here we need to firstly  get the products id that is being added to the cart

+ Then we check the cart to see if its already there 

+ If it is already there we add 1 to the quantity.

+ If it is not already in the cart then we get the product from products

+ Then we add it to the cart - Initial code:

  ```
  exports.postToCart = (req, res, next) => {
  
      // we want to make cart available in lower anonymous functions without passing it down
      let fetchedCart
  
      // retrieve product id from req
      const prodId = req.body.productId;
      req.user.getCart()
      .then(cart => {
          fetchedCart = cart;
          // first we need to check and see if the product is already in the cart
          // getProducts will return an array, but our where will make this an array of just one item
          return cart.getProducts({ where: { id: prodId }})
      })
      .then(products => {
          // check if we get anything
          let product;
          if (products.length > 0) {
              product = products[0];
          }
          let newQuantity = 1;
          if (product) {
              // if there is a product - we need to get the old qty and add new qty to it
              // we use another magic method here cartItem - see section on displaying cart in readme for more details
              const oldQuantity = product.cartItem.quantity;
              newQuantity = oldQuantity + 1;
  
              // call another magic method on our copy of cart - fetchedCart
              // we need to also tell sequelize that for our inbetween table we have some additional values that need to be stored
              // in this case the quantity
              return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
          }
          // ----------------------------------------------------------------------------------//
          // Now handle case where product does not already exist in the cart -
          return Product.findByPk(prodId)
          .then(product => {
              
              // add it to the cart
              return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
          })
          .catch(err => console.log(err));
      }).then(() => {
          res.redirect('/cart')
      })
      .catch(err => console.log(err));
  };
  ```

+ Refactored to slim down a bit:

  ```
  exports.postToCart = (req, res, next) => {
  
      // top lvl variables
      let fetchedCart
      let newQuantity = 1;
      const prodId = req.body.productId;
  
      // retrieve product id from req
      req.user.getCart()
      .then(cart => {
          fetchedCart = cart;
          return cart.getProducts({ where: { id: prodId }})
      })
      .then(products => {
          // check if we get anything
          let product;
          if (products.length > 0) {
              product = products[0];
          }
          // if product - increment quantity
          if (product) {
              const oldQuantity = product.cartItem.quantity;
              newQuantity = oldQuantity + 1;
              return product;
          }
          // Now handle case where product does not already exist in the cart
          return Product.findByPk(prodId);
      })
      .then(product => {
          // add it to the cart
          return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
      })
      .then(result => {
          res.redirect('/cart')
      })
      .catch(err => console.log(err));
  };
  ```

[<< Back to Index](#index)



#### Displaying the cart

- The products  is passed to the template as an object from the getCart controller

- In that controller we grab the products from the ids stored in the cart, so this gives us an object of product files.

- We can use this in the template to display name or price if we want to.

- However the quantity is not stored in the product but in the inbetween table - **cart-items**. But sequelize gives us another magic method to access this - `cartItem`

- cartItem - is named from what we called the model and it stores information about this in-between table and the entry that is related to this product there.

- ```
  <main>
      <% if (products.length > 0) { %>
          <h1>Your Cart Items: </h1>
          <ul class="cart__item-list">
              <% products.forEach(product => { %>
                  <li class="cart__item">
                      <h1><%= product.title %></h1>
                      
                      <!-- The quantity is not part of the cart - but it is part of the related cart-item
                      Sequelize gives us a way to access it using the cartItem key -->
                      <h1>(<%= product.cartItem.quantity %>)</h1>
                      <form action="/cart-delete-item" method="POST">
                          <input type="hidden" name="productId" value="<%= product.id %>">
                          <button class="btn danger" type="submit">Delete</button>
                      </form>
                  </li>
              <% }); %>
          </ul>
      <% } else { %>
          <h1>Shopping Cart - Empty!</h1>
      <% } %>
  </main>
  ```

[<< Back to Index](#index)



#### Deleting a product from the cart

+ get the product id of the item to be deleted

+ get the cart, but only the item whose id matches the product we want to delete

+ then call destroy on the product.cartItem method = `return product.cartItem.destroy();`

+ redirect to cart

  ```
  exports.deleteCartItem = (req, res, next) => {
      // get the product id from the request
      const prodId = req.body.productId;
  
      // get the cart for the user
      req.user.getCart()
      .then(cart => {
          return cart.getProducts({ where: { id: prodId } });
      })
      .then(products => {
          const product = products[0];
          return product.cartItem.destroy();
      })
      .then(result => {
          res.redirect('/cart');
      })
      .catch(err => console.log(err))
  };
  ```



[<< Back to Index](#index)



### Orders

We need to add a checkout button to the Cart - when this button is clicked - we want to clear out the cart and move it into orders. The order should be related to the products and a user. the first step will be to set up an order model.

#### Setup the Order Model

+ So an order is basically an in-between table between the user to which the order belongs and multiple products which belong to the order.

+ So just like with cart - where we used an in-between table called cart-item - with orders we will also create orderItem.

+ Now The order table is similar to the cart except that it would probably need user address and contact information, delivery info etc, and that can be all added to the model, but there is also another difference in relationships, a User can have many Orders, but an order can only have on User. so its a one to many relationship

+ So order.js will look like:

  ```
  // require the sequelize constructor class
  const Sequelize = require('sequelize');
  
  // import our own sequelize object
  const sequelize = require('../utility/database');
  
  const Order = sequelize.define('order', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      }
  });
  
  module.exports = Order;
  ```

+ And order-item.js will look like:

  ```
  // require the sequelize constructor class
  const Sequelize = require('sequelize');
  
  // import our own sequelize object
  const sequelize = require('../utility/database');
  
  const CartItem = sequelize.define('cartItem', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      quantity: Sequelize.INTEGER
  });
  
  module.exports = CartItem;
  ```

  [<< Back to Index](#index)

#### In app.js

+ Now we setup the relationships

+ Import the order models and set relationships as below:

  ```
  Order.belongsTo(User);
  User.hasMany(Order);
  
  Order.belongsToMany(Product, { through: OrderItem });
  Product.belongsToMany(Order, { through: OrderItem });
  ```

+ NOTE This example shows both examples, basically opposite statements of the same thing - either or both will work.



[<< Back to Index](#index)



#### Create our checkout button functionality

+ Create the checkout button in the cart.ejs template:

  ```
  <hr>
  <div class="centered">
  	<form action="/create-order" method="POST">
  		<button type="submit" class="btn">Proceed to Checkout</button>
  	</form>
  </div>
  ```

+ Now lets take the action from the form we created and setup the creating an order functionality

+ In Shop.js - Setup a new middleware called postOrder.

  This now needs to get all the cart items and move them into an Order.

+ So  get the cart

+ Then get the products in the cart

+ Once we have the products create an Order

+ Now we need to add all the products to the order.

+ Each product will require a special key to be understood by sequelize - so we can insert correct quantity. To do this we have to modify our products that we pass into addProducts using the map method. map runs on an array and will return an array with modified elements, so here we add a function into map to achieve this. The function adds a property to each product, which will contain the quantity gleaned from the `product.cartItem.quantity`

+ Once the products have been added to the order we also want them to be removed from the cart

  ```
  exports.postOrder = (req, res, next) => {
      let fetchedCart;
      // get all cart items
      req.user.getCart()
      .then(cart => {
          fetchedCart = cart;
          // now we have the cart - now get all the products
          return cart.getProducts()
      })
      .then(products => {
          // create an order
          return req.user.createOrder()
          .then(order => {
          
              // associate products to the order
              // each product will require a special key to be understood by sequelize - 
              // so we can insert correct quantity
              // to do this we have to modify our products that we pass into addProducts using the map
              // method
              // map runs on an array and will return an array with modified elements
              // we add a function into map to achieve this
              
              return order.addProducts(products.map(product => {
              
                  // we will add a property to the product, called exactly what we defined the OrderItem 
                  // model as - so in this case - 'orderItem'
                  // we give the property a js object
                  
                  product.orderItem = { quantity: product.cartItem.quantity}
  
                  // so now i have an array of products including the new quantity information we inserted
                  
                  return product;
              }));
          })
          .catch(err => console.log(err));
      })
      .then(result => {
          return fetchedCart.setProducts(null);
      })
      .then(result => {
          res.redirect('/orders');
      })
      .catch(err => console.log(err));
  };
  ```

+ In routes - Setup a new post route for the action in the form: 
  `router.post('/create-order', shopController.postOrder);`



[<< Back to Index](#index)



#### Display our order on the orders page

+ Goto getOrders

+ get the orders by using the magic method getOrders() - now because orders does not hold an orderItems key, we cannot access it from the returned orders data alone. So we need to pass an object into getOrders, where we say to include products, we call it products with an 's' - because in the product model and in app.js we define the model as product - and sequelize pluralizes this for us, therefore - 'products' - a concept known as eager loading - where we say when u get all the orders - please also get all the products also.

+ So enter the following: `req.user.getOrders({ include: ['products'] })` - this will give us back an array for orders which will include an array for the products of that order - this only works because we set up a relationship between orders and products in app.js

+ So our controller looks like:

  ```
  exports.getOrders = (req, res, next) => {
      req.user.getOrders({ include: ['products'] })
      .then(orders => {
          res.render('shop/orders', {
              pageTitle: 'Your Orders',
              path :'/orders',
              orders: orders
          });
      })
      .catch(err => console.log(err));
  };
  ```

+ And our Template looks like:

  ```
      <main>
          <% if(orders.length <= 0) {  %>
              <h1>Orders - No Orders as yet!</h1>
          <% } else { %>
              <% orders.forEach(order => {  %>
                  <!-- Every order will have an ID -->
                  <h1>Order Number: <%= order.id %></h1>
                  <!-- We can now loop through the products that we associated with the 
                  	 order in the controller -->
                  <ul>
                      <% order.products.forEach(product => { %>
                      <li><%= product.title %>: <%= product.quantity %>
                          <ul>
                              <li><%= product.description %></li>
                              <li><%= product.price %></li>
                          </ul>
                      </li>
                      <% }) %>
                  </ul>
              <% }); %>
          <% } %>
      </main>
  ```

  

This completes the lesson on Sequelize - see the official docs on sequelize for more detailed info on interacting with MySql db's [Resources - Below](#resources)

All code relating to this section can be found in the Archive under **[Sequelize](https://github.com/Mr-Smyth/nodejs-with-expressjs/tree/main/archive/sequelize)**

[<< Back to Index](#index)

---

---

---




# NoSql

**Example: Mongodb**

Generally we store data in documents, with no relationships or schema, just documents that work on their own.

+ Uses tables - but they are called collections.

+ Requires no schema.

+ Collections contain documents

+ No data relations - instead duplicate data, any relations such as used in circles must be fabricated.

  

### Horizontal scaling

Means adding more servers, and composing code to spread and read data across these new servers, so in effect is not limited

+ Horizontal scaling is possible with NoSql, but is still quite difficult.

### Vertical scaling

Means Upgrading existing hardware. So in effect this method is limited, only so much cpu power you can fit into a machine.

+ Vertical scaling is also very possible with NoSql

[<< Back to Index](#index)



## What is Mongo Db

+ Humongous - for large scale databases without schemas - allows for easier growth

+ A database uses multiple collections - example user collection, products collection etc...

+ A Collection houses data in multiple Documents - example Paul Doe with all his address data etc

+ A document can have any structure in the form of a **BSON** document - which is basically a **JSON** format.

+ Example JSON(BSON) Data Format:

  ```
  {
  	"name": "Eamonn",
  	"age": 45,
  	"address":
  		{
  			"city": "Monaghan"
  		},
  	"hobbies": [
  		{ "name": "Swimming" },
  		{ "name": "Astronomy" },
  		{ "name": "History" },
  	]
  }
  ```

### Manage relations in Mongo

+ This can be done by either referencing another document, by its id for example. So an order may have a users ID embedded inside the order, so we know who the order is for.
+ Another method can simply be to take the data you need from one document and embed it inside the document that you need it to be in. For example in an orders document - you may want to embed the full users details which the order relates to.
+ Examples where data duplication may not work is where you have something like a customers fav books db, where each user has an embedded list of fav books - here several users will have the same fav book and this leads to a lot of duplication, and if you needed to update the details of these books, they would need to be updated in products and in each user who has the book embedded. In this case it would be better to store the reference to the book, rather than the book itself, that way you only need to update the book in one place.

[<< Back to Index](#index)



## Setup MongoDb

### Initial setup - Cluster

+ You can either download and install MongoDB or just use it in the cloud (preferred) - **Atlas**
+ Go to mongodb.com and select cloud then select Atlas
+ Login or create a free account
+ Create a new project - if required and then go to clusters
+ Click to create a new cluster - a create cluster wizard will open - (A Cluster is, a cluster of servers that our Database will run on. Select Shared Cluster as it is the free option.)
+ Select AWS
+ Select Region - don???t select Ireland unless it says ???Free Tier Available??? as we don???t want to be paying for this project site. For now, select a North America Tier that says free. Normally though you would select the region closest to you
+ Select Cluster Tier - Select the tier that says free forever.
+ Select Cluster Name - Down at the bottom we can click on cluster name and give the cluster a name. 
+ Click create cluster.

### Setup User

+ Click on Database Access under the Security sub heading on left of screen.
+ In Scram Authentication, add a user name and password.
+ Make sure they have read and write privileges - as this is the user that node will use to access the database
+ Click Add User.

### IP Whitelist

Here we see all the ip addresses that are allowed to connect to the mongoDB Server.

+ Click on Add IP Address
+ Click on Add Current IP Address. - this will allow our local node app to acess the DB, when deploying on another server this servers ip address will need to be added.
+ Optionally, clicking allow access from anywhere does exactly that.

### Connect to our mongoDb server from inside our NodeJs app

#### In Mongo

+ From the Clusters page in Mongo DB
+ Click on Connect
+ Choose the "Connect your Application" option
+ Select Driver as Node.js and the version - in my case 3.6 or later

#### In Node - Install the MongoDb Driver

+ In the Terminal: `npm install --save mongodb` - This installs the draiver that lets us connect to mongoDB

#### Connect to the database

+ If following on from Sequelize - Goto app.js and remove any sequelize related code, relationships etc..

+ Create a database.js file in the utility folder

  ```
  // connect to Mongo db
  
  const mongodb = require('mongodb'); // gives us access to the mongo db package
  
  const MongoClient = mongodb.MongoClient; // the mongo client constructor
  
  // now connect to the database - copy in the url from the mongo connect settings
  // Make sure the correct username and password is included
  // this will return a promise.
  
  MongoClient.connect('mongodb+srv://AcmeUser:kje78rych@myfirstcluster.ugdke.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
      console.log('Connection Successful');
  })
  .catch(err => console.log(err));
  ```

+ As you will see in the example above we setup a client constructor, and call connect with the url provided from Mongo in the connect settings.

+ The url will need to contain the database user and password and also include a db name - this name will make mongo db to connect to the database with a matching name, and if it does not exist, mongo will create it once data is written to it.

+ We now need to connect to the database when we connect to our server. 

+ So we will wrap the above code which connects to Mongo, inside a method, which will provide us with a connection client or object. We can then call this from inside our app.js

+ The problem at this stage is that if we call this connection directly from,  say a model or anywhere that needs access to mongo - this will simply force a new connection for every action required - and this is not good practice. The best way to do this is to setup our connection so it is always on, and then have another `getDb` method that will return a connection to whatever piece of code requires it.

+ To do this - firstly we will add another variable and call it `_db` - the underscore describes this as an internally used variable.

+ Then when we get the result back which is our connection client, we can grab the data base from this object and assign this database to the `_db` variable.

+ So our connection method with our new getDb method will look like this:

  ```
  // connect to Mongo db
  
  const mongodb = require('mongodb'); // gives us access to the mongo db package
  
  const MongoClient = mongodb.MongoClient; // the mongo client constructor
  
  let _db;
  
  const uri = 'mongodb+srv://acmeUser:acmePassword@myfirstcluster.ugdke.mongodb.net/acmeDataBase?retryWrites=true&w=majority';
  
  // now connect to the database - copy in the url from the mongo connect settings
  // Make sure the correct username and password is included and database name if known
  // this will return a promise.
  
  // We will wrap this inside a method which we export
  const mongoConnect = callback => {
      MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(client => {
          console.log('Connection Successful');
          _db = client.db();
          callback();
      })
      .catch(err => {
          console.log(err);
          // throw the error - so it is thrown again when it fails
          throw err;
      }); 
  }
  
  // gets the database connection if it exists
  const getDb = () => {
      if (_db) {
          return _db;
      }
      throw ' No database found';
  }
  
  // export our methods seperately
  exports.mongoConnect = mongoConnect;
  exports.getDb = getDb;
  ```

+ Mongo will manage this behind the scenes using connection pooling - ensuring there are ample connections for the requirements.

+ Now in app.js - import this connection - `const mongoConnect = require('./utility/database').mongoConnect;`

+ Then run the server inside a successful db.

  ```
  mongoConnect(() => {
      app.listen(3000);
  });
  ```

+ If following on from a sequelize setup - you may need to comment out all routes in app.js as they are still relying on sequelize in the routes and models and controllers - just so we can make sure our mongoDb connection is up and working - also make sure your ip is whitelisted.

+ Run server to test, we should get a client object in the terminal.



[<< Back to Index](#index)



## Implement MongoDb CRUD in node

### Creating Products

#### Product model

+ Firstly we pull in our getDb connection method - `const getDb = require('../utility/database').getDb;`

+ The we create a product class, and include in the constructor the title, price, description and imageUrl.

+ Then create a save() method and grab the db and define our collection

+ On this collection we can execute modgo db operations - [see docs ](https://docs.mongodb.com/manual/crud/)

  + insertOne / insertMany - Inserts documents - insert many takes an array of js objects, insertOne just takes a single object.

+ We will use insertOne here to insert one product

  ```
  // grab our getDb connection from our database.js file
  const getDb = require('../utility/database').getDb;
  
  // our mongo db product model class
  class Product {
      constructor(title, price, description, imageUrl) {
          this.title = title;
          this.price = price;
          this.description = description;
          this.imageUrl = imageUrl;
      }
  
      save() {
          // now tell mongo what db we want to use - in this case the default from our connection in 
          // database.js
          const db = getDb();
          // now specify the collection in that db we want to use
          // select the insertOne operation
          // insert this - as this represents this instance
  
          // we will return this - so we can treat it overall as a promise in our controller
          return db.collection('products')
          .insertOne(this)
          .then(result => {
              console.log(result)
              
          })
          .catch(err => {
              console.log(err);
          });
      }
  }
  
  module.exports = Product;
  ```



#### Routes - Admin.js file

+ Initially comment out any pre-existing routes that are not required - if following on from sequelize

+ Add/leave a route for posting and getting the add product page

  

#### Controllers - Admin Js file

+ Add the following postAddProduct controller

+ The save method in the model returns a promise now, so we can deal with it in a .then block.

  ```
  // now handle the logic for the post from the form in add-products
  exports.postAddProduct = (req, res, next) => {
      // get form data
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description = req.body.description;
      const product = new Product(title, price, description, imageUrl);
      
      product.save()
      .then(response => {
          console.log(response);
          res.redirect('/admin/products');
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

  

[<< Back to Index](#index)

### Getting Products

#### In models

+ Add a static method here to retrieve our products - rem static methods can be called out side of an instance of a product - which is what we would need.

+ We use  .find here to get the products we need, we can use find to find a title of a book like this `.find({title: 'Gardening'})` - but if we want to find all we can just use `.find()`.

+ find does not immediately return a promise, instead it returns a cursor. A **Cursor** is an object provided by mongoDb which allows us to go through our elements step by stem. This is because a result of find could include thousands or even millions od results, and a mongoDb cursor does not actually return any products - but instead allows you to flip through them one at a time and use pagination for example. 

+ But if you know you only have a small number of results - it is possible to tack on `.toArray()` This tells mongo db to actually get all documents and turn them into an array.

  ```
  static fetchAll() {
          const db = getDb();
          return db.collection('products')
          .find()
          .toArray()
          .then(products => {
              console.log(products);
              return products;
          })
          .catch(err => {
              console.log(err);
          });
      }
  ```

  

#### In our shop Controllers - get Index and getProducts

+ Make sure the products model is imported: `const Product = require('../models/product');`

+ Here we simply need to create a call to our fetchAll static method

+ The return a response to the correct page

  ```
  exports.getIndex = (req, res, next) => {
      Product.fetchAll()
      // we should then have our products in an object
      .then(products => {
          res.render('shop/index', {
              products: products,
              pageTitle: 'Home page',
              path :'/index',
          });
      })
      .catch(err => {
          console.log(err)
      });
  };
  ```

  

  ```
  // Display our products controller
  exports.getProducts = (req, res, next) => {
      Product.fetchAll()
      // we should then have our products
      .then(products => {
          res.render('shop/product-list', {
              products: products,
              pageTitle: 'All Products',
              path :'/product-list',
          });
      })
      .catch(err => {
          console.log(err);
      });    
  };
  ```

+ Add the routes in app.js and in the routes file

+ app. js

  ```
  const shopRoutes = require('./routes/shop');
  app.use(shopRoutes);
  ```

+ In shop routes:

  ```
  // Landing page
  router.get('/', shopController.getIndex);
  
  // Product List page
  router.get('/product-list', shopController.getProducts);
  ```

+ These pages should now display any products in the Db.



[<< Back to Index](#index)



### Compass

#### Setup Compass

Compass is a free utility which gives us a GUI in which we can visualize our DB

+ Download and install/unzip it from here : https://www.mongodb.com/try/download/compass
+ Open
+ Go to new connection
+ Open MongoDb in browser and log in and go to clusters and click connect
+ Click "I have MongoDb Compass"
+ Copy the connection string - but make sure to include correct username and password.
+ Paste in the connection string to compass and click connect
+ You are now connected
+ Dont touch the admin or local databases - they belong to mongo and should not be touched.

#### Using compass

+ When you open Compass you can connect by inserting the string again or double clicking on the recent database option
+ Once open you should be able to see any added products, and edit / delete them.
+ We will only use it for viewing here - but see official docs for more info - : https://docs.mongodb.com/compass/master/



[<< Back to Index](#index)

### Getting a single product - setting up product details functionality

#### Routes

+ Make sure you have setup the correct route to handle this: 

  `router.get('/product-details/:productId', shopController.getProductDetails);`

#### Views - in index and products pages

+ Make sure when we get the product id we pass `._id` and not just id
+ This will be passed as a string from the template - so we will need to convert i in the model below

#### in models - product.js

+ Add a method called `fetchOne`

  ```
  static fetchOne(prodId) {
          const db = getDb();
          return db.collection('products')
          // need to compare like for like here so we need to use the mongodb method - ObjectId - 
          // _id is already an object id - so we need to convert prodId which is a string version of the _id we grab in the template
          .find({_id: new mongodb.ObjectId(prodId)})
          .next() // gets the next and final document in the cursor
          .then(product => {
              console.log(product);
              return product;
          })
          .catch(err => {
              console.log(err);
          });
      }
  ```

  

#### Controllers - shop.js / .getProductDetails

+ Use our static method in the products model to get our product

  ```
  exports.getProductDetails = (req, res, next) => {
      // we can access params in the req using express params object
      // this allows us to get productID which is the name we choose in the routes
      const prodId = req.params.productId;
      
      // use our static method from product model
      Product.fetchOne(prodId)
      .then(product => {
          res.render('shop/product-details', {
              product: product, 
              pageTitle: product.title,
              path: '/product-details'
          });
      })
      .catch(err => {
          console.log(err)
      });
  };
  ```

  

[<< Back to Index](#index)

### Edit Products

#### Routes

+ Make sure you have setup the correct route to handle this: 

  ```
  // Handles edit product page - takes in the product id in the url
  router.get('/edit-product/:productId', adminController.getEditProduct);
  
  // handle the post from the edit-product page
  router.post('/edit-product', adminController.postGetEditProduct);
  ```




#### In related views

+ Make sure when we get the product id we pass `._id` and not just id

#### Models - product model - save method

+ We need to add in an optional parameter to our constructor - `id`

+ This will be included when calling the constructor and if an id has a value - then we must be editing, so we can convert the id string into a mongoDb ObjectId - else we set id to null.

+ So we use this in the save method, and depending on the existence of `this._id` the dbOperation will either insert a new record or `"$set"` the record with the edited values.

  ```
  class Product {
      constructor(title, price, description, imageUrl, id) {
          this.title = title;
          this.price = price;
          this.description = description;
          this.imageUrl = imageUrl;
          // add a ternary here to set value to null if no id is passed
          this._id = id ? new mongodb.ObjectId(id): null;
      }
  
      save() {
          // now tell mongo what db we want to use - in this case the default from our 
          // connection in database.js
          const db = getDb();
          let dbOperation;
          // Now we want to check if _id already has value - if it does we are editing
          if (this._id) {
              dbOperation = db.collection('products').updateOne({ _id: this._id }, { $set: this })
          } else {
              dbOperation = db.collection('products').insertOne(this)
          }
  
          // we will return dbOperation - so we can treat it overall as a promise in our contoller
          return dbOperation
              .then(result => {
                  console.log(result)
              })
              .catch(err => {
                  console.log(err);
              });
      }
  }
  ```


[<< Back to Index](#index)

#### Controllers getEditProduct

+ Use our fetchOne method:

  ```
  exports.getEditProduct = (req, res, next) => {
      // check quer param to see if param sent from template is true
      const editMode = req.query.edit;
      if (!(editMode === 'true')) {
          return res.redirect('/');
      }
  
      // now we need the product id that was passed in the url
      const prodId = req.params.productId;
      
      // call the fetchOne method inside product model - returns a product
      Product.fetchOne(prodId)
      .then(product => {
          // add a check in case product does not exist
          if (!product) {
              return res.redirect('/');
              // could also pass an error in here
          }
          res.render('admin/edit-product', {
              pageTitle: 'Edit Product Page',
              path: '/admin/edit-product',
              editing: editMode,
              product: product
          });
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

#### Controllers postEditProduct

+ Get the edited values from the request body

+ We need to create a product, include the id and then call the save method

+ The save method will then check to see if an id is present, and because it is - it will update or $set these values into the document.

  ```
  exports.postGetEditProduct = (req, res, next) => {
      //collect the edited product data from the request body
      const prodId = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedPrice = req.body.price;
      const updatedImageUrl = req.body.imageUrl;
      const updatedDescription = req.body.description;
      
      // create a new product - make sure order matches the product constructor!
      const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, new mongodb.ObjectId(prodId));
      
      // save the product
      product.save()
      .then(result => {
          res.redirect('/admin/products');
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```


[<< Back to Index](#index)

### Delete Products

#### Routes

+ Make sure you have setup the correct route to handle this: 

  `router.post('/delete-product', adminController.postDeleteProduct);`

#### In related views

+ Make sure when we get the product id we pass `._id` and not just id

#### models - product model

+ Here we will create another static model to handle the delete functionality `deleteById()`

+ We will use the mongoDb `deleteOne` method

  ```
  static deleteById(prodId) {
          const db = getDb();
          return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
          .then(result => {
              console.log(' -------------------- Deleted');
          })
          .catch(err => {
              console.log(err);
          });
      }
  ```



#### Controllers - admin - postDeleteProduct

+ We can call our model method and pass the id of the item we want to delete

  ```
  exports.postDeleteProduct = (req, res, next) => {
      let prodId = req.body.productId;
      Product.deleteById(prodId)
      .then(() => {
          console.log(`Deleted - product`);
          return res.redirect('/admin/products');
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

  

**CRUD complete**



[<< Back to Index](#index)



## Relations in MongoDb

### Setting up Users

#### User Models

+ Setup a basic user model:

  ```
  const mongodb = require('mongodb');
  
  // grab our getDb connection from our database.js file
  const getDb = require('../utility/database').getDb;
  
  class User {
      constructor(username, email) {
          this.username = username;
          this.email = email;
      }
  
      save() {
          const db = getDb();
          return db.collection('users').insertOne(this);
      }
  
      static findById(userId) {
          const db = getDb();
          return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
      }
  }
  
  module.exports = User;
  ```

  

#### In Compass

+ For this purpose, for now set up a new users collection and add a user with name and email field
+ Grab the id of this user
+ We will manually add this to the request object in app.js



#### In app.js

+ Add the id of the created user to the request object

  ```
  app.use((req, res, next) => {
      User.findById('608dc6a5ad17a5ed4fc30d4d')
      .then(user => {
          req.user = user;
          next();
      })
      .catch(err => {
          console.log(err);
      });
  });
  ```



[<< Back to Index](#index)



### Linking created products to current user

+ In the products model, we can now take in the user._id

+ Add the user id to the product model constructor:

  ```
  class Product {
      constructor(title, price, description, imageUrl, id, userId) {
          this.title = title;
          this.price = price;
          this.description = description;
          this.imageUrl = imageUrl;
          // add a ternary here to set value to null if no id is passed
          this._id = id ? new mongodb.ObjectId(id): null;
          this._id = userId;
  ```

+ Next we now must add to our add product controller. First we must add null to represent the product id which would not exist if creating a new product. Then add in the user id from the request body.

  ```
  exports.postAddProduct = (req, res, next) => {
      // get form data
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description = req.body.description;
      const product = new Product(title, price, description, imageUrl, null, req.user._id);
      
      product.save()
  ```

  

After running this program and adding a new product - you should have a product with the added user id field.



[<< Back to Index](#index)



### Setting up the cart - Adding Items to a cart

For every user we have a cart - the cart will hold the products for that user - here we will be using embedded documents

#### In User Model

+ We first update the constructor to take in a cart and a user id - we want to set this up in app.js so we can create a proper user object containing a cart

+ Add an addToCart method

+ This takes in the product being added and for now will just embed a cart with this product inside the user object - we will have to add functionality on dealing with existing products

  ```
  addToCart(product) {
          const db = getDb();
  
          // we need an object we can insert
          // Using spread - an elegant way to make updatedCart equal to the product info with an 
          // added quantity info
          const updatedCart = { items: [{...product, quantity: 1}] }
          // now we want to store it in the users collection under current user
          return db
          .collection('users')
          .updateOne(
              { _id: new mongodb.ObjectId(this._id) },
              { $set: {cart: updatedCart} }
          );
      }
  ```
  
  

#### In App.js - wire up user in the request

We want the user request object to contain more than simply the data contained inside the database, we want the methods from the model. This means that we can call the user in the request and access the users cart which will have been created using the code below

+ So in the req object we will insert user as an instance of the model so we can utilize it elsewhere:

  ```
  app.use((req, res, next) => {
      User.findById('608dc6a5ad17a5ed4fc30d4d')
      .then(user => {
          // we want to make req.user an instance of User - so we can use all the methods
          req.user = new User(user.username, user.email, user.cart, user.userId);
          next();
      })
      .catch(err => {
          console.log(err);
      });
  });
  ```

+ Now we will use this in the controller

#### In shop.js controller - postToCart

+ Grab the product using the product id we get from the request body
+ Then when we have the product we call the addToCart method from the model, but we can do this by calling outr instance of the user - which now contains all those methods and ensures we add it to the current and correct user.

#### In Views / Includes

+ If using an includes snippet - check that you are exporting the correct id `<input type="hidden" name="productId" value="<%= product._id %>">`

#### In Routes - shop.js

+ Make sure post route for cart is enabled: `router.post('/cart', shopController.postToCart);`



Testing at this stage should insert a cart inside a user with a copy of the full product and a quantity, looking like this:

```
{
"_id":{"$oid":"608dc6a5ad17a5ed4fc30d4d"},
"name":"Eamonn",
"email":"eamonn@home.ie",
"cart":{
	"items":[{
		"_id":{"$oid":"608dce2d8f7392045059330b"},
		"title":"Gardening - The gloves are off!!",
		"price":"895.99","description":"The truth",
		"imageUrl":"https://gocreations.info/bakiris/wp-content/uploads/2021/01/leather-book-preview.png",
		"userId":{"$oid":"608dc6a5ad17a5ed4fc30d4d"},
		"quantity":1
		}]
	}
}
```

This is probably a little too much information, so we will reduce it a little.



#### In Models - user.js - addToCart

+ We will adjust what we add to the cart, instead of using spread to insert the full product - we will just insert the id and qty

  ```
  // we need an object we can insert
  // We only want the product Id and the quantity
  const updatedCart = { items: [{productId: new mongodb.ObjectId(product._id), quantity: 1}] }
  ```



#### Now we make the model work for updating and/or adding a new item to the cart

+ Firstly we will add a check to the cart value in the constructor: `this.cart = cart != null ? cart : {items: []};`

+ Then in add to cart we need to check if the string version of the product id in the database is equal to any existing product id - the reason we convert to string is to check like for like - as products id's retrieved from the database are not treated or recognised as strings.

+ This will give us back the index of a existing product

+ If this gives us back a value we know there is an existing item - so we use that check to just update its quantity

+ else its a new product - so we push it to our created array and write it to the db

  ```
      addToCart(product) {
          const db = getDb();
          // First we want to check if the product is already in the cart - if it is we will need to 
          // increase the quantity
          const existingProductIndex = this.cart.items.findIndex(cartProd => {
              // we look for productId in the cart as this is what we call it below when we add a new 
              // product to the cart.
              // when comparing these we should convert both to type string, as the string type field from 
              // the database is not treated
              // as a string in js
              return cartProd.productId.toString() === product._id.toString();
          });
  
          // set a default quantity
          let newQuantity = 1;
  
          // Now we insert the object, but we only need to insert new items and update the quantity of 
          // existing items
          // so make a copy of the current cart - we will add any changes to this
          const updatedCartItems = [...this.cart.items];
  
          // check is the product there by seeing if the existinProductIndex has a value
          if (existingProductIndex >= 0) {
              // update the quantity of that item using the index we get from above
              newQuantity = this.cart.items[existingProductIndex].quantity + 1;
  
              // now access our current cart at the index of our found product - and update the quantity
              updatedCartItems[existingProductIndex].quantity = newQuantity
          }
          // else its a new item in the cart - so we simply push it into our copy of the current cart
          else {
              updatedCartItems.push(
              	{ productId: new mongodb.ObjectId(product._id), quantity: newQuantity })
          }
  
          // now our updated Cart is equal to the updatedCartItems that we have created, checked 
          // and modified above
          const updatedCart = {items: updatedCartItems}
          
          // now we want to store it in the users collection under current user
          return db.collection('users').updateOne(
              { _id: new mongodb.ObjectId(this._id) },
              { $set: {cart: updatedCart} }
          );
      }
  ```

  

**This will now add a cart if not there and will increment existing products or insert a new one**



[<< Back to Index](#index)



### Setting up the cart - Displaying the cart

#### In Models - user.js

+ Add a getCart method

+ We get an array of the product id's from the cart

+ We use that to get an array of products matching the id's

+ Then we modify this insert the quantity into each product in the array - each product is an object remember.

  ```
  static getCart() {
          const db = getDb();
  
          // get the product Id's that are in the cart into an array of id's using map
          const productIds = this.cart.items.map(item => {
              return item.productId;
          });
          // grab the full details of any products that are in the cart
          // $in takes an array of id's - here is where we use our array productIds
          // so give us any products whose ids are mentioned in the productIds array - returns a cursor 
          // which we can convert manually
          return db.collection('products').find({_id: {$in: productIds}})
          .toArray()
          .then(products => {
          
              // what we want back is an object with the quantity inserted - so we use map for this
              return products.map(prod => {
              
                  // as we use arrow functions we can still use this here to reference the overall class
                  // then we can find any item that has a product id
                  return {...prod, quantity: this.cart.items.find(item => {
                  
                      // check if the id of each item in our cart matches the id of a product in our new 
                      // object
                      // when this returns true, we know we have matched the correct cart item with the
                      // correct product 
                      return item.productId.toString() === prod._id.toString();
                      
                  // so we just point at the cart items quantity field - and so add the quantity
                  }).quantity
                  }
              })
          })
          .catch(err => console.log(err));
      }
  ```

  

#### In Controllers - shop.js - getCart

+ With the above model we just call getCart and get an object containing products with quantities
+ return this to the template



#### In routes - shop routes

+ enable the display cart route: `router.get('/cart', shopController.getCart);`



#### In views - make sure you are displaying data correctly

[<< Back to Index](#index)





### Setting up the cart - Deleting items

#### In Models - deleteOne

+ We create a copy of the cart, using the js filter method to filter out the item we want to delete

+ This becomes our updated cart - so we insert that into the database.

  ```
  deleteOne(prodId) {
          const db = getDb();
  
          // using filter we can create an array of items we want to keep - ie do not include the item matching the prodId
          const updatedCart = this.cart.items.filter(item => {
              return item.productId.toString() !== prodId.toString();
          });
  
          return db.collection('users').updateOne(
              { _id: new mongodb.ObjectId(this._id) },
              { $set: {cart: {items: updatedCart} } }
          );
      }
  ```

  

#### In controllers - shop.js - deleteCartItem

+ Get the product id we want to delete from the request

+ call our deleteOne method

+ redirect

  ```
  exports.deleteCartItem = (req, res, next) => {
      // get the product id from the request
      const prodId = req.body.productId;
  
      req.user.deleteOne(prodId)
      .then(result => {
          res.redirect('/cart');
      })
      .catch(err => console.log(err))
  };
  ```




[<< Back to Index](#index)



### Add Orders

#### In Models - user model - create addToOrder

+ We will use the user model to save the cart to a new collection called orders

+ We need detailed information in the order about the product and the user

+ We can create an order object and use getCart method to insert full product details with quantity

+ We can then also add the current user

+ Insert this into the db

+ We will then empty the cart

  ```
  addToOrder() {
          const db = getDb();
          // store the cart in a collection called orders
  
          // firstly we want detailed information about the product and the user in the order
          // so we can use getCart() and work within that to use that data
          this.getCart()
          .then(products => {
              // create our order data
              const orderData = {
                  items: products,
                  user: {
                      _id: new mongodb.ObjectId(this._id),
                      name: this.username
                  }
              }
              // insert the orderData
              return db.collection('orders').insertOne(orderData)
          })
          .then(result => {
              // empty the cart in the user object
              this.cart = {items: []};
              // empty the cart in the database
              return db.collection('users').updateOne(
                  { _id: new mongodb.ObjectId(this._id) },
                  { $set: {cart: {items: []} } }
              );
          })
          .catch(err => console.log(err));
      }
  ```

  

#### In Controllers - postOrder

+ Call our addToOrder method and then redirect to the orders screen

  ```
  exports.postOrder = (req, res, next) => {
      // call our user model method to add cart to order
      req.user.addToOrder()
      .then(result => {
          res.redirect('/orders');
      })
      .catch(err => console.log(err));
  };
  ```

[<< Back to Index](#index)



### Get Orders

#### In Models - user model - create getOrder

+ Create a method that gets the orders but only the orders whose id matched current users id

+ See in this example - you can set a default path for the target we are checking - 'user._id' - in this case

  ```
  getOrder() {
          const db = getDb();
          // we need to find orders for specific user
          // we can define a path to search in for the user id - surrounded by quotes - 'user._id' in 
          // this case
          // then we will compare it with the current users id
          
          return db.collection('orders')
          .find({ 'user._id': new mongoDb.ObjectId(this._id) })
          .toArray();
      }
  ```

  



#### In Controllers - GetOrders

+ Grab the order from our getOrder method above and return to the orders template

  ```
  exports.getOrders = (req, res, next) => {
      req.user.getOrder()
      .then(orders => {
          res.render('shop/orders', {
              pageTitle: 'Your Orders',
              path :'/orders',
              orders: orders
          });
      })
      .catch(err => console.log(err));
  };
  ```

  

#### In routes

+ Make sure the display orders route is correct: `router.get('/orders', shopController.getOrders);`



#### In Views

+ Make sure you are targeting the correct data:

  ```
  <main>
          <% if(orders.length <= 0) {  %>
              <h1>Orders - No Orders as yet!</h1>
          <% } else { %>
              <% orders.forEach(order => {  %>
                  <!-- Every order will have an ID -->
                  <h1>Order Number: <%= order.id %></h1>
                  <!-- We can now loop through the products that we associated with the order in the 
                  	controller -->
                  <ul>
                      <% order.items.forEach(product => { %>
                      <li><%= product.title %>: (<%= product.quantity %>)
                          <ul>
                              <li><%= product.description %></li>
                              <li><%= product.price %></li>
                          </ul>
                      </li>
                      <% }) %>
                  </ul>
              <% }); %>
          <% } %>
      </main>
  ```

  

[<< Back to Index](#index)



## Mongoose



Mongoose is an ODM - Object Document Mapping Library - similar to what Sequelize does for MySql - except where sequelize is an ORM - where the R stands for Relational database - Mongo being non relation - uses Documents - hence the D in ODM.



It handles the syntax for running our db queries, It uses Schemas and models to construct our core db structure. We can then use instances and queries to interact with the db.



### Mongoose Setup

#### Install mongoose

+ In the terminal enter : `npm install --save mongoose`

#### Connect Mongoose to our database

+ We no longer need a database.js file as we did with core mongo db connection - mongoose handles all this functionality for us.

+ Go to app.js and import mongoose: `const mongoose = require('mongoose');`

+ comment out any existing imports from now deleted or non existent sources such as database.js.

+ Setup an env file - where we can store our connection url

  ```
  const MONGO_URI = 'mongodb+srv://root:AcmePassword@myfirstcluster.ugdke.mongodb.net/AcmeShop?retryWrites=true&w=majority'
  
  exports.connectionUri = MONGO_URI;
  ```

+ Add this env file to gitignore

+ Import the connection url into app.js

+ Use this imported variable to connect - using mongoose connect method - which takes the connection url

  ```
  mongoose.connect(connectionUri)
  .then(result => {
      app.listen(3000);
  })
  .catch(err => console.log(err));
  ```

  **Mongoose is now ready to use**



### Using Mongoose - Setting up a schema

#### Models - product.js

It may seem odd to set up a schema - in mongoDb - but what mongoose gives you is the freedom to code without thinking of where or how to get or insert data - mongoose does that for you. But to allow mongoose to do this it does need to know how you would like your data laid out. - Worth noting that schemas are not essential - we could still simply use mongoose to manually manage our db.

+ In our product.js model import mongoose

+ set up a Schema variable equal to the mongoose Schema constructor.

+ Then create a new instance  called productSchema

+ Into this we pass an object which describes the structure of a product

  ```
  const mongoose = require('mongoose');
  
  // set up a variable to represent the Schema constructor
  const Schema = mongoose.Schema;
  
  // create a new schema - a product schema - by instantiating a Schema object.
  // pass in an object that defines how your products should look
  const productSchema = new Schema({
      title: {
          type: String,
          required: true
      },
      price: {
          type: Number,
          required: true
      },
      description: {
          type: String,
          required: true
      },
      imageUrl: {
          type: String,
          required: true
      }
  });
  ```

  

#### Exporting the model

+ The model is what we will export the product schema as. Mongoose works with these models and they refer to the blueprint which is the schema created above.

+ To export the model we use module.exports  and we make that equal to mongoose.model() and pass in the name we want our model to be followed by the schema used to define this model.

+ The name you give this model, will also be pluralised and used as the collection name in mongoDb

  ```
  module.exports = mongoose.model('Product', productSchema);
  ```

  

#### Using the exported model - Setup postAddProduct controller in Admin

+ Import the Product model: `const Product = require('../models/product');`.

+ Go to the postAddProduct controller in admin controllers

+ We collect the data from the template via the request body and then pass it into a new instance of our model

+ We can then call save and redirect

  ```
  exports.postAddProduct = (req, res, next) => {
      // get form data
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description = req.body.description;
      const product = new Product(
          {
              title: title,
              imageUrl: imageUrl,
              price: price,
              description: description
          });
      
      product.save()
      .then(response => {
          console.log(response);
          res.redirect('/admin/products');
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

+ This should now allow us to add a product, make sure the routes for add product are setup - view previous code for this - and also comment out any previous user setup that may be included in the app.js file from previous sett-ups 

+ Current app.js file example here :

  ```
  const path = require('path');
  const express = require('express');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const connectionUri = require('./utility/env').connectionUri;
  
  const app = express();
  
  // now setup the default template engine
  app.set('view engine', 'ejs');
  
  const adminRoutes = require('./routes/admin');
  const shopRoutes = require('./routes/shop');
  const errorController = require('./controllers/errors.js')
  const { homedir } = require('os');
  
  
  app.get('/favicon.ico', (req, res) => {
      res.status(204);
      res.end();
  });
  
  app.use(bodyParser.urlencoded({extended: false}));
  // this tells express to look into the public folder to serve up css files
  app.use(express.static(path.join(__dirname, 'public')));
  
  // outsourced routes
  app.use('/admin', adminRoutes);
  app.use(shopRoutes);
  app.use(errorController.get404);
  
  
  mongoose.connect(connectionUri)
  .then(result => {
      app.listen(3000);
  })
  .catch(err => console.log(err));
  ```



### Fetching products to display on page - using Mongoose

***I will not mention to activate or enter the routes - but this must be done for each stage - i will mention it if there  is some variation to the standard setup of the routes.***

#### In Controllers - Shop.js - getProducts 

+ Here we can use one of the mongoose static methods that exist now in our model - `find()`

+ find() - when used in mongoose does not give us a cursor like in plain mongo - instead it gives us the actual products. Now we can change this by tacking on `.cursor()` to the end and then it will return a cursor where we can use next() or eachAsync() to loop through them. But in this example we will just use the `find()` method to return the actual products.

  ```
  exports.getProducts = (req, res, next) => {
      Product.find()
      // we should then have our products
      .then(products => {
          console.log(products);
          res.render('shop/product-list', {
              products: products,
              pageTitle: 'All Products',
              path :'/product-list',
          });
      })
      .catch(err => {
          console.log(err);
      });    
  };
  ```



#### In Controllers - Shop.js - getIndex

+ We will setup this controller in the same way as above.

  ```
  exports.getIndex = (req, res, next) => {
      Product.find()
      // we should then have our products in an object
      .then(products => {
          console.log(products);
          res.render('shop/index', {
              products: products,
              pageTitle: 'Home page',
              path :'/index',
          });
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

  

### Fetching a single product - for product details - using Mongoose

#### In controllers - the getProductDetails

+ Here we can use another built in static method which now exists in our model - `findById()`.

+ This finds a product by passing in an id.

+ It also will convert a string if the id is passed in as a string

  ```
  exports.getProductDetails = (req, res, next) => {
      const prodId = req.params.productId;
      // use our static method from mongoose which lives in our product model
      Product.findById(prodId)
      .then(product => {
          res.render('shop/product-details', {
              product: product, 
              pageTitle: product.title,
              path: '/product-details'
          });
      })
      .catch(err => {
          console.log(err)
      });
  };
  ```

  

### Edit product page - using Mongoose

#### In Admin controller - get products

+ make sure you use the find method here to return all products

#### In Admin controller - getEditProduct

+ Use the `findById()` method, to return the product which we send to the template

  ```
  exports.postAddProduct = (req, res, next) => {
      // get form data
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description = req.body.description;
      const product = new Product(
          {
              title: title,
              imageUrl: imageUrl,
              price: price,
              description: description
          });
      
      product.save()
      .then(response => {
          console.log('PRODUCT CREATED');
          res.redirect('/admin/products');
      })
      .catch(err => {
          console.log(err);
      });
  };
  
  // gets theproduct into a form that needs to be edited
  exports.getEditProduct = (req, res, next) => {
      // check quer param to see if param sent from template is true
      const editMode = req.query.edit;
      if (!(editMode === 'true')) {
          return res.redirect('/');
      }
  
      // now we need the product id that was passed in the url
      const prodId = req.params.productId;
  
      // call the fetchOne method inside product model - returns a product
      Product.findById(prodId)
      .then(product => {
          // add a check in case product does not exist
          if (!product) {
              return res.redirect('/');
              // could also pass an error in here
          }
          res.render('admin/edit-product', {
              pageTitle: 'Edit Product Page',
              path: '/admin/edit-product',
              editing: editMode,
              product: product
          });
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

  

#### In Controllers - postGetEditProduct()

+ The approach here is to get the product - which is an object

+ Then add in the updated data

+ Then call save 

  ```
  exports.postGetEditProduct = (req, res, next) => {
      //collect the edited product data from the request body
      const prodId = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedPrice = req.body.price;
      const updatedImageUrl = req.body.imageUrl;
      const updatedDescription = req.body.description;
      
      // find the product, then we get access to it
      Product.findById(prodId)
      .then(product => {
          // this gives us access to an object which is the product
          // update the product mongoose object
          product.title = updatedTitle;
          product.price = updatedPrice;
          product.imageUrl = updatedImageUrl;
          product.description = updatedDescription;
  
          // then call the built in save method save
          product.save(); 
      })
      .then(result => {
          console.log('UPDATED PRODUCT');
          res.redirect('/admin/products');
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

  

### Delete Products

#### In controllers - postDeleteProduct

+ There is no delete method we can use - instead us `findByIdAndRemove()`

  ```
  exports.postDeleteProduct = (req, res, next) => {
      let prodId = req.body.productId;
      Product.findByIdAndRemove(prodId)
      .then(() => {
          console.log(`Deleted - product`);
          return res.redirect('/admin/products');
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

  

### Setting up a User model/Schema - using Mongoose

#### In Models - In user.js

+ Create a schema for the user - including an embedded cart

  ```
  const mongoose = require('mongoose');
  
  const Schema = new mongoose.Schema;
  
  const userSchema = new Schema({
      username: {
          type: String,
          required: true
      },
      email: {
          type: String,
          required: true
      },
      // embed the cart in the user
      cart: {
          // make items equal to an array of documents
          items: [{
              productId: {
                  // make the type a type of ObjectId
                  type: Schema.Types.ObjectId,
                  required: true
              },
              quantity: {
                  type: Number,
                  required: true
              },
  
          }]
      },
  });
  ```

  

#### In app.js

+ Import the user model: `const User = require('./models/user');`

+ Create a user before we start listening

  ```
  mongoose.connect(connectionUri)
  .then(result => {
      // check have we already got a user
      User.findOne()
      .then(user => {
          if (!user) {
              // create a new user
              const user = new User({
                  username: 'Eamonn',
                  email: 'eamonn@homedir.ie',
                  cart: {
                      items: []
                  }
              });
              user.save();
              app.listen(3000);
          }
      });
  })
  .catch(err => console.log(err));
  ```

  

+ Grab the users id in compass of mongo directly

+ We will now add that user to our request body

  ```
  // register a new middleware to get the user set into the request object
  app.use((req, res, next) => {
      User.findById('6098477212b68329d095f7f3')
      .then(user => {
          // we add our new mongoose user model object to the request
          req.user = user;
          next();
      })
      .catch(err => {
          console.log(err);
      });
  });
  ```

  

### Setting up a relationship between user and product - using Mongoose

#### In models - product schema

+ Edit this to include the user

  ```
  userId: {
          type: Schema.Types.ObjectId,
          // use a ref to make sure we are referring to an Id in the user collection
          ref: 'User',
          required: true
      }
  ```

  

+ We add the user, and this can include a ref - for reference. This reference will say what collection the id reffers to.

+ When using embedded documents as we are - this ref is slightly redundant as the structure of an embedded document obviously implies a relationship anyhow.




#### In Controllers - admin - addProduct controller

+ Here we need to add in the user because when we create a new product we want to store the userId.

  ```
  const product = new Product(
          {
              title: title,
              imageUrl: imageUrl,
              price: price,
              description: description,
              userId: req.user
          });
  ```

+ Above we make the userId equal to the entire user object - we can specify that its the id by adding `._id` - but with mongoose there is no need as mongoose will extract the id for us. Also this gives us some clever functionality when fetching - using `populate` and `specify`

+ Restart sever and create new product - user should now be linked





### Side note - populate and select

#### Populate()

+ At the moment our product should have a field with the user id embedded
+ If we wanted to fetch a product with only certain data - and perhaps even some of the users data, it could be quite cumbersome to manually extract each user of each product.
+ Mongoose allows us to do this by using `populate()` - It takes a path to the field you need to populate as a first argument, and then takes  a string of what fields you want to extract as an optional 2nd argument
+ So if we wanted to populate our user, from the user id which we have in the product we could add this `.populate('userId', 'name')`

#### Select()

+ We can use specify to specify what we want back from the data - it takes a string where we can specify what we want
+ For example : `.select('title price userId')` will bring back only the title and the price



So doing something like this: 

```
Product.find()
    .select('title price')
    .populate('userId', 'username')
    .then(products => {
        console.log(products);
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path :'/admin/products',
        });
    })
```



Will give you this in the console:

```
{
    _id: 60991fd4c5dcfe232c98c8f8,
    title: 'Tutoring - The Truth',
    price: 99.99,
    userId: { _id: 609849aee999b92ee0c1d6f6, username: 'Eamonn' }
}
```

We could also specify that we dont want the id, by adding it with a minus symbol: `.select('title price -_id')` - giving us this:

```
{
    title: 'Tutoring - The Truth',
    price: 99.99,
    userId: { _id: 609849aee999b92ee0c1d6f6, username: 'Eamonn' }
}
```



### The Cart - using Mongoose

In the previous  lesson where we used raw mongodb commands - we included our own method for adding to the cart. With mongoose there is obviously no default add to cart built in method - but we can add our own custom methods to our schema - in this case we will need to add it to our user schema as the cart is related to a user - not to a product.



To do this we will access our userSchema and use the methods key - which allows us to create our own methods. Read more here =>  [Docs...](https://mongoosejs.com/docs/guide.html#methods)



#### In Models - User model

+ We can add a custom method to our schema like this:

  ```
  userSchema.methods.addToCart = function(product) {
      
  }
  ```

+ We take in a product

+ We write our function like this, so that the keyword`this` will still refer to the user object

+ Inside this function we can use code very similar to the logic we used in the mongoDb cart section.

+ The big differences are we do not need to convert the ObjectId when storing it - mongoose will do this for us. And we just call save at the end. 

+ Do **not** declare methods using ES6 arrow functions (`=>`). Arrow functions [explicitly prevent binding `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this), so your method will **not** have access to the document

+ Full commented code example of addToCart method in the user schema:

  ```
  userSchema.methods.addToCart = function(product) {
      // First we want to check if the product is already in the cart - if it is we will need to increase
      // the quantity
      const existingProductIndex = this.cart.items.findIndex(cartProd => {
          // we look for productId in the cart as this is what we call it below when we add a new product
          // to the cart.
          // when comparing these we should convert both to type string, as the string type field from the
          // database is not treated a string in js
          return cartProd.productId.toString() === product._id.toString();
      });
  
      // set a default quantity
      let newQuantity = 1;
  
      // Now we insert the object, but we only need to insert new items and update the quantity of existing
      // items so make a copy of the current cart - we will add any changes to 'this'.
      const updatedCartItems = [...this.cart.items];
  
      // check is the product there by seeing if the existinProductIndex has a value
      if (existingProductIndex >= 0) {
          // update the quantity of that item using the index we get from above
          newQuantity = this.cart.items[existingProductIndex].quantity + 1;
  
          // now access our current cart at the index of our found product - and update the quantity
          updatedCartItems[existingProductIndex].quantity = newQuantity
      }
      // else its a new item in the cart - so we simply push it into our copy of the current cart
      // we do not need to convert the ObjectId as mongoose will do this for us and wrap it in an ObjectId
      else {
          updatedCartItems.push({ productId: product._id, quantity: newQuantity })
      }
  
      // now our updated Cart is equal to the updatedCartItems that we have created, checked and modified 
      // above
      const updatedCart = {items: updatedCartItems}
  
      // set this.cart equal to the updated cart
      this.cart = updatedCart;
      
      // now we want to store it in the users collection under current user and we can use mongoose .save()
      // method for this
      return this.save();
  }
  ```

  

#### In controllers - shop - postToCart

+ Use the findById method to get the product

+ Then we call our custom method to add the product to the cart: `return req.user.addToCart(product)`

  ```
  exports.postToCart = (req, res, next) => {
  
      const prodId = req.body.productId;
      Product.findById(prodId)
      .then(product => {
          // call the addToCart - expects a product - and returns a promise
          return req.user.addToCart(product)
      })
      .then(result => {
          res.redirect('/cart')
      })
      .catch(err => console.log(err));
  };
  ```

+ Check to make sure the correct route is active in routes file

+ You should be able to add items to the cart



### Get the Cart - using Mongoose

We do not need to add a method for this, we can do it all in the controller using populate. This is because we have the cart embedded within the user like this:

```
{
  cart: { items: [ [Object], [Object] ] },
  _id: 609849aee999b92ee0c1d6f6,
  username: 'Eamonn',
  email: 'eamonn@homedir.ie',
  __v: 0
}
```



So all we need to do is populate out these items that have product Id's stored within them, and we can do this in the controller

#### Controllers - getCart()

+ We will use .populate to target the productId inside the cart, to do this we must pass in the path to the productId.

+ Then we need to use `execPopulate()` to get a promise that we can then work with

+ Then we will have the full user with the populated cart, we can point to this when returning the products

  ```
  exports.getCart = (req, res, next) => {
      req.user
      // use populate to populate out the product - we just need to pass in the path to the productId
      .populate('cart.items.productId')
      // must add this as populate does not return a promise - execPopulate() does this for us.
      .execPopulate()
      .then(user => {
  
          res.render('shop/cart', {
              pageTitle: 'Shopping Cart',
              path :'/cart',
              products: user.cart.items
          });
      })
      .catch(err => {
          console.log(err);
      });
  };
  ```

  

### Delete item from cart using Mongoose

To do this we will add another method to our user schema

#### Models - User - deleteOne

+ We will make an updated cart variable and make it equal to every item in the cart - except for the item we want to delete

+ Then save this as our cart

  ```
  userSchema.methods.deleteOne = function(prodId) {
      // using filter we can create an array of items we want to keep - ie do not include the item matching 
      // the prodId
      const updatedCart = this.cart.items.filter(item => {
          return item.productId.toString() !== prodId.toString();
      });
  
      this.cart.items = updatedCart;
      return this.save();
  }
  ```

  

#### Controllers - shop deleteCartItem

+ This can stay as it did in the mongoDb lessons, which calls a method called deleteOne()

  ```
  exports.deleteCartItem = (req, res, next) => {
      // get the product id from the request
      const prodId = req.body.productId;
  
      req.user.deleteOne(prodId)
      .then(result => {
          res.redirect('/cart');
      })
      .catch(err => console.log(err))
  };
  ```

  

### Order - with mongoose

+ First we need a new model/schema for orders

#### Models - order.js

+ Create a schema with user data and product data:

+ We then export this and the rest we will do in the controller

+ we will make products and array of documents - containing each products details and quantity

  ```
  const mongoose = require('mongoose');
  
  // set up a variable to represent the Schema constructor
  const Schema = mongoose.Schema;
  
  // create a new schema - a order schema - by instantiating a Schema object.
  // pass in an object that defines how our order should look
  const orderSchema = new Schema({
      products: [{
          productData: { type: Object, required: true },
          quantity: { type: Number, required: true },
      }],
      user: {
          username: { type: String, required: true },
          userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
      }
  });
  
  
  module.exports = mongoose.model('Order', orderSchema);
  ```



#### In Controllers - shop.js - postOrder

+ Import the above model

+ Get the products in the cart - to do this we will call req.user and ask it to populate the cart.items.productId field - as this is where the cart items are stored.

+ We will then use execPopulate to transform it to a promise 

+ Then within the .then block we will use map to iterate over each product in the cart and give us back what we need for our schema, which is a product entry and a quantity entry.

+ Inside the same then block we create an new instance of the order, inserting the correct data to satisfy our order schema.

+ make productData equal to an object where we spread the productId

+ Optional - i didnt find any difference with or without using `._doc`: ( *when spreading the productId object - use a special field that is provided by mongoose that is the `._doc`. We use `._doc` as this gives us access to only the data we want in the document, without this we would be getting a lot of meta data that is related to the object, so `._doc` filters this all out  and gives us the full product data)*

+ we then return order.save and chain on a then to handle redirect and catch any errors

  ```
  exports.postOrder = (req, res, next) => {
  
      req.user
      // use populate to populate out the product - we just need to pass in the path to the productId
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
          // here we prepare our product object in the format our schema expects
          const products = user.cart.items.map(item => {
              return { productData: { ...item.productId._doc },  quantity: item.quantity }
          });
          // create a new instance of our order
          const order = new Order({
              user: {
                  username: req.user.username,
                  userId: req.user  // mongoose will extract the id - or we can specify and point to ._id
              },
              products: products
          });
          
          // save this model, and return it so we can chain then onto it
          return order.save()
      })
      
      ** ---- add in a clearCart method here - see below --- **
      
      .then(result => {
          res.redirect('/orders');
      })
      .catch(err => console.log(err));
  };
  ```
  
  

### Clearing the cart - Using Mongoose

#### in Models - user.js - add a clearCart method

+ Enter a clearCart method:

  ```
  userSchema.methods.clearCart = function() {
      this.cart = {items: []};
      return this.save();
  }
  ```



#### In controllers - shop - postOrder

+ We need to call this above method which clears the cart before we redirect

  ```
      .then(result => {
          // clear out the cart
          return req.user.clearCart();
      })
      .then(result => {
          res.redirect('/orders');
      })
      .catch(err => console.log(err));
  };
  ```

  

### Get the Orders page - Using Mongoose

+ In the getOrders controller, we can check if the user id - which we have in the req object remember - is equal to the user id of an order

+ We can do this by making a find query.

  ```
  exports.getOrders = (req, res, next) => {
      Order.find( {'user.userId' : req.user._id} )
      .then(orders => {
          res.render('shop/orders', {
              pageTitle: 'Your Orders',
              path :'/orders',
              orders: orders
          });
      })
      .catch(err => console.log(err));
  };
  ```



#### In Routes - Shop - orders.ejs

+ We just need to edit the filepaths to point to our data 

  ```
  <main>
          <% if(orders.length <= 0) {  %>
              <h1>Orders - No Orders as yet!</h1>
          <% } else { %>
              <% orders.forEach(order => {  %>
                  <!-- Every order will have an ID -->
                  
                  <h1> - Order Number: <%= order._id %></h1>
                  <!-- We can now loop through the products that we associated with the order in the 	
                  	controller -->
                  <ul class="orders">
                      <% order.products.forEach(prod => { %>
                      <li class="orders__item">Item Name: <%= prod.productData.title %>
                          <ul class="orders__products">
                              <li class="orders__products-item">Quantity: (<%= prod.quantity %>)</li>
                              <li class="orders__products-item">Description: <%= 
                              									prod.productData.description %></li>
                              <li class="orders__products-item">Item Price: <%= prod.productData.price %>
                              </li>
                          </ul>
                      </li>
                      <% }) %>
                  </ul>
                  <hr>
              <% }); %>
          <% } %>
      </main>
  ```

  



# Future Improvements

+ As it currently stands - deleting items is not clearly reflected in the cart - although if the item is deleted - it cannot be retrieved by the cart which is effectively correct - but this could be improved with some scripting



# Resources

+ Learn more about MySQL/ SQL in General: https://www.w3schools.com/sql/

+ Learn more about the Node MySQL Package: https://github.com/sidorares/node-mysql2

+ Learn more about MongoDB: https://academind.com/learn/mongodb

+ Sequelize Official Docs: http://docs.sequelizejs.com/

+ Mongo Crud operations: https://docs.mongodb.com/manual/crud/

+ SQL vs NoSQL: https://academind.com/learn/web-dev/sql-vs-nosql/

+ MongoDB Official Docs: [https://docs.mongodb.com/manual/core/security-encryption-at-rest/https://docs.mongodb.com/manual/](https://docs.mongodb.com/manual/)

+ Mongoose Js official Docs: https://mongoosejs.com/docs/

  
  
  

[<< Back to Index](#index)