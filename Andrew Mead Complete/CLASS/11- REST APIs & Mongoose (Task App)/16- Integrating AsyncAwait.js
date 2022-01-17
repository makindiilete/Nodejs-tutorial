/*We will now move to our "index.js" file inside our task manager dir to integrate async/await on all our created routes and as we add more routes in the future, we will create them using async/await*/

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
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    //awaiting our user.save() async operation
    await user.save();
    //201 : created
    res.status(201).send(user);
  } catch (e) {
    //400: bad request
    res.status(400).send();
  }
});

/*FETCHING MULTIPLE USERS*/
/*GET REQUEST*/
app.get("/users", async (req, res) => {
  try {
    //finding all users (no filter applied)
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

/*FETCH USER BY ID*/
app.get("/users/:id", async (req, res) => {
  //we use req.params.id to check the id we pass in the url and take the value to check for matching _id in the database
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//creating a new task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
/**/

/*FETCHING MULTIPLE TALKS*/
/*GET REQUEST*/
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*FETCH TASK BY ID*/
app.get("/tasks/:id", async (req, res) => {
  //we use req.params.id to check the id we pass in the url and take the value to check for matching _id in the database
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    //if there are no task with the id
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});
