/*Now that we our code push up to github, we will have our code pushed up to heroku which will allow us deploy our nodejs app to production so we will have a real url for anyone with internet connection to view and use our weather application.

//SETUP SSH PUBLIC KEY WITH HEROKU
1-  Run the code : - "heroku keys:add"
2-  Heroku will search for the ssh public keys and when it finds it, it will ask you if it should add it, type "y" for yes
//CREATING HEROKU APP
3-  From the root project folder run the code "heroku create michaelz-weather-application". This will create an heroku app with your customized name. Always starts it with your name so it can be unique

//  NOW WE NEED TO MAKE SOME BASIC CHANGES SO HEROKU CAN KNOW HOW TO RUN OUR APP
4-  Open the package.json which you should have copied inside the project folder. We tell heroku to run the app the same way we have been running it in the localhost which is using "node src/app.js". We do this by modifying the script object in the package.json

  "scripts": {
    "start": "node src/app.js"
  },

  We can use npm start to run this also locally.
5-  Go inside app.js inside the src directory to modify the code inside and define a prod port

//setting a prod and dev port
const port = process.env.PORT || 3000;

//Starting up the server.
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
*/

//app.js (SERVER SIDE)
//this nodejs core module allow us perform file path manipulation (which we need to get to our public folder dir in this case)
const path = require("path");
//loading in express
const express = require("express");
//loading hbs to be able to use partials
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//creating a new express app
const app = express();
//setting a prod and dev port
const port = process.env.PORT || 3000;
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
  // geocode(req.query.address, (error, response) => {
  //here we have set an empty object as the default params value for the properties we are destructuring from response object
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      //if something goes wrong with geocode then we print a json object having property "error" and the value is the "error" argument
      if (error) {
        res.send({ error: error });
        return;
      }

      //Weather forecast function call and here we removed our hardcoded lat & long data and replaced it with the lat & long response inside geocode data object
      // forecast(response.body.fixtures[0].center[1], response.body.fixtures[0].center[0], (error, forecastData) => {
      forecast(latitude, longitude, (error, forecastData) => {
        //if something goes wrong with forecast, we also print the error and stop the code execution
        if (error) {
          res.send({ error: error });
          return;
        }
        //if all works well then we print the location, forecast
        if (!error) {
          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
          });
        } else {
          console.log("Error ", error);
        }
      });
    }
  );
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
app.listen(port, () => {
  console.log("Server is up on port " + port);
});

/*
5-  Now we move to the app.js inside the public folder, we remove the localhost:3000 we use to prefix the weather api endpoint
*/

//app.js (CLIENT SIDE)
console.log("Client side javascript file is loaded!");

//We select the form html element
const weatherForm = document.querySelector("form");
//select the user input
const search = document.querySelector("input");
//select the paragraph with id of "message-1"
const messageOne = document.querySelector("#message-1");
//select the paragraph with id of "message-2"
const messageTwo = document.querySelector("#message-2");

//The code to run when the form is submitted
//Here we add an event listener function which takes 2 args : - the type of event and callbackfn to run every time the event occurs
weatherForm.addEventListener("submit", e => {
  //  this prevents the browser from refreshing
  e.preventDefault();
  //getting the value of what user type in the input element
  const location = search.value;
  //This will show a loading message when user clicks the button while waiting for the async operation to complete
  messageOne.textContent = "Loading....";
  //We need to clear the content of the 2nd paragraph anytime we are waiting for an async operation response and we showing the Loading....
  messageTwo.textContent = "";
  //  FETCHING WEATHER : - we removed "localhost:3000" from here.
  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      //  If we have an error, we print it from the "error" property inside "data" object
      if (data.error) {
        messageOne.textContent = data.error;
      }
      //If all goes well, we print location and forecast from the data object in the 1st & 2nd paragraph
      else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});

/*
6-  Run "git status", "git add ." & "git commit -m "Setup app for heroku" to commit all the changes made to the file and push it.
7-  You can view all remotes connected to the project with "git remote"
8-  To push the code to heroku, "git push heroku master"
9-  Now our app will be deployed to a production environment and we can visit the app via "https://michaelz-weather-application.herokuapp.com/"*/
