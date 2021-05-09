const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
            }
        }]
    },
});

module.exports = mongoose.model('User', userSchema);


// const mongodb = require('mongodb');

// // grab our getDb connection from our database.js file
// const getDb = require('../utility/database').getDb;

// class User {
//     constructor(username, email, cart, userId) {
//         this.username = username;
//         this.email = email;
//         this.cart = cart != null ? cart : {items: []};
//         this._id = userId;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     addToCart(product) {
//         const db = getDb();
//         // First we want to check if the product is already in the cart - if it is we will need to increase the quantity
//         const existingProductIndex = this.cart.items.findIndex(cartProd => {
//             // we look for productId in the cart as this is what we call it below when we add a new product to the cart.
//             // when comparing these we should convert both to type string, as the string type field from the database is not treated
//             // as a string in js
//             return cartProd.productId.toString() === product._id.toString();
//         });

//         // set a default quantity
//         let newQuantity = 1;

//         // Now we insert the object, but we only need to insert new items and update the quantity of existing items
//         // so make a copy of the current cart - we will add any changes to this
//         const updatedCartItems = [...this.cart.items];

//         // check is the product there by seeing if the existinProductIndex has a value
//         if (existingProductIndex >= 0) {
//             // update the quantity of that item using the index we get from above
//             newQuantity = this.cart.items[existingProductIndex].quantity + 1;

//             // now access our current cart at the index of our found product - and update the quantity
//             updatedCartItems[existingProductIndex].quantity = newQuantity
//         }
//         // else its a new item in the cart - so we simply push it into our copy of the current cart
//         else {
//             updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity })
//         }

//         // now our updated Cart is equal to the updatedCartItems that we have created, checked and modified above
//         const updatedCart = {items: updatedCartItems}
//         // now we want to store it in the users collection under current user
//         return db.collection('users').updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: {cart: updatedCart} }
//         );
//     }

//     getCart() {
//         const db = getDb();

//         // get the product Id's that are in the cart into an array of id's using map
//         const productIds = this.cart.items.map(item => {
//             return item.productId;
//         });
//         // grab the full details of any products that are in the cart
//         // $in takes an array of id's - here is where we use our array productIds
//         // so give us any products whose ids are mentioned in the productIds array - returns a cursor which we can convert manually
//         return db.collection('products').find({_id: {$in: productIds}})
//         .toArray()
//         .then(products => {
//             // what we want back is an object with the quantity inserted - so we use map for this
//             return products.map(prod => {
//                 // as we use arrow functions we can still use this here to reference the overall class
//                 // then we can find any item that has a product id
//                 return {...prod, quantity: this.cart.items.find(item => {
//                     // check if the id of each item in our cart matches the id of a product in our new object
//                     // when this returns true, we know we have matched the correct cart item with the correct product 
//                     // so we just point at the cart items quantity field - and so add the quantity
//                     return item.productId.toString() === prod._id.toString();
//                 }).quantity
//                 }
//             })
//         })
//         .catch(err => console.log(err));
//     }

//     deleteOne(prodId) {
//         const db = getDb();

//         // using filter we can create an array of items we want to keep - ie do not include the item matching the prodId
//         const updatedCart = this.cart.items.filter(item => {
//             return item.productId.toString() !== prodId.toString();
//         });

//         return db.collection('users').updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: {cart: {items: updatedCart} } }
//         );
//     }

//     addToOrder() {
//         const db = getDb();
//         // store the cart in a collection called orders

//         // firstly we want detailed information about the product and the user in the order
//         // so we can use getCart() and work within that to use that data
//         return this.getCart()
//         .then(products => {
//             // create our order data
//             const orderData = {
//                 items: products,
//                 user: {
//                     _id: new mongodb.ObjectId(this._id),
//                     name: this.username
//                 }
//             }
//             // insert the orderData
//             return db.collection('orders').insertOne(orderData)
//         })
//         .then(result => {
//             // empty the cart in the user object
//             this.cart = {items: []};
//             // empty the cart in the database
//             return db.collection('users').updateOne(
//                 { _id: new mongodb.ObjectId(this._id) },
//                 { $set: {cart: {items: []} } }
//             );
//         })
//         .catch(err => console.log(err));
//     }


//     getOrder() {
//         const db = getDb();
//         // we need to find orders for specific user
//         // we can define a path to search in for the user id - surrounded by quotes - 'user._id' in this case
//         // then we will compare it with the current users id
//         return db.collection('orders')
//         .find({ 'user._id': new mongodb.ObjectId(this._id) })
//         .toArray();
//     }


//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
//     }
// }

// module.exports = User;