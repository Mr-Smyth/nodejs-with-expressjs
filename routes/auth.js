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

module.exports = router;