/*In this section and video, we will create and run our first nodejs express server which will offer users a new way to interact with our application. Instead of having to run a command in the terminal, they will be able to visit a url to interact with our node js application.
With this nodejs server, we can serve up everything our app needs e.g. Html, css, Js, images etc.
Instead of serving up a website, we can also serve up a JSON base http api which will be similar to the darksky or mapbox api where we are exchanging data back and forth on the server.

To create this server, we will be using express framework which we can use to serve up a static website of http json api which we can use as a backend for our mobile or web app. You can learn more from https://expressjs.com

-   Start by installing express*/

//app.js
//loading in express
const express = require("express");

//creating a new express app
const app = express();

//Setting up our route
//ds is for e.g. app.com i.e. the homepage
app.get("", (req, res) => {
  res.send("Hello Express!");
});

//Starting up the server
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

/*Now if we run the app, after some ms, we get the message "Server is up on port 3000" and if we visit the browser "localhost:3000", we get our text "Hello Express!"*/

/*SETTING UP ADDITIONAL ROUTES */

//loading in express
const express = require("express");

//creating a new express app
const app = express();

//Setting up our route
//ds is for e.g. app.com i.e. the homepage
app.get("", (req, res) => {
  res.send("Hello Express!");
});

//ds is for e.g. app.com/help i.e. the homepage
app.get("/help", (req, res) => {
  res.send("Help page");
});

//Starting up the server
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});

/*Now if we visit localhost/3000/help, we get "Help page" text printed
If we visit a url we have not set a route for e.g. "locahost/3000/about", we will get "Cannot GET" error message...Later we will learn how to setup 404 error page for pages like this so we can display a particular content for invalid urls*/

//app.js
//loading in express
const express = require("express");

//creating a new express app
const app = express();

//Setting up our route
//ds is for e.g. app.com i.e. the homepage
app.get("", (req, res) => {
  res.send("Hello Express!");
});

//ds is for e.g. app.com/help i.e. the homepage
app.get("/help", (req, res) => {
  res.send("Help page");
});

//ds is for e.g. app.com/about i.e. the homepage
app.get("/about", (req, res) => {
  res.send("About page");
});

//ds is for e.g. app.com/weather i.e. the homepage
app.get("/weather", (req, res) => {
  res.send("Show Weather!");
});

//Starting up the server
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
