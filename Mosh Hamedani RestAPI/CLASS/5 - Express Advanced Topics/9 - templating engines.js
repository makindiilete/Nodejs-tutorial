/*In all the endpoints we have created sofar, we return JSON object to the clients but sometimes you might need to return html markup to the client and that is where we use a templating engine.

NODE TEMPLATE ENGINE PACKAGES
1) Pug
2) Mustache
3) EJS
Each of this templating engines has different syntax for returning html markup to the client. LET US EXAMINE HOW TO USE PUG
npm install pug@2.0.0
4) In the "views" folder, create a file "index.pug"
*/
/////////////////TEMPLATE ENGINE (PUG)////////////////////////////////////
app.set("view engine", "pug");

//index.pug
html;
head;
title = title;
body;
h1 = message;

//USING PUG TEMPLATE ENGINE
app.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "Hello" });
});

//APP.JS
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
//USING PUG TEMPLATE ENGINE
app.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "Hello" });
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

/*While building restful services for the backend of your application, you dont really need a view engine or template engine but the topic is covered for the course to be comprehensive. */
