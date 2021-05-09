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
    User.findById('609849aee999b92ee0c1d6f6')
    .then(user => {
        // we add our new mongoose user model object to the request
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


mongoose.connect(connectionUri)
.then(result => {
    // check have we already got a user
    User.findOne()
    .then(user => {
        if (!user) {
            // create a new user
            const user = new User({
                username: 'Eamonn',
                email: 'eamonn@homedir.ie',
                cart: {
                    items: []
                }
            });
            user.save();
            app.listen(3000);
        }
    });
})
.catch(err => console.log(err));