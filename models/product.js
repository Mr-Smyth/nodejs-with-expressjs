/**
 * This model will represent a product.
 */
const fs = require('fs');
const path = require('path');
// import utility to get the root directory
const getRoot = require('../utility/path');
const fPath = path.join(getRoot, 'data', 'products.json');

/**
 * Helper Function
 * 
 * @param {Anonymous function from products.js constructor} cb 
 */
const getProductsFromFile = (cb) => {
    // read the file - code will not wait for this response as its asynchronous - hence we will call back
    fs.readFile(fPath, (err, fileData) => {
        if (err) {
            // call the callback function in the controller with a blank array
            return cb([]);
        }
        // otherwise call the callback function in the controller with the read data
        cb(JSON.parse(fileData));
    });
}


module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        // create our constructor properties
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        // now we call the helper funtion to get the products - we include a callback 
        // the call back is an anonymous function that will write to the file with the read data
        getProductsFromFile(products => {
            // because either an existing or a blank array is returned in the products variable we can push to it.
            products.push(this);
            fs.writeFile(fPath, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }
    // use static as we are not calling an instance - but the Product class
    static fetchAll(cb) {
        // call the helper function to read the products
        getProductsFromFile(cb);
    }
}