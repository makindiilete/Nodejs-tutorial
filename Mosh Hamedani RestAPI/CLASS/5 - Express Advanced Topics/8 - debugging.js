/*We use the console.log() alot to log messages for debugging but when we are done with them, we remove them or comment them out and when we need them again, we re-type them...This approach is not the best, there is a better alternative via a "debug" node package.

With debug, you dont need to erase the debugging codes when you are done with them, you can disable them from the environment variable and you can also specify the level of debug you want to see, for example, you can choose to see debug for database alone.

1) npm i debug@3.1.0
2) In the required packages, add
//loading the debug package
//debug for 'app launch'
const startupDebugger = require("debug")("app:startup");
//debug for 'app database'
const dbDebugger = require("debug")("app:db");

TO USE IT: -
//using morgan only in dev env
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  // replacing console.log with 'startupDebugger'
  startupDebugger("Morgan enabled....");
  // Database work...
  dbDebugger("Connected to the database....");
}

TESTING IT:-
1) in the terminal, run "set DEBUG=app:startup" : - this will turn on the debug for startup.
2) Run "node app.js"
Your app should run with the message : "app:startup Morgan enabled....+0ms"

So now this works better than console.log because we can also turn it off easily using
1) "set DEBUG="
2) "node app.js"
The message wont be shown now because we have set the debug to empty.
*/

//Showing all debug messages : - You can turn on all the debug messags using two methods
/*1) In the terminal run : "set DEBUG=app.startup,app.db"
OR
"set DEBUG=app:*"
*/

//APP.JS FILE
///////////////////////////////////////////////////////////////////////////
///// REQUIRED PACKAGES //////////////////////////////////////////////////

//loading the debug package
//debug for 'app launch'
const startupDebugger = require("debug")("app:startup");
//debug for 'app database'
const dbDebugger = require("debug")("app:db");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger");
const authentication = require("./authentication");
const express = require("express");
const app = express();
///////////////////////////////////////////////////////////////////////////

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

//using morgan only in dev env
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  // replacing console.log with 'startupDebugger'
  startupDebugger("Morgan enabled....");
  // Database work...
  dbDebugger("Connected to the database....");
}
//////////////////////////////////////////////////////////////////////////

////// DATABASE //////////////////////////
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];
/////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//HTTP CRUD OPERATIONS
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res
      .status(404)
      .send("The Course you looking for does not exist on this database. ");
    return;
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
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

app.put("/api/courses/:id", (req, res) => {
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

app.delete("/api/courses/:id", (req, res) => {
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
///////////////////////////////////////////////////////////////////////////////

////// VALIDATION HANDLER /////////////////////////////////////
function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
/////// PORT CONFIG
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
/////////////////////////////////////////////////////////////////////////////

/*IN MOST APPS, YOU WONT NEED DIFFERENT DEBUGGING, YOU WILL JUST NEED A GENERAL DEBUG FOR LOGGING MESSAGES SIMILAR TO console.log, so you can use the code below*/

//APP.JS FILE
///////////////////////////////////////////////////////////////////////////
///// REQUIRED PACKAGES //////////////////////////////////////////////////

//loading the debug package
//general debug
const debug = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger");
const authentication = require("./authentication");
const express = require("express");
const app = express();
///////////////////////////////////////////////////////////////////////////

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

//using morgan only in dev env
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  // replacing console.log with 'debug'
  debug("Morgan enabled....");
}
//////////////////////////////////////////////////////////////////////////

////// DATABASE //////////////////////////
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];
/////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//HTTP CRUD OPERATIONS
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res
      .status(404)
      .send("The Course you looking for does not exist on this database. ");
    return;
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
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

app.put("/api/courses/:id", (req, res) => {
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

app.delete("/api/courses/:id", (req, res) => {
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
///////////////////////////////////////////////////////////////////////////////

////// VALIDATION HANDLER /////////////////////////////////////
function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
/////// PORT CONFIG
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
/////////////////////////////////////////////////////////////////////////////
