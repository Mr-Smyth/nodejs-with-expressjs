const mongodb = require('mongodb');


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
        // now tell mongo what db we want to use - in this case the default from our connection in database.js
        const db = getDb();
        // now specify the collection in that db we want to use
        // select the insertOne operation
        // insert this - as this represents this instance

        // we will return this - so we can treat it overall as a promise in our contoller
        return db.collection('products')
        .insertOne(this)
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err);
        });
    }

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
}


module.exports = Product;