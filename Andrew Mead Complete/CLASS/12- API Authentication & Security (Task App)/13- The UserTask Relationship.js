/*Now that we have secured and authenticated our user's routes, we now turn our attention to our task. To setup authentication for our task, there are a few things we need to do.
* 1-  We need to figure out how to create a relationship between users and task they have created. (This is important to make sure they can only access and edit their created task and they cannot mess with other people's task).
* We will need index.js, user.js (model), task.js (model), task.js (router).

//CREATING THE USER-TASK RELATIONSHIP
There are two ways we can do this : -
1-  We can have the user store the id of the tasks they have created.
OR
2-  We can have tasks store the id of the user who created them. (We will go with this approach).

3-  We will add a single field to our task model which will store the id of the user who created them and that will allow us to lock down the task management later.
4-  We can now drop the task-manager db because they do not make any sense anymore.
5-  Now we can focus on creating tasks that belongs to a specific user and to do that we first create a user to do that via POSTMAN
6-  So we create a new user via POSTMAN
7-  We then move to the POST request we use in creating a new task to edit it so that when a task is created, it is associated with the user who created it.
*/
//CREATING TASK -> USER RELATIONSHIP
//models\tasks.js
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
  },
  //this stores the owner of the task
  owner: {
    //this says d data stored under owner will be an objectId
    type: mongoose.Schema.Types.ObjectId,
    //this means if you are creating a task, u must provide the owner. (You cannot create an anonymous task)
    required: true
  }
});

module.exports = Task;

//router\tasks.js
//CREATE TASK
router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    //we use spread operator to copy/ref all the properties provided in the body of the request (description, completed)
    ...req.body,
    //we then provide the owner of the task which is the currently logged in user
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

/*Now that we have done this, we can head over to POSTMAN to create a new task (after we have created a new user), and when we have done this, we get a response with the owner id : -

{
    "completed": false,
    "_id": "5d75628a49f10c2ba41c9edb",
    "description": "Sleep by 11pm",
    "owner": "5d756013f431530ad4057783",
    "__v": 0
}

*/

/*MORE ADVANCED WAY OF CREATING TASK -> USER  RELATIONSHIP
We will mess around with this in the index.js*/

//models/tasks.js (here we modify the task model)
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
});

module.exports = Task;

//index.js
const Task = require("./src/models/task");

const main = async () => {
  //we find the Task by the ID ( the id is the task id not the owner id)
  const task = await Task.findById("5d75628a49f10c2ba41c9edb");
  //this will print the entire documents of the user of ds task
  //the "owner" here is the name of the field we added to the task model
  await task.populate("owner").execPopulate();
  //now all the entire user details will be stored under "task.owner"
  console.log(task.owner);
};

main();

/*Now if we check the terminal, we have our full user details which is now stored under "task.owner"

{ age: 0,
  isAdmin: false,
  _id: 5d756013f431530ad4057783,
  name: 'Michaelz Omoakin',
  email: 'mike@sahel.com',
  password:
   '$2a$08$yYCUaH6sAV5j8rZDyrNiw.38Kl3/wcOifP7NHHA/BfeIaB4/VVkxS',
  tokens:
   [ { _id: 5d756014f431530ad4057784,
       token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDc1NjAxM2Y0MzE1MzBhZDQwNTc3OD
MiLCJpYXQiOjE1Njc5NzMzOTZ9.Bh5kJQWB-rskirAX_FJuFC_nATlmkikzzJouBS8vP9Q' } ],
  __v: 1 }
*/

/*CREATING USER -> TASK RELATIONSHIP (ADVANCED WAY)*/
/*Now let us figure out how we can reverse this and have our user model return the task they created.

//we created TASK -> USER relationship by adding the "owner" field which stored the user id to the database
//we created USER -> TASK relationship by creating a virtual, so the tasks are not stored in the database for real but stored virtually
*/

//index.js
const User = require("./src/models/user");

const main = async () => {
  //the id here is the value of the "owner" field inside task document
  const user = await User.findById("5d756013f431530ad4057783");
  //the "userTasks" here must be the same name we passed to our user virtual property (user.js(model) line 78)
  await user.populate("userTasks").execPopulate();
  console.log(user.userTasks);
};

main();

//user.js (user model)
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

/*Now we can test this out by trying to create another task using our logged in user inside postman and we get this response in the terminal : -

[ { completed: false,
    _id: 5d75628a49f10c2ba41c9edb,
    description: 'Sleep by 11pm',
    owner: 5d756013f431530ad4057783,
    __v: 0 },
  { completed: false,
    _id: 5d7576b706743a3a80a603fe,
    description: 'Interview by 2moro',
    owner: 5d756013f431530ad4057783,
    __v: 0 } ]


This gives us array of all tasks created by the logged in user.*/

/////////////////////ALL CODES ///////////////////////////////////
//index.js
//EXTERNAL ROUTES
const userRouter = require("./src/routers/user");
const taskRouter = require("./src/routers/task");

//loading our mongoose.js file where we connect to database
require("./src/db/mongoose");
/*Creating our server*/
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

/*//Run the custom middleware
//the callbackfn is what will run in the "Do something" b4 route are matched
/!*app.use((req, res, next) => {
  if (req.method === "GET") {
    res.send("GET requests are disabled!");
  } else {
    next();
  }
});*!/

//Maintenance mode middleware
app.use((req, res) => {
  res.status(503).send("Website is currently undergoing maintenance!");
});*/

app.use(express.json()); //passing json to obj automatically
app.use(userRouter); //registering our userRouter
app.use(taskRouter); //registering our taskRouter

//
//Without middleware: new request -> run route handler
//
//With middleware: new request -> do something -> run route handler
//

app.listen(port, () => {
  console.log("Server is up and running on " + port);
});
/**/
const User = require("./src/models/user");

const main = async () => {
  //the id here is the value of the "owner" field inside task document
  const user = await User.findById("5d756013f431530ad4057783");
  //the "userTasks" here must be the same name we passed to our user virtual property (user.js(model) line 78)
  await user.populate("userTasks").execPopulate();
  console.log(user.userTasks);
};

main();

//model/tasks.js
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
});

module.exports = Task;

//routers/tasks.js
const express = require("express");
const router = new express.Router();
//loading in the task model
const Task = require("../models/task");
//loading the auth middleware
const auth = require("../middleware/auth");

//CREATE TASK
router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    //we use spread operator to copy/ref all the properties provided in the body of the request (description, completed)
    ...req.body,
    //we then provide the owner of the task which is the currently logged in user
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET ALL TASKS
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*FETCH TASK BY ID*/
router.get("/tasks/:id", async (req, res) => {
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

//UPDATING A TASK
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const task = await Task.findById(req.params.id);
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    /*   const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });*/
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//DELETING A TASK BY ID
router.delete("/tasks/:id", async (req, res) => {
  try {
    const taskToDelete = await Task.findByIdAndDelete(req.params.id);
    res.status(200).send(taskToDelete);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

//models/users.js

const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");
//loading bycrpt module
const bcrypt = require("bcryptjs");
//JWT token module
const jwt = require("jsonwebtoken");

//Creating our own schema to take advantage of using middleware
//we create a schema variable and we pass the schema objects/structure/configuration to it
const userSchema = new mongoose.Schema({
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
});

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

//HASHING THE PLAIN TEXT PASSWORD
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

//DEFINING OUR BASIC USER MODEL : - This takes 2 args, the model name and the schema (the model object/structure/configuration
const User = mongoose.model("User", userSchema);

module.exports = User;
