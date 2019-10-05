const express  = require('express');
const bodyParser = require('body-parser'); // parse the data middleware
const mongoose = require('mongoose'); // mongoose schema
const morgan = require('morgan'); //log every request
const users = require('./routes/users'); //set route path for users
const articles = require('./routes/articles');//set route path for articles
const config = require('./config/database');
const cors = require('cors');

// setup Database
mongoose.connect(config.uri, { useNewUrlParser: true }, (err) => {
    if(err) {
        console.log('could not connect to the database');
    } else {
        console.log('connected to database: ' + config.db);
    }
});

// initialze Express
const app = express();

//set the secret key
app.set('superSecret', config.secret);

// bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

// log every request to the console
app.use(morgan('dev')); 

// cors
app.use(cors());

// set the port
const Port = 3000; 

//Use external roures
app.use('/users', users);
app.use('/article', articles);

// Listen the server
app.listen(Port, () => {
    console.log('Magic happens on PORT: ' + Port);
});
