const path = require('path');

const findDir = require('../utility/path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log("Im the '/' Middleware page");
    // res.send('<h1>This is the "/" Page</h1>');
    res.sendFile(path.join(findDir, 'views', 'shop.html'));
});

module.exports = router;