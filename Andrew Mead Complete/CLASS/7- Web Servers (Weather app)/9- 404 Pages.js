/*Here we want to be able to setup a 404 error page to show users incase they visit a page we have no routes support for*/
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
    helpText: "This is some helpful text",
    name: "Michaelz Omoakin"
  });
});
//Weather routes
app.get("/weather", (req, res) => {
  res.send({
    location: "Lagos",
    forecast: "It is raining"
  });
});
//404 error page: - This must come last because express will first test all routes above to find match and when it finds none, it uses this
app.get("*", (req, res) => {
  res.send("My 404 page");
});

//Starting up the server
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

/*Running the app and visiting an invalid url e.g. "localhost:3000/me" we get the string we passed.*/

/*WORKING WITH NESTED URLS : This is are pages that are nested inside another routes e.g. article page that lives inside help route/page. Such url will be "localhost:3000/help/test" we can add a route for this.

We can also have invalid nested url to set 404 page for : "localhost:3000/help/article", though we have /help page but we dont have an article page inside the help page so we can add a 404 page that will be specific to this invalid nested pages*/

//404 nested error page
app.get("/help/*", (req, res) => {
  res.send("Help article not found");
});

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
    helpText: "This is some helpful text",
    name: "Michaelz Omoakin"
  });
});
//Weather routes
app.get("/weather", (req, res) => {
  res.send({
    location: "Lagos",
    forecast: "It is raining"
  });
});
//404 nested error page
app.get("/help/*", (req, res) => {
  res.send("Help article not found");
});
//404 error page: - This must come last because express will first test all routes above to find match and when it finds none, it uses this
app.get("*", (req, res) => {
  res.send("My 404 page");
});

//Starting up the server
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

/*CHALLENGE : - Create and render a 404 page with handlebars
1-  Setup the template to render the header and footer
2-  Setup the template to render an error message in a paragraph
3-  Render the template for both 404 routes
        Page not found
        Help article not found
4-  Test your work. Visit /what and help/units
*/

/*
//404.hbs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Home</title>
    <!--webstorm says it cannot resolve this but it is okay since we already set our file path to "../public" inside app.js so we do not need to append it to the link again bcos if we do, webstorm will see the file but it wont be accessible in the browser-->
    <link rel="stylesheet" href="/css/styles.css" />
</head>
<body>
<!--Rendering our header partial-->
{{>header}}
<!--Dynamic error message-->
<p>{{errorMessage}}</p>

<!--Rendering our footer partial-->
{{>footer}}
</body>
</html>

*/

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
  res.send({
    location: "Lagos",
    forecast: "It is raining"
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
