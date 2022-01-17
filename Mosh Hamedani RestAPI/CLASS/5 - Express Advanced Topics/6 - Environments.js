/*In a complex or enterprise app, you need to know what environment your code is running on whether it is a dev or prod env. You may want to disable or enable certain features based on the current environment....

For example, you may want to enable logging of http request (morgan middleware) only in the dev environment.
*/

// Getting the status of the current environment : - There are two ways to get the current environment

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //this will return undefined if you have not setup any env
console.log(`app: ${app.get("env")}`); //this will return the env as "development" if you have not setup any env

//using morgan only in dev env
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  console.log("Morgan enabled....");
} // with this when we run the app, we get the message "morgan enabled...." because we are in the production environment

//SETTING YOUR ENVIRONMENT IN CMD
/*To set your environment to production, in the terminal, run "set NODE_ENV=production"

So now if we change our environment to production and run the app again, we no longer get the message "morgan enabled" because now its only available in development env
*/

//APP.JS
///////////////////////////////////////////////////////////////////////////
///// REQUIRED PACKAGES //////////////////////////////////////////////////
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger");
const authentication = require("./authentication");
const express = require("express");
const app = express();
///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
///////// ENVIRONMENTS CHECKS ///////////////////////////////////////////
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

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
  console.log("Morgan enabled....");
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
