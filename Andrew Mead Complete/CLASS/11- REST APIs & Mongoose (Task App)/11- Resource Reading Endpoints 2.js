/*CHALLENGE : - Setup the task reading endpoints
 * 1-  Create an ednpoint for fetching all tasks
 * 2-  Create an endpoint for fetching a task by its id
 * 3-  Setup new requests in Postman and test your work*/

//loading our mongoose.js file where we connect to database
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
      //If there are no users with the id entered
      if (!user) {
        return res.status(404).send();
      }
      //else if we find a match
      res.send(user);
    })
    //handling server error
    .catch(e => {
      res.status(500).send();
    });
  console.log(req.params);
});

/*FETCHING MULTIPLE TALKS*/
/*GET REQUEST*/
app.get("/tasks", (req, res) => {
  //finding all tasks (no filter applied)
  Task.find({})
    .then(tasks => {
      res.send(tasks);
    })
    .catch(error => {
      res.status(500).send();
    });
});

/*FETCH USER BY ID*/
app.get("/tasks/:id", (req, res) => {
  //we use req.params.id to check the id we pass in the url and take the value to check for matching _id in the database
  const _id = req.params.id;
  Task.findById(_id)
    .then(task => {
      //if there are no task with the id
      if (!task) {
        return res.status(404).send();
      }
      //else if we find a match
      res.send(task);
    })
    //handling server error
    .catch(e => {
      res.status(500).send();
    });
  console.log(req.params);
});
