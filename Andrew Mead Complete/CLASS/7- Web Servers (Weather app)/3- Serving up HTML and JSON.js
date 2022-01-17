/*Here we will be learning how to serve html & json file so instead of sending just a string, we can display html or json to the user.*/

//app,js
//loading in express
const express = require("express");

//creating a new express app
const app = express();

//Serving up HTML
app.get("", (req, res) => {
  res.send("<h1>Weather</h1>");
});

//Serving up JSON file
app.get("/help", (req, res) => {
  //here we pass an object but during runtime, express will automatically stringify the object and return it as JSON
  res.send({
    name: "Andrew",
    age: 27
  });
});

//Serving up JSON file
app.get("/help", (req, res) => {
  //here we pass an array of objects
  res.send([
    {
      name: "Andrew",
      age: 27
    },
    {
      name: "Michaelz",
      age: 28
    }
  ]);
});

//Starting up the server
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

/*CHALLENGE : - Update routes
1-  Setup about route to render a title with HTML
2-  Setup a weather route to send back JSON
        Object with forecast and location strings
3-  Test your work by visiting both in the browser*/

//loading in express
const express = require("express");

//creating a new express app
const app = express();

//Serving up HTML
app.get("", (req, res) => {
  res.send("<h1>Weather</h1>");
});

//Serving up JSON file
app.get("/help", (req, res) => {
  //here we pass an array of objects
  res.send([
    {
      name: "Andrew",
      age: 27
    },
    {
      name: "Michaelz",
      age: 28
    }
  ]);
});

//ds is for e.g. app.com/about i.e. the homepage
app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});

//ds is for e.g. app.com/weather i.e. the homepage
app.get("/weather", (req, res) => {
  res.send({
    location: "Lagos",
    forecast: "It is raining"
  });
});

//Starting up the server
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
