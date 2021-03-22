const express = require('express');

const app = express();

app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use('/', (req, res, next) => {
    console.log("Im First - im here to demonstrate that i will always run - then i use next to pass the request on...");
    next();
});

app.use('/next-page', (req, res) => {
    console.log("Im the next-page middleware - i must execute before the request gets to the '/' middleware ");
    res.send('<h1>This is the "next-page" page</h1>');
});

app.use('/', (req, res) => {
    console.log("Im the '/' Middleware - im only executed if im reached");
    res.send('<h1>This is the "/" Page</h1>');
});

app.listen(3000);
