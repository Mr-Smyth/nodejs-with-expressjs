const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("Im here");
    next();
});

app.use((req, res, next) => {
    console.log("Im also here because of next() in prev middleware");
    res.send('<h1>This is the send method</h1>');
});

const server = http.createServer(app);
server.listen(3000);