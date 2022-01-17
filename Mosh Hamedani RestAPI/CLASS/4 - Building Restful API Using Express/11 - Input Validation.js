/*As a security practise, you should never trust what the client sends you, you should always validate their inputs.
 *
 * To implement input validation, we will be using an npm package called "joi" so install "npm i joi@13.1.0"*/

//IMPLEMENTATION
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
  // define a scheme that deals with the structure of our object
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  //VALIDATION : We give Joi the request body the client sends and the schema so it uses the schema to validate the req.body
  const result = Joi.validate(req.body, schema);

  //input validation logic
  if (result.error) {
    // 400 Bad request
    // sending the error details to the client
    res.status(400).send(result.error);
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

/*Now if we go to POSTMAN and send an empty object, we get this complex error: -
 * {
    "isJoi": true,
    "name": "ValidationError",
    "details": [
        {
            "message": "\"name\" is required",
            "path": [
                "name"
            ],
            "type": "any.required",
            "context": {
                "key": "name",
                "label": "name"
            }
        }
    ],
    "_object": {}
}


As we can see that this is too complex to send to client to we can adjust the code under the input validation logic if statement*/

//input validation logic
if (result.error) {
  // 400 Bad request
  // sending the error details to the client
  res.status(400).send(result.error.details[0].message);
  // then we exit
  return;
}

//Now if the client sends empty request, we get the error :  "name" is required
// if the client sends a name with less than 3 characters, we get the error : "name" length must be at least 3 characters long
