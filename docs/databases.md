# Databases

[Return to Readme](https://github.com/Mr-Smyth/nodejs-with-expressjs/blob/main/README.md)

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
+ Select the  [[MySQL Community (GPL) Downloads »](https://dev.mysql.com/downloads/)](https://dev.mysql.com/downloads/)

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

  

### Setup the cart with sequelize

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



# Resources

+ Learn more about MySQL/ SQL in General: https://www.w3schools.com/sql/
+ Learn more about the Node MySQL Package: https://github.com/sidorares/node-mysql2

[<< Back to Index](#index)