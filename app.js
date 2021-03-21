const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("Im here");
    next();
});

app.use((req, res, next) => {
    console.log("Im also here");
    // ... response here
});

const server = http.createServer(app);
server.listen(3000);