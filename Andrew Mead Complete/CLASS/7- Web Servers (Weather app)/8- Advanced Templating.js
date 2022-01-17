/*We will learn how to work with partials when using handlebars.
PARTIALS : - These is a small reusable template which is part of a bigger web page e.g. header & footer.
1-  We load the hbs module
2-  Create two new folders under our templates directory : - "views & partials"
3-  We move all hbs files we have used so far to the views and our partial files will be inside the partials dir*/

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

//header.hbs
// <h1>Static Header.hbs Text</h1>

//help.hbs
/*<!DOCTYPE html>
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
<!--Rendering our header partial-->
{{>header}}
<!--This will take a dynamic string as title from app.js-->
<h1>{{title}}</h1>
<!--This will take a dynamic string as name from app.js-->
<p>{{helpText}}</p>
</body>
</html>


Run the app with nodemon src/app.js -e js,hbs*/

/*NOW WE CAN REMOVE THE h1 title tags from every hbs files and render them dynamically from the header partials

//header.hbs
<h1>{{title}}</h1>

//index.hbs
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
<!--Rendering our header partial-->
{{>header}}
<!--This will take a dynamic string as name from app.js-->
<p>Created by {{name}}</p>
</body>
</html>


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
<!--Rendering our header partial-->
{{>header}}
<!--This will take a dynamic string as name from app.js-->
<p>{{helpText}}</p>
</body>
</html>


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
<!--Rendering our header partial-->
{{>header}}
<img src="/img/michaelz.jpg" alt="My Image">
<!--This will take a dynamic string as name from app.js-->
<p>Created by {{name}}</p>
</body>
</html>

*/

/*ADDING NAVIGATION

//header.hbs
<h1>{{title}}</h1>
<!--Setting up our nav link-->
<div>
    <a href="/">Weather</a>
    <a href="/about">About</a>
    <a href="/help">Help</a>
</div>
*/

/*CHALLENGE : Create a partial for the footer
1-  Setup the template for the footer partial "Created by Some Name"
2-  Render the partial at the bottom of all three pages
3-  Test your work by visiting all three pages*/

/*
//footer.hbs
<p>Created by {{name}}</p>

//index.hbs
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
<!--Rendering our header partial-->
{{>header}}
<!--Rendering our footer partial-->
{{>footer}}
</body>
</html>


Same for about.hbs and help.hbs
*/
