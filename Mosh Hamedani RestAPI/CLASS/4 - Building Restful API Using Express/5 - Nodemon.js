/*Everytime we make a change to our code, we always need to stop the process and restart it again which can be tedious. We can install a package to correct this behavior : "npm i -g nodemon"
 *
 * After installing the package, instead of running app with "node app.js", you simply run it using "nodemon" and it will indicate its watching for changes*/
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
    { id: 2, Name: "Akindiilete Oluwaferanmi" },
    { id: 3, Name: "Akindiilete Abimbola" }
  ]);
});

//listening on a given port
app.listen(3000, () => console.log("Listening on port 3000...."));

// Now nodemon will restart our app anytime we make a change
