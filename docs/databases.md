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
+ This allows us to write sql code and interact with sql from Node
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

Now we can import the database connection pool

+ `const db = require('./utility/database');`



**Now we can test this with a little sample** 

+ Firstly we will go back to our mysql workbench and add something
+ Right click on Tables and select create table
+ Give the table the name of products
+ 

[<< Back to Index](#index)

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