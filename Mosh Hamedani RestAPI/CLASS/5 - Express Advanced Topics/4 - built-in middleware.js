/*We already learnt that express comes with some built in middleware like the "express.json()" which checks if the body of the request is json and the set the property "req.body". We also have another type of built-in middleware called "url encoded"*/

app.use(express.urlencoded()); //key=value&key=value

/*This middleware function passes incoming request with url encoded payloads i.e. a request with body like this : - "key=value&key=value"

This is more of a traditional approach and not something we really use this days but basically if we have an html form with input fields and post that form to the server, the body of the request will look like : - "key=value&key=value". So that is when we have "url encoded" payload in the body of a request.
This middleware parses this body and populates "req.body" like the json object
* */

//with the "{extended:true}" we can pass array & objects using the urlencoded format
app.use(express.urlencoded({ extended: true }));

/*STATIC MIDDLEWARE : - We use this built in express middleware to serve static files*/

//STATIC
// "public" is a created folder in your root containing all static assets like: css, images etc will be in this folder
app.use(express.static("public"));

/*Testing the static middleware : -
 * 1) Create a new folder "public"
 * 2) In the folder, create a new file "readme.tx"
 * 3) Enter a paragraph text
 * 4) Now with the static middleware, we can go to "localhost:3000/readme.txt" to serve the file and we will get the content in the browser*/

//APP.JS FILE
const Joi = require("joi");

//loading our logger middleware
const logger = require("./logger");

//loading our authentication middleware
const authentication = require("./authentication");

const express = require("express");
const app = express();

//JSON
app.use(express.json());

//URL ENCODED
//with the "{extended:true}" we can pass array & objects using the urlencoded format
app.use(express.urlencoded({ extended: true }));

//STATIC
// all static assets like: css, images etc will be in this folder
app.use(express.static("public"));

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
