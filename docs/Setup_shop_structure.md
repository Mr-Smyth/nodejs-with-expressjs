# Setting up the shop structure

## Setting up our views

+   we want to add to our views so we will group them in sub folders of the views folder
+   admin - contains all admin related pages such as add-products
+   shop - contains all customer facing pages

+   Setup all routes and controllers to suit new templates - this requires some refactoring of the code, for example we will split the controllers up into folders 1 for admin and 1 for shop. The routes will have to adjust the path of the imports to match these changes.

## Adding some fields to the form

+   We want to get some more data into our project so we add some more fields to our models properties.
+   Next add the form elements to the add-product page.
+   In our postAddProducts controller - extract the new fields - const price = req.body.price - make sure to match the name property from the form.
    ```
    exports.postAddProduct = (req, res, next) => {
        // push the returned data to the products array
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const product = new Product(title, imageUrl, price, description);
        product.save();
        res.redirect('/');
    };
    ```
+   
