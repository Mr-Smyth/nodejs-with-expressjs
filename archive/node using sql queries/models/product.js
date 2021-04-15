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

    save() {
        // we need this to reach out to the db and save the data
        // WE DEFINE THE FIELD NAMES TO MATCH THE DB
        // followed by the values - to avoid sql injection attack - use ? - followed by an array containing the data


        // so return the promise to execute this code
        return db.execute(
            'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description]
            );
    }

    static fetchAll() {
        // return the promise so we can use it somewhere else.
        return db.execute('SELECT * FROM products')
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }

    static deleteOne(id) {}
}