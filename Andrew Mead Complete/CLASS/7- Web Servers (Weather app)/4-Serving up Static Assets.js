/*Here we will learn how to server static asset so this way instead of typing our html codes, we can serve separate html files, css, js, img, videos etc.

1-  We start by creating a new directory in the root folder and name it "public", this is where our static assets will be placed.
2-  Inside this folder, we create a new file "index.html"

// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <h1>From a static file</h1>
  </body>
</html>

3-  Now we need to work with some fixtures nodejs provides us to be able to serve the file: "__dirname" & "__filename"

*/

//Path to the dir where the current script "app.js" lives in
console.log(__dirname);
//Path to the file "app.js"
console.log(__filename);

/*Running this returns : -
C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\w
eb-server\src
C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\w
eb-server\src\app.js


Now we will be using the "__dirname" to get to the "public" directory but currently we do not have that path but we can do a little path manipulation to get it.*/

//this nodejs core module allow us perform file path manipulation (which we need to get to our public folder dir in this case)
const path = require("path");
//loading in express
const express = require("express");

//Path to the dir where the current script "app.js" lives in
console.log(__dirname);
//Using the node "path" module, we can perform our path manipulations in this case below the "__dirname" points to our current directory, so to go up a level outside the directory, we can pass two arguments to the "path.join()" and the first argument is the "current directory" and the second argument is the ".." to manipulate and go back one level
console.log(path.join(__dirname, ".."));

/*Running the app : -

//this comes from console.log(__dirname);

C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\w
eb-server\src

//this comes from console.log(path.join(__dirname, "..")); "with the .." we have gone from src folder to the web-server folder, to go up two folders we can use "../.."

C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\w
eb-server
*/

//this nodejs core module allow us perform file path manipulation (which we need to get to our public folder dir in this case)
const path = require("path");
//loading in express
const express = require("express");

//Path to the dir where the current script "app.js" lives in which is "src"
console.log(__dirname);
//Here we have gone up one folder from the "src" dir to the "public" dir
console.log(path.join(__dirname, "../public"));

/*Running the app : -

 C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\w
eb-server\src

C:\Users\Michaelz Omoakin\Documents\Web development\Nodejs\Andrew Mead complete Nodejs\w
eb-server\public
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
//app.use is a way to customize our server and we will customise the server to use the public folder. "express.static" customize our app
app.use(express.static(publicDirectoryPath));

//Serving up HTML : - This can now be removed because it is no longer need and has been overwritten by the code in line 91
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

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

/*Now if we run the app and go to the root of the page "localhost:3000", we should see the index.html content getting displayed in the browser.
We can also go to localhost:3000/index.html to view the file but since "index.html" has a special meaning when it comes to web servers which is to point directly to the homepage, we can just access it via localhost:3000 and use the other syntax for the other html pages*/

/*CHALLENGE : - Goal: Create two more HTML files
1-  Create a html page for about with "About" title
2-  Create a html page for help with "Help" title
3-  Remove the old route handlers for both
4-  Visit both in the browser to test your work*/

//app.js
//this nodejs core module allow us perform file path manipulation (which we need to get to our public folder dir in this case)
const path = require("path");
//loading in express
const express = require("express");

//creating a new express app
const app = express();
//here is a variable that takes the value of the path to the public dir
const publicDirectoryPath = path.join(__dirname, "../public");
//app.use is a way to customize our server and we will customise the server to use the public folder. "express.static" customize our app
app.use(express.static(publicDirectoryPath));

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

/*We have created two new files "about.html & help.html" inside the public directory and we can head over to our browser and point to "localhost:3000/help.html" & "localhost:3000/about.html" to view them*/
