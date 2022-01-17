/*Let us see how to build custom middleware functions*/

//Logging custom middleware function
// "next" is an argument that passes the request to the next middleware
app.use(function(req, res, next) {
  console.log("Logging....");
  //we call "next" to pass control to the next middleware in the pipeline, if we dont do this, because we are not terminating the request - response cycle, our request will end up hanging
  next();
});

//If we include this to our app.js codes and run the app then send a Get request, in the cmd we get the message "Logging...." and we get the list of courses.

//Authentication custom middleware
app.use(function(req, res, next) {
  console.log("Authenticating...");
  next();
});

/*Now if we add this below the logging custom middleware and run the app by sending a GET Request, we get the message: -
Logging.....
Authenticating.....

There you see the work of "next();" passing the control to the next middleware in the pipeline

So our middleware functions are called in sequence : -
1) First the logging middleware is called
2) The Authenticating middleware is called next
3) And the middleware for http get request (route handler) is called which now display the courses in postman.
*/

//CODE REVIEW
const Joi = require("joi");
const express = require("express");
const app = express();

//".use" is called to install a middleware function

//JSON middleware function
app.use(express.json());

//Logging custom middleware function
// "next" is an argument that passes the request to the next middleware
app.use(function(req, res, next) {
  console.log("Logging....");
  //we call "next" to pass control to the next middleware in the pipeline, if we dont do this, because we are not terminating the request - response cycle, our request will end up hanging
  next();
});

//Authentication custom middleware
app.use(function(req, res, next) {
  console.log("Authenticating...");
  next();
});

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

//HTTP GET REQUEST (express built-in middleware that terminates the req - res cycle with the res.send())
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//HTTP GET REQUEST (SINGLE OBJECT)
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
//HTTP POST REQUEST (express built-in middleware that terminates the req - res cycle with the res.send())

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

//HTTP PUT REQUEST (express built-in middleware  that terminates the req - res cycle with the res.send())
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

//HTTP DELETE REQUEST (express built-in middleware  that terminates the req - res cycle with the res.send())
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

//VALIDATION HANDLER
function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

/*In times of clean coding, you wont write all your middleware functions inside your index.js file. Each middleware should have a separate file/module.
LOGGING MIDDLEWARE MODULE
1) create a new file "logger.js" : - This will contain middleware function
*/

//LOGGER.JS FILE
function log(req, res, next) {
  console.log("Logging....");
  //we call "next" to pass control to the next middleware in the pipeline, if we dont do this, because we are not terminating the request - response cycle, our request will end up hanging
  next();
}
module.exports = log;

//AUTHENTICATION.JS FILE
function auth(req, res, next) {
  console.log("Authenticating...");
  next();
}
module.exports = auth;

//APP.JS FILE

const Joi = require("joi");

//loading our logger middleware
const logger = require("./logger");

//loading our authentication middleware
const authentication = require("./authentication");

const express = require("express");
const app = express();

app.use(express.json());

// installing the middleware from another file
app.use(logger);

//Authentication custom middleware
app.use(authentication);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

//HTTP GET REQUEST (express built-in middleware that terminates the req - res cycle with the res.send())
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//HTTP GET REQUEST (SINGLE OBJECT)
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
//HTTP POST REQUEST (express built-in middleware that terminates the req - res cycle with the res.send())

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

//HTTP PUT REQUEST (express built-in middleware  that terminates the req - res cycle with the res.send())
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

//HTTP DELETE REQUEST (express built-in middleware  that terminates the req - res cycle with the res.send())
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

//VALIDATION HANDLER
function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
