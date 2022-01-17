/*Create a service for managing the list of genres : - "http://vidly.com/api/genres".
 * Each movies has a genres like "Action, Triller" etc.
 * We should have an endpoint to get the list of all the genres,
 * We should be able to create a new genre
 * We should be able to update a new genre
 * We should be able to delete existing genre*/

//Start a new project and call it vidly and use it to develop the project

//SOLUTION

const Joi = require("joi");
const express = require("express");
const app = express();

// needed to be able to post in json
app.use(express.json());

//Database
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Thriller" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Romance" }
];

//HTTP GET REQUEST
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

//HTTP GET REQUEST (SINGLE OBJECT)
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Such genre does not exist");
    return;
  }
  res.send(genre);
});

//HTTP POST REQUEST
app.post("/api/genres", (req, res) => {
  //  input validation using function defined
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});
//HTTP PUT REQUEST
app.put("/api/genres/:id", (req, res) => {
  //  input validation to validate the updated request
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Such genres does not exist in the database");
    return;
  }
  genre.name = req.body.name;
  res.send(genre);
});
//HTTP DELETE REQUEST
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    res
      .status(404)
      .send(
        "The genre you try to delete doesnt exist or might have already been deleted!"
      );
    return;
  }
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

// JOI VALIDATION HANDLER
function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
}

//Listening to port
const port = 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
