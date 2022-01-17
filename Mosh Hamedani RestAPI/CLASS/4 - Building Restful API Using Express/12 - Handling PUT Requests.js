/*Let us see how we can update a course with http put request*/

//LOGIC PROCESS

//Look up this course with the given id
//If the course does not exist, return 404
//Else we validate the impending update course, makes sure is in good shape
// If invalid, return 400 - Bad request
//Else update the course
//Return the updated course to the client

//HTTP PUT ROUTE HANDLER FOR UPDATING
app.put("/api/courses/:id", (req, res) => {
  //Look up this course with the given id
  //If the course does not exist, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    res
      .status(404)
      .send(
        "<small>The Course you looking for does not exist on this database. </small>"
      );
  //Else we validate the impending update course, makes sure is in good shape
  // If invalid, return 400 - Bad request
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    // then we exit
    return;
  }
  //Else update the course
  course.name = req.body.name;
  //Return the updated course to the client
  res.send(course);
});

/*Now to test this, go back to POSTMAN and select "PUT", the address should be : "http://localhost:5000/api/courses/1" - here we are updating the course with id of 1, enter the updated details in the body and send.*/

//UPDATED
const Joi = require("joi"); //Joi is a class so it must be capital
const express = require("express");

const app = express();

//We need to be able to send POST request as JSON
app.use(express.json());

// Our database of courses
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});
//Endpoint to get all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
//Endpoint to create a new course via POST
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

//Endpoint to a single course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    res
      .status(404)
      .send(
        "<small>The Course you looking for does not exist on this database. </small>"
      );
  res.send(course);
});

//HTTP PUT ROUTE HANDLER FOR UPDATING
app.put("/api/courses/:id", (req, res) => {
  //Look up this course with the given id
  //If the course does not exist, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    res
      .status(404)
      .send(
        "<small>The Course you looking for does not exist on this database. </small>"
      );
  // const result = validateCourse(req.body);
  //  object destructuring : {error} is the same as result.error
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    // then we exit
    return;
  }
  //Else update the course
  course.name = req.body.name;
  //Return the updated course to the client
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
