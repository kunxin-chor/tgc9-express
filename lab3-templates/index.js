const express = require('express');
const hbs = require('hbs');

let app = express();
app.set('view engine', 'hbs')

// enable static files
app.use(express.static('public'))

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

// END ROUTES

app.listen(3000, ()=>{
    console.log("server started")
})