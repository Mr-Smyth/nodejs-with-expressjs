const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const findDir = require('./utility/path');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use(bodyParser.urlencoded({extended: false}));

// outsourced routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// add a 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(findDir, 'views', '404.html'));
});

app.listen(3000);
