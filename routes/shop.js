const express = require('express');

const router = express.Router();

router.use('/', (req, res) => {
    console.log("Im the '/' Middleware page");
    res.send('<h1>This is the "/" Page</h1>');
});

module.exports = router;