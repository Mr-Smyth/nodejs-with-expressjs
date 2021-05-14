
exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    // set an isLoggedIn variable - and set it to true
    // we cannot save this to the request - as once we redirect - this request is done/dead/finished
    // So we should use a global variable - and store it in a cookie
    // this is because we are simply assuming the authentication is ok - and the user logged in ok

    // set a cookie manually
    // This is normally handled with sessions
    res.setHeader('Set-Cookie', 'isLoggedIn=true'); // options include setting Expires, Max-Age, Http or Secure, Domain etc

    res.redirect('/');
};