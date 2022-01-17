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
//HTTP GET REQUEST

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
//HTTP POST REQUEST

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

//HTTP PUT REQUEST
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

//HTTP DELETE REQUEST
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
