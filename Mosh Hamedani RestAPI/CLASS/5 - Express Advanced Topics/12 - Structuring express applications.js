/*If you check all the codes we have built in express, you can see we have a very big file with 140lines of codes and this is still a very simple app but in a real world app, you dont want to write all your codes inside index.js so we will learn how to properly structure our application.

1) We start by moving out all routes for working with courses into "courses.js" and all routes for working with for example "authors" should be in "authors.js"
2) Add a new folder in the root "routes"
3) Select all the code for working with courses and move them to "courses.js"
4) Change all "app." to "router."
*/

//courses.js
const express = require("express");
const Joi = require("joi");

//this will be used for routes instead of "const router = express()" in router.js
const router = express.Router();

////// DATABASE //////////////////////////
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];
/////////////////////////////////////////

//GET ROUTE
router.get("/", (req, res) => {
  res.send(courses);
});

// GET ROUTE (SINGLE OBJECT)
router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res
      .status(404)
      .send("The Course you looking for does not exist on this database. ");
    return;
  }
  res.send(course);
});

// POST ROUTE
router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    // then we exit
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// PUT (UPDATE ROUTE)
router.put("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res
      .status(404)
      .send("The Course you looking for does not exist on this database.");
    return;
  }
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //Else update the course
  course.name = req.body.name;
  //Return the updated course to the client
  res.send(course);
});

//DELETE ROUTE
router.delete("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res
      .status(404)
      .send("The Course you looking for does not exist on this database. ");
    return;
  }
  const index = courses.indexOf(course);
  //go to the index and remove one object
  courses.splice(index, 1);
  //Return the deleted course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;

//home.js
const express = require("express");
const router = express.Router();

//USING PUG TEMPLATE ENGINE
router.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "Hello" });
});

module.exports = router;

//app.js
///////////////////////////////////////////////////////////////////////////
///// REQUIRED PACKAGES //////////////////////////////////////////////////

//loading the debug package
//general debug
const debug = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const authentication = require("./authentication");
//loading the courses routes module
const courses = require("./routes/courses");
//loading the home routes module
const home = require("./routes/home");
const express = require("express");
const app = express();
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
/////////////////TEMPLATE ENGINE (PUG)////////////////////////////////////
app.set("view engine", "pug");

//////////////////////////////////////////////////////////////////////////
///////// RETRIEVING ENV DETAILS ///////////////////////////////////////////
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

//////////////////////////////////////////////////////////////////////////
/////  MIDDLEWARE   /////////////////////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(authentication);
app.use(helmet());

//installing the courses route. We supply 2 args, the endpoint and the route module name "courses". So we are telling express that any endpoint that starts with '/api/courses', we should use the "courses" router
app.use("/api/courses", courses);
//home route
app.use("/", home);

//using morgan only in dev env
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  // replacing console.log with 'debug'
  debug("Morgan enabled....");
}

/////// PORT CONFIG
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
