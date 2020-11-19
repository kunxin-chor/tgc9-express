const express = require('express');
const hbs = require('hbs');

let app = express();
app.set('view engine', 'hbs')

// enable static files
app.use(express.static('public'))

// setup handlebar helpers
// be sure to `yarn add handlebar-helpers` first
var handlebars = require('handlebars');
var helpers = require('handlebars-helpers')({
  handlebars: hbs.handlebars
});


// <---- end EXPRESS SETUP ------------------------

// BEGIN ROUTES

app.get('/', (req,res)=>{
    res.render('index.hbs')
})

app.get('/hi/:name', (req,res)=>{
    let name = req.params.name;
    let luckyNumber = Math.floor(Math.random() * 100);
    res.render('hi.hbs',{
        'username': name,
        'luckyNumber' : luckyNumber
    })
})

app.get('/animal/adoption', (req,res)=>{
    let animals = ['cat', 'dog', 'horse', 'tortise'];
    res.render('adopt.hbs',{
        'animals': animals
    })
})

app.get('/animal/:choice', (req,res)=>{
   let choice = req.params.choice;
    res.render('picture.hbs', {
       'animal_choice':choice
    })
})


// END ROUTES

app.listen(3000, ()=>{
    console.log("server started")
})