// const means never changes - short for constant
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const axios = require('axios');

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

const baseURL = "https://petstore.swagger.io/v2/pet";

// BEGIN ROUTES
app.get('/pets', async (req,res)=>{
    // let response = await axios.get(baseURL + '/findByStatus?status=available');
    let response = await axios.get(baseURL + '/findByStatus',{
        'params':{
            'status':'available'
        }
    })
   res.render('all_pets.hbs',{
       'pets': response.data
   })
})

// END ROUTES

app.listen(3000, ()=>{
    console.log("Server is running")
})