const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// now setup the default template engine
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/errors.js')

app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use(bodyParser.urlencoded({extended: true}));
// this tells express to look into the public folder to serve up css files
app.use(express.static(path.join(__dirname, 'public')));

// outsourced routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);
