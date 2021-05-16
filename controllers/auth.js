const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    // Once session has been installed and setup in app.js - session is now part of the request object
    // we can add any key we want to it
    User.findById('609849aee999b92ee0c1d6f6')
    .then(user => {
        // we add our new mongoose user model object to the request
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });


};


// register a new middleware to get the user set into the request object
// app.use((req, res, next) => {
//     User.findById('609849aee999b92ee0c1d6f6')
//     .then(user => {
//         // we add our new mongoose user model object to the request
//         req.user = user;
//         next();
//     })
//     .catch(err => {
//         console.log(err);
//     });
// });