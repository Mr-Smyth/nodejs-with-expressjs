
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
    req.session.isLoggedIn = true;
    res.redirect('/');
};