const express = require('express');

// ====== setup express validator - STEP 1 ======
// using destructuring we extract a check function from express-validator/check

// ====== see https://www.npmjs.com/package/validator for more validators ==== 
const { check } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');

// get our authentication check middleware
const isAuth = require('../middleware/is-auth');

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

// ====== setup express validator - STEP 2 ======
// enter check as middleware and use a method called isEmail
// what this does is store or collect any possible errors and we can access them in the controller using validationResult()
router.post('/signup',
check('email').isEmail().withMessage('Please enter a valid email address')
// add a custom check to the email validation
.custom((value, { req }) => {
    if (value === 'test@test.com') {
        throw new Error('This email address is not allowed.');
    }
    return true;
}),
check('username').isLength({min: 6, max: 12}).withMessage('Please enter a valid Username between 6 and 12 characters'),

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