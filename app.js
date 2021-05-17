const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CONNECTION_URI = require('./utility/env').connectionUri;
const session = require('express-session');
// Here we pass session to what is a function (connect-mongodb-session) - and the result is stored in MongoDbStore
const MongoDbStore = require('connect-mongodb-session')(session);

const app = express();

// Initialize a new store for session and setup a collection in mongoDb
const store = new MongoDbStore({
    uri: CONNECTION_URI,
    collection: 'sessions'
});

// now setup the default template engine
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/errors.js')
const User = require('./models/user');
const { homedir } = require('os');

// TO STOP ERRORS RELATING TO FAVICON
app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use(bodyParser.urlencoded({extended: false}));
// this tells express to look into the public folder to serve up css files
app.use(express.static(path.join(__dirname, 'public')));

// setup a session
app.use(session({
    secret: 'secret key here',
    resave: false,
    saveUninitialized: false,
    store: store  // tell our session to store in the collection we setup above
}));

// Use the session above to insert the user that is in the session, thanks to our login controller.
// we inset it back into a mongoose user model that we can use to access our models
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
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
app.use(authRoutes);
app.use(errorController.get404);


mongoose.connect(CONNECTION_URI)
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
        }
        app.listen(3000);
    });
})
.catch(err => console.log(err));