const express = require('express');

// ====== setup express validator - STEP 1 ======
// using destructuring we extract a check function from express-validator/check

// ====== see https://www.npmjs.com/package/validator for more validators ==== 
const { check, body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');
const User = require('../models/user');

// get our authentication check middleware
const isAuth = require('../middleware/is-auth');

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
    [
    check('email', 'Please enter a valid email address to login')
        .isEmail()
        // add a sanitizer to make sure email is stored properly - ie - all lower case etc
        .normalizeEmail(),
    body('password', 'Password must be between 6 and 16 alphanumeric characters')
        .isLength({min: 6, max: 16})
        .isAlphanumeric()
        // add sanitizer to make sure no white space
        .trim(),
    ],
 authController.postLogin);

// ====== setup express validator - STEP 2 ======
// enter check as middleware and use a method called isEmail
// what this does is store or collect any possible errors and we can access them in the controller using validationResult()
router.post('/signup',
// check email
check('email').isEmail().withMessage('Please enter a valid email address')

// add a custom check to the email validation
.custom((value, { req }) => {
    // if (value === 'test@test.com') {
    //     throw new Error('This email address is not allowed.');
    // }
    // return true;

    // check if email already exists in Db
    return User.findOne({email: value})
    .then(userDoc => {
        if (userDoc) {
            // that means something is in userDoc - that also means the email already exists
            // Promise.reject will throw an error from inside the promise - with the included message
            return Promise.reject('Email already exists, please pick another one.');
        }
    });
})
// add a sanitizer to make sure email is stored properly - ie - all lower case etc
.normalizeEmail(),
// check username
check('username', 'Please enter a valid Username between 6 and 12 characters')
.isLength({min: 4, max: 12})
.isAlphanumeric()
// add sanitizer to make sure no white space
.trim(),
// check password
body('password', 'Please enter a password with only numbers and text, with at least 6 characters and with a maximum of 16')
.isLength({min: 6, max: 16})
.isAlphanumeric()
// add sanitizer to make sure no white space
.trim(),
// check for password equality
body('confirmPassword', 'Your repeat password does not match, please check required password and try again')
// add sanitizer to make sure no white space
.trim()
.custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error();
    }
    return true;
}),

authController.postSignup);

router.get('/logout',isAuth, authController.getLogout);

router.post('/logout',isAuth, authController.postLogout);

// gets the password reset request screen
router.get('/reset', authController.getReset);

// handles the post from the request password reset - handles email link
router.post('/reset', authController.postReset);

// load the enter new password form screen - what user sees when they click on emailed reset link
router.get('/reset/:token', authController.getNewPassword);

// handles the updating of the users password
router.post('/new-password', authController.postNewPassword);

module.exports = router;