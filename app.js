const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// now setup the default template engine
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/errors.js')
// get our database connection
const db = require('./utility/database');

app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

// test sql database query
db.execute('SELECT * FROM products')
// then execute an anonymous function
.then(result => {
    console.log(result[0]);
})
// this executes in case of an error
.catch(err => {
    console.log(err);
});

app.use(bodyParser.urlencoded({extended: false}));
// this tells express to look into the public folder to serve up css files
app.use(express.static(path.join(__dirname, 'public')));

// outsourced routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);
