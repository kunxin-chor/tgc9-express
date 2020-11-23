// SETUP
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const fs = require('fs'); // import in the file system

let app = express();
// set which view engine to use
app.set('view engine', 'hbs');

// set where to find the static files
app.use(express.static('public'))

// setup wax on for template inhteritance
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// setup forms
app.use(express.urlencoded({
    extended:false
}))

const helpers = require('handlebars-helpers')({
  handlebars: hbs.handlebars
});


function loadDatabase() {
     // the first arugment is the RELATIVE path to the file 
    const data = fs.readFileSync('./data.json', {
        'encoding': 'utf8'
    });
    // convert the JSON string into a JSON object
    const database = JSON.parse(data);

    return database;
}

function find(habitId, database) {
    console.log("habitId=", habitId);
    let habit = null;
    for (let eachRecord of database) {
        if (eachRecord.id === parseInt(habitId)) {
            habit = eachRecord;
            break;
        }
    }
    return habit;
}

// ROUTES
app.get('/habits', (req,res)=>{
   
    const database = loadDatabase();

    res.render('habits.hbs', {
        'habits': database
    });
})


// show the form
app.get('/habits/new', (req,res)=>{
    res.render('new_habits.hbs');
})


app.post('/habits/new', (req,res)=>{
    let tags = req.body.tags;
    if (!tags) {
        tags = [];
    }
    if (!Array.isArray(tags)) {
        tags = [tags];
    }

    let habitName = req.body["habit-name"];

    let data = {
        'id': Math.floor(Math.random() * 100000),
        'name': habitName,
        'count': 0,
        'tags': tags
    }

    // doing the actual saving
    let database = loadDatabase();
    database.push(data);

    let jsonString = JSON.stringify(database);
  
    fs.writeFileSync("data.json", jsonString);
    res.send(req.body);
})

app.get('/habit/:habit_id/update', (req,res)=>{
    let database = loadDatabase();
    let habit = find(req.params.habit_id, database);

    res.render('update_habit.hbs',{
        'habit': habit
    })
});

app.post('/habit/:habit_id/update', (req,res)=>{
   let database = loadDatabase();
   let habit = find(req.params.habit_id, database);

   // if req.body.tags is undefined, assign empty array to tags
   // else assign whatever is in req.body.tags to the tags variable
   // i.e to enforce default values in case of null or undefined
    let tags = req.body.tags || [];

    // if tags is already an array, we just assign it back to itself
    // otherwise, we change tags to an array with one element
    // and assign back to itself.
    tags = Array.isArray(tags) ? tags : [tags];

   habit.name = req.body['habit-name'];
   habit.count = req.body.count;
   habit.tags = tags;

   let jsonString = JSON.stringify(database);
   fs.writeFileSync("data.json", jsonString);

   res.redirect('/habits')
})

app.get('/habit/:habit_id/delete', (req,res)=>{
    const db = loadDatabase();
    let habit = find(req.params.habit_id, db);
    res.render('confirm_to_delete.hbs', {
        'habit': habit
    })
})

app.post('/habit/:habit_id/delete', (req,res)=>{
    let db = loadDatabase();
    let habit = find(req.params.habit_id, db);
    let newDatabase = [];
    for (let eachRecord of db) {
        if (eachRecord.id !== habit.id) {
            newDatabase.push(eachRecord);
        }
    }

   let jsonString = JSON.stringify(newDatabase);
   fs.writeFileSync("data.json", jsonString);

   res.redirect('/habits')

})

// LISTEN
app.listen(3000, ()=>{
    console.log("Server started");
})