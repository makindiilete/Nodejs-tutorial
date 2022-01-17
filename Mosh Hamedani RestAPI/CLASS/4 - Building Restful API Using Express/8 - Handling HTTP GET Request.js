/*We can simulate http get request to get list of courses and specific course*/
const express = require("express");

const app = express();
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
  //sending the courses to the client. '.send' - this sends a response to the client
  res.send(courses);
});
//Endpoint to a single course
app.get("/api/courses/:id", (req, res) => {
  //js code to find a course with a specific id
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // if the id the client enters does not match any course, we respond with status 404 with optional message to the client
  if (!course)
    res
      .status(404)
      //   we are including html tags here just to show this is possible but not compulsory
      .send(
        "<p><strong>The Course you looking for does not exist on this database. </strong></p>"
      );
  // else if the course if found, we return the course to the client
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

// RESULT
/* Address : - http://localhost:5000/api/courses/1
{
id: 1,
name: "course1"
}
---------------------------------------------------------
Address : - http://localhost:5000/api/courses/10
The Course you looking for does not exist on this database.
if you inspect this message in the network tab of chrome dev tools, you will see the 404 error
*/
