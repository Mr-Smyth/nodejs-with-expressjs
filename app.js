const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// now setup the default template engine
app.set('view engine', 'ejs');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/errors.js')
const mongoConnect = require('./utility/database');


app.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end();
});

app.use(bodyParser.urlencoded({extended: false}));
// this tells express to look into the public folder to serve up css files
app.use(express.static(path.join(__dirname, 'public')));

// register a new middleware to get the user set into the request object
app.use((req, res, next) => {
    // User.findByPk(1)
    // .then(user => {
    //     // then set the user in the request - user is a sequelize object
    //     req.user = user;
    //     next();
    // })
    // .catch(err => {
    //     console.log(err);
    // });
});

// outsourced routes
// app.use('/admin', adminRoutes);
// app.use(shopRoutes);
// app.use(errorController.get404);

// call our mongoConnect method in database.js
mongoConnect(client => {
    console.log(client);
    app.listen(3000);
});

