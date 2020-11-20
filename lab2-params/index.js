const express = require('express')

// create a new server software
let app = express();

// BEGIN ROUTES HERE
app.get('/hi/:name', (req,res)=>{
    let name = req.params.name;
    res.send("Hi " + name);
})

app.get('/number/:num', function(req,res){
    // whatever we get as a route parameter is ALWAYS a string
    let num = parseInt(req.params.num);
    num = num + 10;
    res.send(num + "");
})

// END ROUTES HERE

app.listen(3000, ()=>{
    console.log("Server is listening at port 3000")
})

// NOTHING PAST THIS POINT