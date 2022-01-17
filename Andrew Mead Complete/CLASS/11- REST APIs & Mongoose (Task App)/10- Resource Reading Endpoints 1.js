/*Now that we have created REST APIs for creating resources using http post request, we will focus on creating REST APIs for reading resources via http get request.
 * One will allow us to read all available documents
 * The other will allow us target a specific document by its id and read it*/

//loading our mongoose.js file where we connect to database
require("./src/db/mongoose");
//loading in the user model
const User = require("./src/models/users");
//loading in the task model
const Task = require("./src/models/tasks");
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
      res.status(201).send(user);
    })
    //if we have an error
    .catch(error => {
      //we define and send the status code for the error & the error
      res.status(400).send(error);
    });
});

//creating a new task
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    //if we have an error
    .catch(error => {
      //we define and send the status code for the error & the error
      res.status(400).send(error);
    });
});
/**/

/*FETCHING MULTIPLE USERS*/
/*GET REQUEST*/
app.get("/users", (req, res) => {
  //finding all users (no filter applied)
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.status(500).send();
    });
});

/*FETCH USER BY ID*/
app.get("/users/:id", (req, res) => {
  //we use req.params.id to check the id we pass in the url and take the value to check for matching _id in the database
  const _id = req.params.id;
  User.findById(_id)
    .then(user => {
      res.send(user);
    })
    .catch(e => {
      res.status(404).send();
    });
  console.log(req.params);
});
