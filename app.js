const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// now setup the default template engine
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/errors.js')
// get our database connection
const sequelize = require('./utility/database');

// importing both models so we can relate them
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use(bodyParser.urlencoded({extended: false}));
// this tells express to look into the public folder to serve up css files
app.use(express.static(path.join(__dirname, 'public')));

// register a new middleware to get the user set into the request object
app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        // then set the user in the request - user is a sequelize object
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });
});

// outsourced routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// --------------------------------------------------------------------------------------------- //
// ------------------------------------  Associations  ----------------------------------------- //

// relate our models - CASCADE IT SO ANY PRODUCTS BELONGING TO A DELETED USER ARE ALSO DELETED
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE' });
// THIS IS OPTIONAL - AND COULD ALSO BE USED INSTEAD OF ABOVE BELONGSTO, WE ARE ADDING IT HERE TO BE CLEAR ABOUT THE RELATIONSHIP
User.hasMany(Product);

// either of these 2 will add a user id to the cart
User.hasOne(Cart);
Cart.belongsTo(User);

// this only works with an intermediary table which connects them - in this case that is the cart-items table.
// so we will tell sequelize where these connections should be stored - in the CartItem model - the inbetween model
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// -------------------------------------------------------------------------------------------- //

// sequelize.sync({ force: true })
sequelize.sync()
.then(() => {
    return User.findByPk(1);
})
.then(user => {
    if (!user) {
        return User.create({ username: 'Eamonn', email: 'eamonn@test.com'});
    }
    return user;
})
.then(user => {

    // need a nested block here to check for existing cart
    user.getCart()
    .then(cart => {
        // if there is a cart - return it
        if (cart) {
            return cart;
        }
        // otherwise create one
        return user.createCart();
    })
})
.then(cart => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});

