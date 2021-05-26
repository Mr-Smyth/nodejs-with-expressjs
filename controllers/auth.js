const User = require('../models/user');

exports.getLogin = (req, res, next) => {
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

        // call save on the session so that we can ensure the session has been created before we redirect - 
        // this way we can avoid possible errors where the redirect is done before the session is created successfully
        req.session.save(err => {
            console.log(err);
            res.redirect('/');
        })
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getLogout = (req, res, next) => {
    res.render('auth/logout', {
        pageTitle: 'Logout',
        path: '/logout',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};
