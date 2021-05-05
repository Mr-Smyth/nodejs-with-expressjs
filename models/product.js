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













// const mongodb = require('mongodb');


// // grab our getDb connection from our database.js file
// const getDb = require('../utility/database').getDb;

// // our mongo db product model class
// class Product {
//     constructor(title, price, description, imageUrl, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         // add a ternary here to set value to null if no id is passed
//         this._id = id ? new mongodb.ObjectId(id): null;
//         this.userId = userId;
//     }

//     save() {
//         // now tell mongo what db we want to use - in this case the default from our connection in database.js
//         const db = getDb();
//         let dbOperation;
//         // Now we want to check if _id already has value - if it does we are editing
//         if (this._id) {
//             dbOperation = db.collection('products').updateOne({ _id: this._id }, { $set: this })
//         } else {
//             dbOperation = db.collection('products').insertOne(this)
//         }

//         // we will return dbOperation - so we can treat it overall as a promise in our contoller
//         return dbOperation
//             .then(result => {
//                 console.log(result)
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products')
//         .find()
//         .toArray()
//         .then(products => {
//             console.log(products);
//             return products;
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static fetchOne(prodId) {
//         const db = getDb();
//         return db.collection('products')
//         // need to compare like for like here so we need to use the mongodb method - ObjectId - 
//         // _id is already an object id - so we need to convert prodId which is a string version of the _id we grab in the template
//         .find({_id: new mongodb.ObjectId(prodId)})
//         .next() // gets the next and final document in the cursor
//         .then(product => {
//             console.log(product);
//             return product;
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
//         .then(result => {
//             console.log(' -------------------- Deleted');
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }
// }


// module.exports = Product;