const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const request =require('superagent')

const app = express();
let contactList = [];

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

app.post('/thanks', (req, res) => {
    const contact ={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    
    contactList.push(contact);
    console.log(contactList)
    
    request
    .post(`https://s20.${process.env.MC_KEY}.mailchimp.com/3.0/list/40f9604d50/members/`)
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + new Buffer('any:' + process.env.MC_KEY ).toString('base64'))
    .send({
        'email_address': req.body.email,
        'status': 'subscribed',
        'merge_fields': {
            'FNAME': req.body.firstName,
            'LNAME': req.body.lastName
        }
    })
    res
        .status(200)
        .render('thanks', {contact: req.body});
        
        //     .end(function(err, res) {
        //       if (res.status < 300 || (res.status === 400 && res.body.title === "Member Exists")) {
        //         res.send('Signed Up!');
        //       } else {
        //         res.send('Sign Up Failed :(');
        //       }
        //   });
});

app.get('/projects', (req,res) => {
    res.render('projects');
});

app.get(`https://s20.${process.env.MC_KEY}.mailchimp.com/3.0/list/40f9604d50/members/`, (req, res) =>{
    res.send({contact: req.body})
    console.log('sent to mailchimp');
})

module.exports = app;
