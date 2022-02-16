// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;

// Setup Server

const server = app.listen(port, listening);
function listening(){
  console.log('Server Running');
  console.log(`running on localhost: ${port}`);
};

// POST weather Data

app.post('/postWeather', addWeather);

function addWeather (req,res){

    // Create new entry for JS Object projectData

    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        feelings:req.body.feelings
    }

    Object.assign(projectData, newEntry);
    console.log(projectData);
    res.send(projectData);

};

//https://knowledge.udacity.com/questions/335926 

// Get Weather Data

app.get('/getWeather', function (req, res) {
    console.log("Get request OK.");
    res.send(projectData);
  })

