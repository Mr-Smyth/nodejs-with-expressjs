const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    console.log("Im the add-product page");
    res.sendFile(path.join(__dirname, '../', 'views', 'admin.html'))
});

/**
 * Adding .post restricts the middleware to only post requests
 */
router.post('/product', (req, res, next) => {
    // get the body of the incoming request to extract what was sent
    // using bodyParser
    console.log(req.body);
    // redirect to / page
    res.redirect('/');
});

module.exports = router;