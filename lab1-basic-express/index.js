const express = require('express');

// express is a function that will create a new express object 
// one express object represents one server (application/software)
let app = express();

// TYPE CODE HERE!!!
app.get('/', function(request,response){
    // request is what the client send us
    // response is what we (the server software) will send back
    response.send("Hello world")
})

app.get('/about-us', (req,res)=>{
    let luckyNumber = Math.floor(Math.random() * 100);
    res.send("<h1>About Us</h1><p>ACME Products has been dropping anvils on roadrunners since 1890s. Your lucky number is " + luckyNumber);
})

app.listen(3000, function(){
    console.log("Server started");
});

// NO CODE AFTER THIS

