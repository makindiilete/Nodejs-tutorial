/*Add a new file "index.js" or "app.js"*/

const express = require("express");

//this creates an express app
const app = express();

app.get(); // to get data
app.post(); // to create data
app.put(); // to update data
app.delete(); // to delete data

//CREATING OUR FIRST EXPRESS ROUTES
const express = require("express");

//this creates an express app
const app = express();

//the get method takes two properties : path, the req & res
// the request object 'req' comes with a bunch of properties that gives us info about the incoming request which we can get all of them from "expressjs.com/en/4x/api.html#req"
app.get("/", (req, res) => {
  res.send("Hello World");
});
//listening on a given port
app.listen(3000, () => console.log("Listening on port 3000...."));

//RESULT : - When we run the app, we get the message "Listening on port 3000...." and when we navigate to the root page "localhost:3000", we get the message "Hello World".

// DEFINING NEW ROUTES
const express = require("express");

//this creates an express app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//New route for courses
app.get("/api/courses", (req, res) => {
  // getting list of courses
  res.send([1, 2, 3]);
});

//listening on a given port
app.listen(3000, () => console.log("Listening on port 3000...."));

/*NOTE: - Notice that with express, we no longer use the if statement anymore, we define new route using the app.get. and with this implementation, as our app gets bigger, we can move routes to different files for example, we can moveo ur courses route into "courses.js' file*/

const express = require("express");

//this creates an express app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//New route for courses
app.get("/api/courses", (req, res) => {
  // getting list of courses
  res.send([1, 2, 3]);
});
app.get("/api/family", (req, res) => {
  res.send([
    { id: 1, Name: "Akindiilete Michaelz" },
    { id: 2, Name: "Akindiilete Oluwaferanmi" }
  ]);
});

//listening on a given port
app.listen(3000, () => console.log("Listening on port 3000...."));
