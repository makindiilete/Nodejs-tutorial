/*We will kick off by learning how we can enable timestamp for our mongoose model. So we will enable timestamp for the user model and task model.

WHAT THE TIMESTAMP WILL DO TO BOTH USER & TASK DOCUMENT
In our robo3t database, adding the timestamp to our document will add two new fields : - "Created At & Updated At" both are going to store timestamp which will be when the user was created or last updated.use

To activate the timestamp, Inside our model schema, we are already passing in an object containing our various fields, we will add another object containing our timeStamp*/

// models/user.js
const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");
//loading bycrpt module
const bcrypt = require("bcryptjs");
//JWT token module
const jwt = require("jsonwebtoken");
//loading the task model so we can remove tasks of a deleted user via middleware
const Task = require("../models/task");

//Creating our own schema to take advantage of using middleware
//we create a schema variable and we pass the schema objects/structure/configuration to it
const userSchema = new mongoose.Schema(
  {
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
      //this will ensure 2 users cannot create acct with the same email
      unique: true,
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
    },
    //Admin profiles
    isAdmin: {
      type: Boolean,
      default: false
    },
    //Adding our token (this will be provided by d server automatically so ds is all we need)
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  //Just adding this option to our schema will active the 2 timestamp fields (createdAt & UpdatedAt)
  {
    timestamps: true
  }
);

//SETTING VIRTUAL PROPERTY TO ALLOW USER DOCUMENT HAVE ACCESS TO THEIR CREATED TASKS (This is virtual because we are not changing what we stored for the user document, it is just a way to figure out how the user & task document are related)
//we gv the virtual a name "tasks" then an object inside which we create a reference to the Task model.

userSchema.virtual("userTasks", {
  //d model we are referencing
  ref: "Task",
  //d name of the field we will be using inside the user document to store the relationship
  localField: "_id",
  //  the name of the field on the Task document dt creates ds relationship (this is the "owner" field we added to the task model
  foreignField: "owner"
});

//CREATING THE FUNCTION THAT HIDES SENSITIVE USER'S DATA
userSchema.methods.toJSON = function() {
  const user = this;
  //We convert the user document to a JS object
  const userObject = user.toObject();
  //We use the delete keyword to remove/hide objects we do not want to be sent back
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

//Creating the JWT generator function
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  //as d first args, jwt expects a standard string as d value of the key, and mongodb _id are object id so we convert it to string with "toString()"
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");
  //saving tokens to d database
  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  //returning the token
  return token;
};

//Creating the new "findByCredentials()"
userSchema.statics.findByCredentials = async (email, password) => {
  //  finding the users by email: we use "findOne"to find a single user whose email === email passed in the argument
  const user = await User.findOne({ email: email });
  //if we cannot find the user's email
  if (!user) {
    throw new Error("Unable to login!");
  }
  //we check if the password entered in the arg/req.body matches with password in the user db
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    //if we cannot match the password
    throw new Error("Unable to login!");
  }
  //if both email and password works, we return the user
  return user;

  //  "unable to login" is cool enough bcos we do not want to provide a too specific msg why the login didnt work incase of hackers
};

//HASHING THE PLAIN TEXT PASSWORD WHENEVER A NEW USER IS CREAED
userSchema.pre("save", async function(next) {
  //from this variable "user", we will be able to access all the fields provided in the user model e.g. name, email, password
  const user = this;
  //this is where we state the code to run before saving the user
  //we check if the password field is getting modified and if true, we hash it
  if (user.isModified("password")) {
    //hashing the password
    user.password = await bcrypt.hash(user.password, 8);
  }
  //this is where we give the go-ahead to save the user after our code above has been run
  next();
});

//DELETE USER TASKS WHEN USER IS REMOVED
userSchema.pre("remove", async function(next) {
  const user = this;
  // here we delete all tasks having their owner id set as the id of this user
  await Task.deleteMany({ owner: user._id });
  next();
});

//DEFINING OUR BASIC USER MODEL : - This takes 2 args, the model name and the schema (the model object/structure/configuration
const User = mongoose.model("User", userSchema);

module.exports = User;

/*
Now if we "drop our database" to start creating new users and tasks with the timestamp activate, We can create a new user in POSTMAN and we get a response with both fields added.

{
    "user": {
        "age": 0,
        "isAdmin": false,
        "_id": "5d75ccf275f1e552783fc2b3",
        "name": "First User",
        "email": "firstuser@gmail.com",
        "createdAt": "2019-09-09T03:54:27.088Z",
        "updatedAt": "2019-09-09T03:54:29.283Z",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDc1Y2NmMjc1ZjFlNTUyNzgzZmMyYjMiLCJpYXQiOjE1NjgwMDEyNjl9.3fcA_WX31TuDHzSjC5PFu39GIgeuC0GevVznFdGKs1U"
}
*/

/*CHALLENGE : - Refactor task model to add timestamp
1-  Explicitly create schema
2-  Setup timestamps
3-  Create tasks from Postman to test your work.
*/

//MY SOLUTION
const mongoose = require("mongoose");
//loading our validator package
const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    //this stores the owner of the task
    owner: {
      //this says d data stored under owner will be an objectId
      type: mongoose.Schema.Types.ObjectId,
      //this means if you are creating a task, u must provide the owner. (You cannot create an anonymous task)
      required: true,
      //  here we are referencing the "User" model from inside the Task (This will allow us to be able to fetch the entire User profile whenever we have individual task)
      ref: "User"
    }
  },
  //Adding our timestamp object
  {
    timestamps: true
  }
);

//TASK MODEL
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

/*
{
    "completed": false,
    "_id": "5d75cf01a60ea74d7436090d",
    "description": "First user task 1",
    "owner": "5d75ccf275f1e552783fc2b3",
    "createdAt": "2019-09-09T04:03:13.039Z",
    "updatedAt": "2019-09-09T04:03:13.039Z",
    "__v": 0
}
*/
