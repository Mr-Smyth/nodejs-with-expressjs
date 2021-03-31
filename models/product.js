/**
 * This model will represent a product.
 */
const products = [];

module.exports = class Product {
    constructor(t) {
        // create a property in this class and assign title.
        this.title = t;
    }
    // a basic way to save the data to a simple array
    save() {
        products.push(this);
    }

    // retrieve all the products
    // make it static because we are not calling it on an instance of the class, like we would with save - myProducts.save() for example
    // but we are calling it from outside to fetch all the products, so we need to use static.

    // static means that we can call the function on the class itself, and not on an instanciated object of the class.
    static fetchAll() {
        return products;
    }
}