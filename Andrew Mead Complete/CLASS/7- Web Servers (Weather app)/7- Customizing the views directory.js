/*Here we will be customizing how handlebars is setup.. Currently with the default setup, handlebars files needs to be inside a folder called "views" which must be inside the root dir but we can change it*/

//app.js
//this nodejs core module allow us perform file path manipulation (which we need to get to our public folder dir in this case)
const path = require("path");
//loading in express
const express = require("express");

//creating a new express app
const app = express();
/////////////////////////////////////////////////////////////
/////////DEFINE PATHS FOR EXPRESS CONFIG/////////////////////
//here is a variable that takes the value of the path to the public dir
const publicDirectoryPath = path.join(__dirname, "../public");
//Path to our hbs files
const viewsPath = path.join(__dirname, "../templates");
////////////////////////////////////////////////////////////////////////
/////////SETUP HANDLEBARS ENGINE & VIEWS LOCATION/////////////////////
//configuring express to use handlebar
app.set("view engine", "hbs");
//Setting express views to use custom path
app.set("views", viewsPath);
////////////////////////////////////////////////////////////////////////
/////////SETUP STATIC DIR TO SERVE//////////////////////////////////////
//app.use is a way to customize our server and we will customise the server to use the public folder. "express.static" customize our app
app.use(express.static(publicDirectoryPath));

//Serving up the handlebars index dynamic page
app.get("", (req, res) => {
  //we use res.render to serve a dynamic page. res.render is a function that takes two args : 1) the name of the hbs document without the extension 2) The dynamic content we want to use inside index.hbs
  res.render("index", {
    title: "Weather App",
    name: "Michaelz Omoakin"
  });
});
//Serving up the handlebars about dynamic page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Michaelz Omoakin"
  });
});
//Serving up the handlebars help dynamic page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text"
  });
});

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

/*Figuring out your way with express docs : -
1-  Visit https://express.js.com
2-  Click on API reference
Click on each Sub heading on the right side to learn more
        express() : The express function in const app = express();
        Application : The app variable in const app = express();
        Request : The req parameter in app.get("", (req,res) => {})
        Response : The req parameter in app.get("", (req,res) => {})
        Router : To be used later.*/
