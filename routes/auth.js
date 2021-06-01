const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

// get our authentication check middleware
const isAuth = require('../middleware/is-auth');

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

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