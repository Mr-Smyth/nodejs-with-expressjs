const path = require('path');

const findDir = require('../utility/path');
const adminData = require('./admin');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log("Im the '/' Middleware page");
    console.log('shop.js', adminData.products);
    res.sendFile(path.join(findDir, 'views', 'shop.html'));
});

module.exports = router;