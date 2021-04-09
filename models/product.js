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
    constructor(id, title, imageUrl, price, description) {
        // create our constructor properties
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        // now we call the helper funtion to get the products - we include a callback 
        // the call back is an anonymous function that will write to the file with the read data
        getProductsFromFile(products => {
            if (this.id) {
                // find the index of the product we are editing
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                // make a copy of the current products array for us to edit 
                const updatedProducts = [...products];
                // update it with this, which is the data we want to use.
                updatedProducts[existingProductIndex] = this;
            }
            else {
                this.id = (Math.floor(Math.random()*10000)).toString();
                // because either an existing or a blank array is returned in the products variable we can push to it.
                products.push(this);
                fs.writeFile(fPath, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }
    // use static as we are not calling an instance - but the Product class
    static fetchAll(cb) {
        // call the helper function to read the products
        getProductsFromFile(cb);
    }

    // Extract one product, 
    /**
     * 
     * @param {*} id of the product
     * @param {*} cb Callback to get the actual data
     */
    static fetchOne(id, cb) {
        // We want to get the products first as we are just dealing with a json file in this example
        getProductsFromFile(products => {
            // now we have all the products we can use normal js
            // use the default js find() method to search an array for a value
            // This will execute a function passed to find - on every element in the array
            // and will ultimately return the element for which the function returns true

            const product = products.find(prod => {
                // REMEMBER FIND WILL ONLY RETURN TRUE
                return prod.id === id;
            });
            // note, above can be written: const product = products.find(prod => prod.id === id); 
            // because in single statement arrow functions, return is implied
            cb(product);
        });
    }
}