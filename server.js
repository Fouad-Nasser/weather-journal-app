// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Determine the port
const port = 3000;

// Spin up the server
const server = app.listen(port,listening);

// Callback to debug
function listening()
{
    console.log(`server running on http://localhost:${port}`);
}


// Get Route
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (request, response) {
  response.send(projectData);
};


// Post Route
app.post('/add', postData);

// Callback function to complete Post '/add'
function postData (request, response) {
  projectData = request.body;
  response.send(projectData);
  console.log(projectData);
};