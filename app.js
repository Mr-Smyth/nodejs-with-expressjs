const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use('/add-product', (req, res, next) => {
    console.log("Im the add-product page");
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button>Submit</button></form>');
});

app.use('/product', (req, res, next) => {
    // get the body of the incoming request to extract what was sent
    console.log(req.body);
    // >> undefined

    // redirect to / page
    res.redirect('/');
});

app.use('/', (req, res) => {
    console.log("Im the '/' Middleware - im only executed if im reached");
    res.send('<h1>This is the "/" Page</h1>');
});

app.listen(3000);
