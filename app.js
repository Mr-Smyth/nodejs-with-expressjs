const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectionUri = require('./utility/env').connectionUri;

const app = express();

// now setup the default template engine
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/errors.js')
const User = require('./models/user');
const { homedir } = require('os');


app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use(bodyParser.urlencoded({extended: false}));
// this tells express to look into the public folder to serve up css files
app.use(express.static(path.join(__dirname, 'public')));

// register a new middleware to get the user set into the request object
app.use((req, res, next) => {
    User.findById('60912a53cb8bb4b081700789')
    .then(user => {
        // we want to make req.user an instance of User - so we can use all the methods
        req.user = new User(user.username, user.email, user.cart, user._id);
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

console.log(connectionUri);

mongoose.connect(connectionUri)
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err));