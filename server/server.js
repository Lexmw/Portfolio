const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const request = require('request');
const axios = require('axios');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('./public'));

app.get('/', (req, res) =>{
 res.render('index');
})

app.get('/contact', (req,res) => {
    res.render('contact');
})

app.get('/thanks', (req,res) => {
    
    res.render('thanks', {contact: req.body});
})

app.post('/thanks', (req, res) => {

    res.render('thanks', {contact: req.body});
});

app.get('/projects', (req,res) => {
    res.render('projects');
});

app.get('*', function (req, res) {
    res.send('Sorry, this page does not exist 😥').status(404);
});


module.exports = app;
