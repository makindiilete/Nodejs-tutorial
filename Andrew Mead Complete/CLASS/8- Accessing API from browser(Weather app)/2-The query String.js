/*THE BIG PICTURE GOAL FOR THIS SECTION : - The goal is to allow users to be able to fetch a forecast for their location from the weather website. So instead of running a command in the terminal to get the forecast, they will be able to pull up a url in the browser, they will see a form and they will type their address into the form input and click a button and after a few ms later, the weather forecast shows up.

To be able to do this, we will need to fill up our "/weather" route which will contain codes for our goecode and forecast. The browser will send the address typed into the input to the route and the route will use the address to generate the forecast. The browser will be able to communicate and send the address user typed via QUERY STRING

QUERY STRING: - a query string we already used before is appended to a url starting with a question mark and then a key value pair e.g. localhost:3000/products?key=value
localhost:3000/products?search=games

When we type this in the browser and send, this new url is send back to express with the new value "search=games"

We can support as many query string as possible since we are the one creating the backend, to add another query string, we use the "&" follow by another key value pair.

localhost:3000/products?search=games&rating=5

Here the user is searching for games with 5 star rating.


HOW DO THIS QUERY STRING GET ACCESSED BY EXPRESS?
Express get this via the function req.query()
*/

//app.js
//Query string experiment
app.get("/products", (req, res) => {
  //Dumping the req.query to the console to see what we get back
  console.log(req.query);
  res.send({
    products: []
  });
});

/*If we run the app and go to the browser and visit "localhost:3000/products?search=games",
back to the console we get an object with the property "search"
{ search: 'games' }

"localhost:3000/products?search=games&rating=5",
back to the console we get an object
{ search: 'games', rating: '5' }

*/

/*ACCESSING VALUES OF THE QUERY STRING OBJECTS*/
//Query string experiment
app.get("/products", (req, res) => {
  //accessing the value of the search property
  console.log(req.query.search);
  res.send({
    products: []
  });
});
/*in the browser we visit:
"localhost:3000/products?search=games&rating=5"
Back to the console, we get back
games
*/

/*HOW TO FORCE A QUERY STRING TO BE PROVIDED : - We can validate our url to enforce a specific query string is provided, else we will not send back the response*/

//app.js
//Query string experiment
app.get("/products", (req, res) => {
  //if a "search" query string is not provided we send an error response
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

/*If we go to the browser and enter a url that do not contain our a query string with the "search" key e.g. localhost:3000/products

We get back our JSON containing our error object : -
{
error: "You must provide a search term"
}


Now if we check the terminal, we have a bunch of error messages with the top one "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client".....
We get this error because we used the "res.send" twice, this is not allowed. Http requests take only one request that goes to the server and a single response that comes back. We can fix this by adding "return" to the end of the first validation code*/

//Query string experiment
app.get("/products", (req, res) => {
  //if a "search" query string is not provided we send an error response and "return" to stop further execution of the code
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term"
    });
    return;
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

/*We can fix this by using else statement*/
//Query string experiment
app.get("/products", (req, res) => {
  //if a "search" query string is not provided we send an error response
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term"
    });
  }
  //if there is a search property
  else {
    console.log(req.query.search);
    res.send({
      products: []
    });
  }
});

/*CHALLENGE : - Update weather endpoint to accept address
1-  No address? Send back an error message
2-  Address? Send back the static JSON
        Add address property onto JSON which returns the provided address
3-  Test /weather and /weather?address=philadelphia*/

//app.js
//this nodejs core module allow us perform file path manipulation (which we need to get to our public folder dir in this case)
const path = require("path");
//loading in express
const express = require("express");
//loading hbs to be able to use partials
const hbs = require("hbs");

//creating a new express app
const app = express();
/////////////////////////////////////////////////////////////
/////////DEFINE PATHS FOR EXPRESS CONFIG/////////////////////
//here is a variable that takes the value of the path to the public dir
const publicDirectoryPath = path.join(__dirname, "../public");
//Path to our hbs files
const viewsPath = path.join(__dirname, "../templates/views");
//Partials path
const partialsPath = path.join(__dirname, "../templates/partials");
////////////////////////////////////////////////////////////////////////
/////////SETUP HANDLEBARS ENGINE & VIEWS LOCATION/////////////////////
//configuring express to use handlebar
app.set("view engine", "hbs");
//Setting express views to use custom path
app.set("views", viewsPath);
//setting our partials settings
hbs.registerPartials(partialsPath);
////////////////////////////////////////////////////////////////////////
/////////SETUP STATIC DIR TO SERVE//////////////////////////////////////
//app.use is a way to customize our server and we will customise the server to use the public folder. "express.static" customize our app.
app.use(express.static(publicDirectoryPath));

//Serving up the handlebars index dynamic page.
app.get("", (req, res) => {
  //we use res.render to serve a dynamic page. res.render is a function that takes two args : 1) the name of the hbs document without the extension 2) The dynamic content we want to use inside index.hbs
  res.render("index", {
    title: "Weather App",
    name: "Michaelz Omoakin"
  });
});
//Serving up the handlebars about dynamic page.
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Michaelz Omoakin"
  });
});
//Serving up the handlebars help dynamic page.
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
    name: "Michaelz Omoakin"
  });
});
//Weather routes.
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address"
    });
    return;
  }
  console.log(req.query.address);
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
    address: req.query.address
  });
});

//Query string experiment
app.get("/products", (req, res) => {
  //if a "search" query string is not provided we send an error response and "return" to stop further execution of the code
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term"
    });
    return;
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});
//404 nested error page.
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Michaelz Omoakin",
    errorMessage: "Help Article not found"
  });
});
//404 error page: - This must come last because express will first test all routes above to find match and when it finds none, it uses this.
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Michaelz Omoakin",
    errorMessage: "Page not found."
  });
});

//Starting up the server.
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
