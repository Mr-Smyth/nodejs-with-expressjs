const mongodb = require('mongodb');

// grab our getDb connection from our database.js file
const getDb = require('../utility/database').getDb;

class User {
    constructor(username, email, cart, userId) {
        this.username = username;
        this.email = email;
        this.cart = cart != null ? cart : {items: []}; // an object {items: []}
        this.userId = userId;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const db = getDb();
        // First we want to check if the product is already in the cart - if it is we will need to increase the quantity
        const existingProductIndex = this.cart.items.findIndex(cartProd => {
            // we look for productId in the cart as this is what we call it below when we add a new product to the cart.
            // when comparing these we should convert both to type string, as the string type field from the database is not treated
            // as a string in js
            return cartProd.productId.toString() === product._id.toString();
        });

        // set a default quantity
        let newQuantity = 1;

        // Now we insert the object, but we only need to insert new items and update the quantity of existing items
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
            updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity })
        }

        // now our updated Cart is equal to the updatedCartItems that we have created, checked and modified above
        const updatedCart = {items: updatedCartItems}
        // now we want to store it in the users collection under current user
        return db.collection('users').updateOne(
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