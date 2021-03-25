const path = require('path');

const findDir = require('../utility/path');
const adminData = require('./admin');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('shop');
});

module.exports = router;