// ====== REQUIRES ======
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
    });
};

exports.postLogin = (req, res, next) => {
    // firstly get the data from the form
    const email = req.body.email;
    const password = req.body.password;

    // Once session has been installed and setup in app.js - session is now part of the request object
    // we can add any key we want to it
    User.findOne({email: email })
    .then(user => {

        if (!user) {
            return res.redirect('/login');
        }

        // now use bcrypt to compare stored hashed password with the hashed version of what the user entered.
        bcrypt.compare(password, user.password)
        .then(result => {
            // here we get a true if they are equal,  or false if they are not equal
            if (result) {
                // we add our new mongoose user model object to the request
                req.session.isLoggedIn = true;
                req.session.user = user;

                // call save on the session so that we can ensure the session has been created before we redirect - 
                // this way we can avoid possible errors where the redirect is done before the session is created successfully
                return req.session.save(err => {
                    if (!err) {
                        res.redirect('/');
                    }
                    console.log(err);
                })
            }

            // else - not a match - redirect to login
            res.redirect('/login');

        })
        .catch(err => {
            console.log(err);
            return res.redirect('/login');
        });

        
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup',
    });
};

exports.postSignup = (req, res, next) => {

    // get form data - without validation
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    // check if user exists - try to find it
    User.findOne({email: email})
    .then(userDoc => {
        if (userDoc) {
            return res.redirect('/signup');
        }
        
        // if we get here - we can go ahead and create a new user
        // create a hashed password - 12 represents an approved salt value
        return bcrypt.hash(password, 12)
        // then we have a hashed password - create the user
        .then(hashedPassword => {
            user = new User({username: username,
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            });
            // save it to mongo
            return user.save();
        })
        // then we have the result of the user creation
        .then(result => {
            res.redirect('/login');
        });

    })
    .catch(err => console.log(err));
};


exports.getLogout = (req, res, next) => {
    res.render('auth/logout', {
        pageTitle: 'Logout',
        path: '/logout',
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if(!err) {
            return res.redirect('/');
        }
        console.log(err);
    });
};
