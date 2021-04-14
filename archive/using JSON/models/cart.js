const fs = require('fs');
const path = require('path');
// import utility to get the root directory
const getRoot = require('../utility/path');
const fPath = path.join(getRoot, 'data', 'cart.json');


/* We want to have a cart that holds all the products that we added
and we also want to group products by id and increase their quantity 
in case we add a product more than once. 

Dont want to use a constructor here because we dont really create a cart, 
the cart should always be there we just need to add to it.*/
module.exports = class Cart {
    static addProduct(id, productPrice) {
        // First fetch the previous cart //////////////////////////////////////////////////////////////////////////////////////////

        // try to read the file - we will either get an err or the file content
        fs.readFile(fPath, (err, fileContent) => {
            // our cart equals a new cart by default.
            let cart = { products: [], totalPrice: 0 } 
            // if we DONT have an error - the cart exists so we redefine cart
            if (!err) {
                // reassign cart with the data from the read file
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart, see if product being added is an existing product in cart ///////////////////////////////////////

            // see if product exists using findIndex - we use findIndex here instead of find because 
            // we will use the index to replace any existing product with an updated one
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];

            // now a product from the products model does not have a qty field - so we create a new product from existing product or 
            // if no existing product in cart, then we use it to make a new object for product
            let updatedProduct;

            // Add new product / increase the qty ///////////////////////////////////////////////////////////////////////////////
            
            // now we check if the product exists already in our cart
            if (existingProduct) {
                // then we want to increase the qty - but we use updatedProduct to make a copy of existing product
                // Use spread to create a new object
                updatedProduct = { ...existingProduct };
                // then we can increment the qty - assuming for now, we can only add 1 each time
                updatedProduct.qty = updatedProduct.qty + 1;
                // now we use the index we got above to replace the existing product with our updated one
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            // now if product is not existing in the cart
            else {
                updatedProduct = { id: id, qty: 1 };
                // now update the cart - here we can simply add the product
                cart.products = [...cart.products, updatedProduct];
            }

            // now we need to update the price - reference the cart object - the + converts it to a number
            cart.totalPrice = cart.totalPrice + +(productPrice);

            // Now lastly we write the data back into the file. - use stringify to convert back to json
            fs.writeFile(fPath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static deleteProduct (id, productPrice) {
        // try to read the cart file
        fs.readFile(fPath, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };

            // lets get the product to be deleted in the cart
            const toBeDeleted = updatedCart.products.find(prod => prod.id === id);

            // add a check here - we want to check if the product passed in is actually in the cart
            // if it isnt, then just return - we cant remove a product from the cart if its not already there
            if (!toBeDeleted) {
                return;
            }
            // get how many times it is in the cart
            const toBeDeletedQty = toBeDeleted.qty;

            // Update the file - the products key with every item that does not match the id of the item we are removing
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);

            // now we can adjust price
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice*toBeDeletedQty;

            // write to file
            fs.writeFile(fPath, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }

    /**
     * get the cart contents from the file
     * @param {*CallBack} cb 
     */
    static getCart(cb) {
        fs. readFile(fPath, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            //run the callback on the data in the file
            if (err) {
                cb (null);
            }
            else {
                cb(cart);   
            }
        });
    }
}