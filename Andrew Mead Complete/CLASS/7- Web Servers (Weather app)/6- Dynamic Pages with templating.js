/*So far we have been using static assets and by static it means their content cannot change dynamically like angular where you can setup a string in your logic file and then use this dynamically in the html file and also in angular, you can easily re-use your components because they are dynamic...Our current static assets setup do not give us the advantage to do that and this we will learn in this lesson .

To create dynamic pages, we will use template engines and the one we will be using is "handlebars". This will allow us to :
1-  Render dynamic documents
2-  Easily create re-usable codes across pages like header, footer
3-  So we start by setting up our app.js to use handlebars after we have installed the npm module*/

//app.js
const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
//app.set allows us to set a value for a given express settings : this takes 2 args : setting name & value to be set for the settings. The setting we are setting here is "view engine" and the value we use is the name of the module we want to use for our template engine which is "hbs" (handlebars js)
app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

/*
4-  We then create a new folder inside the root directory "views" this is where our view engine files lives.
5-  We create a new file for the homepage inside the views directory "index.hbs"

//index.hbs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Home</title>
    <link rel="stylesheet" href="../public/css/styles.css" />
    <script src="../public/js/app.js"></script>
</head>
<body>
<!--This will take a dynamic string as title from app.js-->
<h1>{{title}}</h1>
<!--This will take a dynamic string as name from app.js-->
<p>{{name}}</p>
</body>
</html>

*/

//app.js
//this nodejs core module allow us perform file path manipulation (which we need to get to our public folder dir in this case)
const path = require("path");
//loading in express
const express = require("express");

//creating a new express app
const app = express();
//here is a variable that takes the value of the path to the public dir
const publicDirectoryPath = path.join(__dirname, "../public");
//configuring express to use handlebar
app.set("view engine", "hbs");
//app.use is a way to customize our server and we will customise the server to use the public folder. "express.static" customize our app
app.use(express.static(publicDirectoryPath));

//Serving up the handlebars dynamic page
app.get("", (req, res) => {
  //we use res.render to serve a dynamic page. res.render is a function that takes two args : 1) the name of the hbs document without the extension 2) The dynamic content we want to use inside index.hbs
  res.render("index", {
    title: "Weather App",
    name: "Michaelz Omoakin"
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

/*Now if we go to the homepage in the browser, we have our rendered dynamic content*/

/*
//about.hbs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>About</title>
    <link rel="stylesheet" href="/css/styles.css" />
    <script src="../public/js/app.js"></script>
</head>
<body>
<!--This will take a dynamic string as title from app.js-->
<h1>{{title}}</h1>
<img src="/img/michaelz.jpg" alt="My Image">
<!--This will take a dynamic string as name from app.js-->
<p>Created by {{name}}</p>
</body>
</html>

*/

//app.js
//this nodejs core module allow us perform file path manipulation (which we need to get to our public folder dir in this case)
const path = require("path");
//loading in express
const express = require("express");

//creating a new express app
const app = express();
//here is a variable that takes the value of the path to the public dir
const publicDirectoryPath = path.join(__dirname, "../public");
//configuring express to use handlebar
app.set("view engine", "hbs");
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

/*CHALLENGE : - Create a template for help page
1-  Setup a help template to render a help message to the screen
2-  Setup the help route and render the template with an example message
3-  Visit the route in the browser and see your help message print

//help.hbs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Home</title>
    <!--webstorm says it cannot resolve this but it is okay since we already set our file path to "../public" inside app.js so we do not need to append it to the link again bcos if we do, webstorm will see the file but it wont be accessible in the browser-->
    <link rel="stylesheet" href="/css/styles.css" />
    <script src="/js/app.js"></script>
</head>
<body>
<!--This will take a dynamic string as title from app.js-->
<h1>{{title}}</h1>
<!--This will take a dynamic string as name from app.js-->
<p>{{helpText}}</p>
</body>
</html>

*/

//app.js
//this nodejs core module allow us perform file path manipulation (which we need to get to our public folder dir in this case)
const path = require("path");
//loading in express
const express = require("express");

//creating a new express app
const app = express();
//here is a variable that takes the value of the path to the public dir
const publicDirectoryPath = path.join(__dirname, "../public");
//configuring express to use handlebar
app.set("view engine", "hbs");
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
