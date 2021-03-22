const express = require('express');
const bodyParser = require('body-parser');

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
    res.status(404).send('Sorry but we cannot find that page<br><a href="/"><button>Back to safety..</button></a>')
});

app.listen(3000);
