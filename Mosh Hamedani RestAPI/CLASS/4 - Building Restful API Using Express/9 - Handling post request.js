/*Let us create a new course using http post request*/
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
  const course = {
    //here we define the id of the new course by adding 1 to the total number of existing courses
    id: courses.length + 1,
    //we assuming that the body of the request is an object with a "name" property
    name: req.body.name
  };
  //pushing the course object to the server
  courses.push(course);
  //sending back the sent course to the client
  res.send(course);
});

//Endpoint to a single course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    // 400 Invalid request

    res
      .status(404)
      .send(
        "<small>The Course you looking for does not exist on this database. </small>"
      );
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
