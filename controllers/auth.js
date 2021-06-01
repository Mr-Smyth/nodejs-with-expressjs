// ====== REQUIRES ======
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// ====== EMAILS - SETUP ======
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5f11b7883cab99",
      pass: "89d2b76e180136"
    }
  });


exports.getLogin = (req, res, next) => {
    let message = req.flash('loginError');
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMsg: message
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
            req.flash('loginError', 'Invalid Username or Password');
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
            req.flash('loginError', 'Invalid Username or Password');
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
    let message = req.flash('signupError');
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    res.render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup',
        errorMsg: message
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
            req.flash('signupError', 'Email exists already');
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
            // send an email after signup - use transporter - it gives a promise so we return it
            return transport.sendMail({
                to: email,
                from: 'registration@node-shop.com',
                subject: 'Signup succeeded',
                html: '<h1>You signed up - well done</h1>'
            });
        })
        // catch any errors in email
        .catch(err => console.log(err));

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

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    }
    else {
        message = null;
    }
    res.render('auth/reset', {
        pageTitle: 'Reset Password',
        path: '/reset',
        errorMsg: message
    });
};

// here we need to generate a token we can send with a reset request email link
// node has a crypto library for this - which we import at top of page
exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        // get the token from the buffer then, and convert the hex value in the buffer to a string
        const token = buffer.toString('hex');

        // then we need to store this token within the user - so first find the user with mongoose
        User.findOne({email: req.body.email})

        // create the propper fields in our user model - resetToken and resetTokenExpiration
        .then(user => {
            if (!user) {
                req.flash('error', 'No account with that email address currently exists');
                return res.redirect('/reset');
            }
            user.resetToken = token;
            // set expire to date plus one hour in mili seconds
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
        })
        .then(result => {
            res.redirect('/');
            console.log('reset sent')
            transport.sendMail({
                to: req.body.email,
                from: 'registration@node-shop.com',
                subject: 'Password Reset',
                html: `
                <p>You have requested a password reset for : ${req.body.email}</p>
                <p>Click the link below to reset your password:</p>
                <p>Reset link: <a href="http://localhost:3000/reset/${token}">link</a></p>
                `
            });
        })
        .catch(err => console.log(err));
    })
};

exports.getNewPassword = (req, res, next) => {

    // retrieve the token from the url
    const token = req.params.token;
    // find the user by the token, and use $gt to check if expiry on token is greater than current date
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
    .then(user => {
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        res.render('auth/new-password', {
            pageTitle: 'New Password',
            path: '/new-password',
            errorMsg: message,
            // need to send in the users id and will include it as hidden in the form - so we can update the correct users password
            userId: user._id.toString()
        });
    })
    .catch(err => console.log(err));

};