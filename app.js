// ====== REQUIRES ======
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// file upload related
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// const CONNECTION_URI = require('./utility/env').connectionUri;
require('dotenv').config();

const session = require('express-session');
const flash = require('connect-flash');

// csrf - step 1 install and require csurf
const csrf = require('csurf');
// Here we pass session to what is a function (connect-mongodb-session) - and the result is stored in MongoDbStore
const MongoDbStore = require('connect-mongodb-session')(session);

const app = express();

// Initialize a new store for session and setup a collection in mongoDb
const store = new MongoDbStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

// csrf - step 2 initialize
const csrfProtection = csrf();


// now setup the default template engine
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/errors.js')
const User = require('./models/user');
const { homedir } = require('os');

// file upload related
const fileStorage = multer.diskStorage({
    // destination is a function we will make an arrow with a cb that we must call when done setting destination
    destination: (req, file, cb) => {
        // first param can be an error - we set it to null
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + file.originalname);
    }
});

// filter the types of files we can upload with multer
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        // then its true - so we call the cb with true
        cb(null, true);
    }
    else {
        // its false - file is of another type
        cb(null, false);
    }
};

// TO STOP ERRORS RELATING TO FAVICON
app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use(bodyParser.urlencoded({extended: false}));

// file upload related
app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('image'));

// this tells express to look into the public folder to serve up css files as though they were in the route folder
app.use(express.static(path.join(__dirname, 'public')));

// Says where to look for our static images - but we do not want to serve them as though they were in the route - we want to leave them in the images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// setup a session
app.use(session({
    secret: 'secret key here',
    resave: false,
    saveUninitialized: false,
    store: store  // tell our session to store in the collection we setup above
}));

// initialize connect-flash
app.use(flash());

// csrf - step 3 - after session is initialized we use the csrf, this is because csrf uses the session
app.use(csrfProtection);

// csrf - step 4 - add a normal middleware - to tell express to include csrf in all of our views using '.locals.
// we can also include isAuthenticated check'
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    res.locals.currentUser = req.session.user;
    next();
});

// Use the session above to insert the user that is in the session, thanks to our login controller.
// we inset it back into a mongoose user model that we can use to access our models
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        // check if we did not get a user
        if (!user) {
            return next();
        }
        // we add our new mongoose user model object to the request
        req.user = user;
        next();
    })
    .catch(err => {
        // to allow for throwing of errors within the async bolcks above - we need to call next(with an error)
        next(new Error(err));
    });
});

// outsourced routes - Middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get500);
app.use(errorController.get404);

// special error handling middleware - errors passed to next() will skip to here
// if you need more than 1 error handling middleware - they will execute from top to bottom
app.use((error, req, res, next) => {
    // res.status(error.httpStatusCode).render(.....)
    // res.redirect('/500');
    res.render('500', {
        pageTitle: 'Error - 500 - Things have really gone south!!',
        path: '/500',
    });
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err));

// test change 2