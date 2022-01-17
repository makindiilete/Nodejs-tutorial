/*We will be rounding up the section by seeing how we can refactor our index.js file containing all our routes so we can move all related routes into separate files...
 * All routes relating to users will be inside "user.js", why those for tasks will be inside "task.js"
 * So what will happen is this : - We will be setting multiple express routers and we will combine them together to create the complete app. You can have as many routers as you need but it makes sense to categories them according to the resource : - So we have a router for the users routes and another for the tasks routes.*/

//ROUTER BASIC SYNTAX
const router = new express.Router();
//customizing our router variable (router.get, post, patch & delete)
router.get("/tests", (req, res) => {
  res.send("This is from my other router");
});
//registering the new routes to be used by our app
app.use(router);

//USING ROUTER FROM ANOTHER FILE

//user.js
const express = require("express");
const router = new express.Router();

//DEFINING OUR ROUTERS
//customizing our router variable (router.get, post, patch & delete)
router.get("/test", (req, res) => {
  res.send("This is from a new file");
});

//EXPORTING THE ROUTER
module.exports = router;

//index.js
//loading our mongoose.js file where we connect to database
require("./src/db/mongoose");
//loading in the user model
const User = require("./src/models/users");
//loading in the task model
const Task = require("./src/models/tasks");
/*Creating our server*/
const express = require("express");
const userRouter = require("./src/routers/user");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //passing json to obj automatically
app.use(userRouter); //registering our userRouter

app.listen(port, () => {
  console.log("Server is up and running on " + port);
});
/**/

///////////OUTCOME///////////////

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

app.use(express.json()); //passing json to obj automatically
app.use(userRouter); //registering our userRouter
app.use(taskRouter); //registering our taskRouter

app.listen(port, () => {
  console.log("Server is up and running on " + port);
});
/**/

//task.js
const express = require("express");
const router = new express.Router();
//loading in the task model
const Task = require("../models/tasks");

//creating a new task
router.post("/tasks", async (req, res) => {
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
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
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

//user.js
const express = require("express");
const router = new express.Router();
//loading in the user model
const User = require("../models/users");

//DEFINING OUR ROUTERS
//creating a new user
router.post("/users", async (req, res) => {
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
router.get("/users", async (req, res) => {
  try {
    //finding all users (no filter applied)
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

/*FETCH USER BY ID*/
router.get("/users/:id", async (req, res) => {
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

//UPDATING A USER
router.patch("/users/:id", async (req, res) => {
  //this converts our model properties/objects into array
  const updates = Object.keys(req.body);
  //in this array are all properties defined in the model
  const allowedUpdates = ["name", "email", "password", "age"];
  //this perform the checking validation to see if the property entered exist in "allowedUpdates[]"
  //the arg "üpdate" here represents the req.body so we check to see if the model properties array includes the property
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    //we passed 3 args : the user id, the object to use for the update which is the "req.body" i.e. the json from postman, the we set options
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      //this will ensure we get back the newly updated details
      new: true,
      //this will turn on our model validation for the update
      runValidators: true
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//DELETING A USER BY ID
router.delete("/users/:id", async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(userToDelete);
  } catch (e) {
    res.status(500).send();
  }
});

//EXPORTING THE ROUTER
module.exports = router;
