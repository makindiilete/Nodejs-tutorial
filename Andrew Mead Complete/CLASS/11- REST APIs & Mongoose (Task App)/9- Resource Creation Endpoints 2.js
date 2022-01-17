/*CHALLENGE : - Setup the task creation endpoint
1-  Create a separate file for the task model (load it into index.js)
2-  Create the task creating endpoint (handle success and error)
3-  Test the endpoint from postman with good and bad data*/

//task-manager/index.js
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

//src/mongoose.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
  useCreateIndex: true
});

//models/task.js
const mongoose = require("mongoose");
//loading our validator package
//TASK MODEL
const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = Task;

//model/user.js
const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");

//DEFINING OUR BASIC USER MODEL : - This takes 2 args, the model name and the schema (the model object/structure/configuration
const User = mongoose.model("User", {
  //  Setting the type for our fields.
  name: {
    type: String,
    //setting the name property to be a compulsory input
    required: true,
    //    adding trim to our name field to remove any spaces
    trim: true
  },
  email: {
    type: String,
    required: true,
    //remove space
    trim: true,
    //convert to lowercase
    lowercase: true,
    //using the npm validator to validate email field
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email not valid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      //  checking to see if the password entered includes "password"
      if (value.toLowerCase().includes("password")) {
        throw new Error("Your password cannot include 'password'");
      }
    }
  },
  age: {
    type: Number,
    //adding default age value for when age is not provided
    default: 0,
    //    setting custom validator for age to be positive no
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number!");
      }
    }
  }
});

module.exports = User;
