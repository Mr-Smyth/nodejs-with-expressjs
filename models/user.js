const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
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
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    },
});

// create a custom method for adding products to a users cart
userSchema.methods.addToCart = function(product) {
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
    // we do not need to convert the ObjectId as mongoose will do this for us and wrap it in an ObjectId
    else {
        updatedCartItems.push({ productId: product._id, quantity: newQuantity })
    }

    // now our updated Cart is equal to the updatedCartItems that we have created, checked and modified above
    const updatedCart = {items: updatedCartItems}

    // set this.cart equal to the updated cart
    this.cart = updatedCart;
    
    // now we want to store it in the users collection under current user and we can use mongoose .save() method for this
    return this.save();
}

userSchema.methods.clearCart = function() {
    this.cart = {items: []};
    return this.save();
}

userSchema.methods.deleteOne = function(prodId) {
    // using filter we can create an array of items we want to keep - ie do not include the item matching the prodId
    const updatedCart = this.cart.items.filter(item => {
        return item.productId.toString() !== prodId.toString();
    });

    this.cart.items = updatedCart;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);
