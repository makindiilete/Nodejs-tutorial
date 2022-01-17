/*In the genres route get request, we have the try catch block and the problem with that implementation is that we need to repeat the try catch block in every route handler and it is also adding extra noise to the routes codes.

So we need to create a middleware were we have a central try/catch block for all routes "try_catch_function.js"*/

//try_catch_function.js

//General try catch function middleware for all routes: - We moved the try/catch block to this central point so we dont need to repeat it in every handlers and here we pass the "req, res, next" that express needs to run it as an arrow function inside the asyncMiddleware function
module.exports = function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};

//genres_routes_js :- here we load the middleware and wrap all routes with the "asyncMiddleware" function name
//loading our central try/catch middleware
const asyncMiddleware = require("../middleware/try_catch_function");
const { Genre, validate } = require("../models/genres_model");
const auth = require("../middleware/authorization");
const isAdmin = require("../middleware/admin");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//MONGODB DATABASE OBJECTS - GET THE LIST OF ALL THE GENRES
router.get(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
  })
);

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
router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res) => {
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
  })
);

//MONGODB DATABASE PUT REQUEST
router.put(
  "/:id",
  asyncMiddleware(async (req, res) => {
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
  })
);

//MONGODB DATA DELETE REQUEST : - here we av 2 middleware functions, first the token will be checked with "auth", next we will verify if the user is an admin with "isAdmin" and if that is the case, the delete route will be executed
router.delete("/:id", [auth, isAdmin], async (req, res) => {
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
