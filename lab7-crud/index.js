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

const baseURL = "https://petstore.swagger.io/v2";

// BEGIN ROUTES
app.get('/pets', async (req,res)=>{
    // let response = await axios.get(baseURL + '/findByStatus?status=available');
    let response = await axios.get(baseURL + '/pet/findByStatus',{
        'params':{
            'status':'available'
        }
    })
   res.render('all_pets.hbs',{
       'pets': response.data
   })
})

// ask the user to provide info the for new pet via a form
app.get('/pet/create', async (req,res)=>{
    res.render('create_pet.hbs')
});

app.post('/pet/create', async (req,res)=>{
    let newPetData = {
        // the random id is only for testing
        "id": Math.floor(Math.random() * 1000000 + 999999),
        "category": {
            "id": Math.floor(Math.random() * 1000000 + 999999),
            "name": req.body.category
        },
        "name": req.body.petName,
        "status": "available"
        }
    // persist the new data via the API
    let response = axios.post(baseURL + '/pet', newPetData);
    // redirect to the '/pets' route
    res.redirect('/pets')    
});

app.get('/pet/:petid/edit', async (req,res)=>{
    // fetch the info for the particular specific pet
    let response = await axios.get(baseURL + '/pet/' + req.params.petid);
    let pet = response.data;
    res.render('edit_pet.hbs',{
        'pet': pet
    })
})

app.post('/pet/:petid/edit', async(req,res)=>{
    // fetch the pet
    let response = await axios.get(baseURL + '/pet/' + req.params.petid);
    let pet = response.data;
    let newPetData = {
        // the random id is only for testing
        "id": pet.id,
        "category": {
            "id": Math.floor(Math.random() * 1000000 + 999999),
            "name": req.body.category
        },
        "name": req.body.petName,
        "status": "available"
        }
    await axios.put(baseURL + '/pet', newPetData);
    res.redirect('/pets')
});

app.get('/pet/:petid/delete', async (req,res)=>{
    let response = await axios.get( baseURL + '/pet/' + req.params.petid);
    let pet = response.data;
    res.render('confirm_to_delete.hbs',{
        'pet': pet
    })
})

app.post('/pet/:petid/delete', async(req, res)=>{
    let response = await axios.delete(baseURL + '/pet/' + req.params.petid);
    res.redirect('/pets')
})

// END ROUTES

app.listen(3000, ()=>{
    console.log("Server is running")
})