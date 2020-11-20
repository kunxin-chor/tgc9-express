// const means never changes - short for constant
const express = require('express');
const hbs = require('hbs');


// give me a new instance of an express application
// the `app` variable shouldn't be changed
const app = express();

// setup the view engine
app.set('view engine', 'hbs');
app.use(express.static('public'));

// for the view function (the 2nd arugment)
// it's always request, then response
app.get('/', (req,res)=>{
    let luckyNumber = Math.floor(Math.random() * 1000 + 1000);
    res.render('index.hbs',{
        'your_lucky_number': luckyNumber
    })
})

app.get('/info/:message', (req,res)=>{
    let message = req.params.message;
    res.render('say_something.hbs',{
        'message': message
    })
})



app.listen(3000, ()=>{
    console.log("Server is running")
})




