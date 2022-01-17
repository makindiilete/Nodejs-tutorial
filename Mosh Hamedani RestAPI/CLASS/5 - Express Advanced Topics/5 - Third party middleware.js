/*We will be checking some 3rd party middlewares we have in express.
 * 1) Go to "expressjs.com/en/resources/middleware.html"
 * The page contains all the 3rd party middlewares you can use in your application.
 * This doesnt mean you need to use all the 3rd party middlewares on the page because every middleware will impact the performance of your application.
 * IF YOU DONT NEED THE FUNCTIONALITY THAT COMES WITH A MIDDLEWARE FUNCTION, DO NOT USE IT.
 *
 * The one that really stands out of all the middlewares is "Helmet" : - It helps secure your apps by setting various HTTP headers. So click on it and check.
 *
 * To use helmet
 *
 * 1) npm install helmet --save
 * 2) In your app.js, add the code

 const helmet = require('helmet')
 app.use(helmet());

Another useful 3rd party middleware is "morgan" : - Which we use to log http requests

 * To use morgan
 *
 * 1) npm install morgan --save
 * 2) In your app.js, add the code
 *
 *  const morgan = require('morgan')
 *  //the argument is the text format of the output which can be in "dev, short or tiny" format
 app.use(morgan('dev'));

 So with morgan now in place, if you send a GET request with postman, it will be log in the command prompt with the format defined. This will be in the form of : - "GET /api/courses 200 18.323ms - 79" : - Request type, endpoint, status code , time it takes to complete, content length
 */

//APP.JS FILE
const helmet = require("helmet");
const morgan = require("morgan");

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

//Helmet 3rd party middleware
app.use(helmet());
//Morgan 3rd party middleware. the argument passed is the format of the output of the log. It can be in "dev, tiny, short"
app.use(morgan("dev"));

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
