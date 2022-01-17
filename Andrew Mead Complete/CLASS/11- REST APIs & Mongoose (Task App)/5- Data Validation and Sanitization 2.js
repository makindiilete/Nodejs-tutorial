/*CHALLENGE: - Add a password field to User
 * 1-    Setup the field as a required string
 * 2-    Ensure the length is greater than 6
 * 3-    Trim the password
 * 4-    Ensure that password doesn't contain "password"
 * 5-    Test your work*/
const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");
//mongoose connecting to db. "mongodb://127.0.0.1:27017/" is the url, "/task-manager-api" is the name of the database we want to create and connect to
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
  useCreateIndex: true
});

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
      //  checking to see if the password entered includes "password". We first converted the passed string to lowercase before running the test
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

/*//TASK MODEL
const Task = mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});*/

//CREATING INSTANCES OF THE CREATED MODEL SO WE CAN START ADDING DOCUMENTS
const me = new User({
  //  intentionally adding space for sanitization
  name: "  Mike",
  //  intentionally passing email in uppercase and space
  email: "AKINDIILETEFOREX@GMAIL.COM  ",
  //  password
  password: "123999abc   "
  //    intentionally excluding age field
});

//SAVING THE INSTANCE TO DATABASE WITH ".save()" WHICH RETURNS A PROMISE
me.save()
  .then(me => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error ", error.message);
  });

/*
//Creating the task document/instance
const task = new Task({
  description: "Check Forex Currency Strength",
  completed: false
});

//Saving to db
task
  .save()
  .then(task => {
    console.log(task);
  })
  .catch(error => {
    console.log("Error ", error);
  });
*/

/*CHALLENGE : - Add validation and sanitization to task
 * 1-    Trim the description and make it required
 * 2-    Make completed optional and default it to false
 * 3-    Test your work and without errors*/
const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");
//mongoose connecting to db. "mongodb://127.0.0.1:27017/" is the url, "/task-manager-api" is the name of the database we want to create and connect to
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
  useCreateIndex: true
});

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

//Creating the task document/instance
const task = new Task({
  description: "Check Forex Currency Strength    "
});

//Saving to db
task
  .save()
  .then(task => {
    console.log(task);
  })
  .catch(error => {
    console.log("Error ", error);
  });
