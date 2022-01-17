/*We will be creating our resource "new users, new tasks" on our endpoints.

To create our endpoints, we will be using expressjs*/

//POST ROUTE : CREATE
/*Creating our server*/
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up and running on " + port);
});
/**/

/*Defining our routes*/
app.post("/users", (req, res) => {
  res.send("testing");
});

/*Now if we run the app and visit the url localhost:3000/users in postman and send a post request, we get our string "testing!"*/

/*Creating our server*/
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //passing json to obj automatically

app.listen(port, () => {
  console.log("Server is up and running on " + port);
});
/**/

/*Defining our routes*/
app.post("/users", (req, res) => {
  //dumping the request body from postman to console
  console.log(req.body);
  res.send("testing");
});

/*CREATING A NEW USER IN THE DATABASE : - To do this, we need to ensure mongoose connects to the mongodb database and we load it inside the index.js file.

So we will re-structure the codes inside mongoose.js : -
1-  We move the models inside a new directory "models"*/

//loading our mongoose.js file where we connect to database
require("./src/db/mongoose");
//loading in the user model
const User = require("./src/models/users");
/*Creating our server*/
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //passing json to obj automatically

app.listen(port, () => {
  console.log("Server is up and running on " + port);
});
/**/

/*Defining our routes*/
//creating a new user
app.post("/users", (req, res) => {
  //here we set a user variable and set it as a new User instance which takes the "req.body"that represents the content of postman body
  const user = new User(req.body);
  //we save the user to database and send it to the client
  user
    .save()
    .then(() => {
      res.send(user);
    })
    //if we have an error
    .catch(error => {
      //we define and send the status code for the error & the error
      res.status(400).send(error);
    });
});
