const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var path = require('path');


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('./public'));
// ?app.use('/contact', express.static('././contact'))

app.get('/', (req, res) =>{
 res.render('index');
})

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/thanks', (req, res) => {
    res.status(200).render('thanks');
});

app.get('/projects', (req,res) => {
    res.render('projects');
});

module.exports = app;
