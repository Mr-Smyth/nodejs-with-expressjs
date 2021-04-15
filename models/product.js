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

    static fetchAll() {
        // return the promise so we can use it somewhere else.
        return db.execute('SELECT * FROM products')
    }

    static fetchOne(id) {}

    static deleteOne(id) {}
}