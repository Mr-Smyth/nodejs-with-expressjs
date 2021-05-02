const mongodb = require('mongodb');

// grab our getDb connection from our database.js file
const getDb = require('../utility/database').getDb;

class User {
    constructor(username, email, cart, userId) {
        this.username = username;
        this.email = email;
        this.cart = cart; // an object {items: []}
        this.userId = userId;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const db = getDb();
        // run findIndex with a function to find the item with the match index and return it
        // remember that findIndex will run until it finds true
        const cartProduct = this.cart.item.findIndex(cartProd => {
            return cartProd._id === product._id;
        });
        console.log(cartProd);

        // we need an object we can insert
        // Using spread - an elegant way to make updatedCart equal to the product info with an added quantity info
        const updatedCart = { items: [{...Product, quantity: 1}] }
        // now we want to store it in the users collection under current user
        return db
        .collection('users')
        .updateOne(
            { _id: new mongodb.ObjectId(this.userId) },
            { $set: {cart: updatedCart} }
        );
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
    }
}

module.exports = User;