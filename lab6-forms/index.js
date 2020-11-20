// const means never changes - short for constant
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

// give me a new instance of an express application
// the `app` variable shouldn't be changed
const app = express();

// setup the view engine
app.set('view engine', 'hbs');
app.use(express.static('public'));

// setup wax on so that it will works with hbs
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

// setup forms
app.use(express.urlencoded({
    extended: false
}))

const fruitsLookup = {
    'apple':3,
    'durian':15,
    'orange':6,
    'banana':4
}

// BEGIN ROUTES
app.get('/food', (req,res)=>{
    res.render('enter_food.hbs')
})

app.post('/food', (req,res)=>{
    console.log(req.body);
    // let tags = req.body.tags;
    // if (! Array.isArray(tags)) {
    //     tags = [ tags];
    // }

    // let tags = Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags];
    // console.log(tags);
    // res.send(req.body);

    // let name = req.body.name;
    // let meal = req.body.meal;
    // let tags = req.body.tags;
    // ==>
    let { food, meal, tags} = req.body;

    // res.render('summary.hbs', {
    //     'foodName': foodName,
    //     'meal': meal,
    //     'tags': tags
    // })
    // ==>
    res.render('summary.hbs', {
        food, meal, tags
    })
})

// display the form
app.get('/calculate_bmi', (req,res)=>{
    res.render('calculate_bmi.hbs')
})

app.post('/calculate_bmi', (req,res)=>{
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);
    // or we can use destructuring
    // let {weight height} = req.body;
    let bmi = weight / (height * height);
    res.render('bmi_results.hbs',{
        'bmi': bmi
    })
})

// display the form
app.get('/fruits', (req,res)=>{
    res.render('fruits.hbs');
})

app.post('/fruits', (req,res)=>{
    let fruits = req.body.items;
    let totalCost = 0;
    for (let f of fruits) {
        totalCost += fruitsLookup[f];
    }
    res.render('fruit_cost.hbs',{
        'totalCost': totalCost
    })

})

// END ROUTES

app.listen(3000, ()=>{
    console.log("Server has started");
})