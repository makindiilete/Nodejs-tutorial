/*Now that we have a middleware function we can make use of it. So we can apply this middleware function selectively to certain endpoints*/

//genres_routes.js (we want to protect this)
const { Genre, validate } = require("../models/genres_model");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//MONGODB DATABASE OBJECTS - GET THE LIST OF ALL THE GENRES
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

//MONGODB GET SINGLE OBJECT - GET A SINGLE OBJECT BY ID
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send("Such genre does not exist");
    return;
  }
  res.send(genre);
});

//MONGODB DATABASE  POST REQUEST - CREATE A NEW GENRE OBJECT
//we pass our middleware function "auth" here which will be executed before the route handler
router.post("/", auth, async (req, res) => {
  //  input validation using function defined
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = new Genre({
    name: req.body.name,
    author: req.body.author
  });
  const result = await genre.save();
  console.log(result);
  res.send(genre);
});

//MONGODB DATABASE PUT REQUEST
router.put("/:id", async (req, res) => {
  // JOI VALIDATION
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { author: req.body.author }
  );
  res.send(genre);
});

//MONGODB DATA DELETE REQUEST
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  console.log(genre);
  if (!genre) {
    res
      .status(404)
      .send(
        "The genre you try to delete doesnt exist or might have already been deleted!"
      );
  }
  res.send(genre);
});

module.exports = router;

/*Now if we try to send a post request to the genres endpoint, we get the error: "Access denied, No token provided"

Likewise if we try send an invalid token by clicking on the 'Headers' tab in post man and enter the key "x-auth-token" and value "1234" which is an invalid token value, we get "invalid token" error message

If we now paste a valid token and also paste the genre name and author in the body and send, we get 200 response OK
*/
