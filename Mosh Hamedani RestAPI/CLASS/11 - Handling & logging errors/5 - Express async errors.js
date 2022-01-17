/*With the current implementation of moving our try/catch block into a central middleware, the problem is that we need to remember to always wrap our routes with the middleware when we create new routes.

There is a better way, we can use an npm package which automatically wraps our handler to the middleware at runtime
1) npm i express-async-errors@2.1.0
*/

//app.js : - here we load the package
//loading the express-asyn-errors package dt wraps our routes handlers with our 'try_catch_function.js' middleware
require("express-async-errors");
//loading the express error middleware file
const error = require("./middleware/error");
//loading the config package for where we can access the private key
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres_route");
const customers = require("./routes/customers_route");
const rentals = require("./routes/rentals_route");
const movies = require("./routes/movies_route");
const users = require("./routes/users_route");
const auth = require("./routes/auth");
const app = express();

//checking for our jwt private key when the application starts
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  //then we exit the process (0 = success, any other number means error)
  process.exit(1);
}

//Here we create our database, the name will be what we define after "mongodb://localhost/"
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB......"))
  .catch(error => console.error("Could not connect to MongoDB....", error));

// needed to be able to post in json
app.use(express.json());

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////ENDPOINTS & THEIR ROUTES/////////////////////////////////////////////////////////////////////
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
//Express error middleware referenced here
app.use(error);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Listening to port
const port = 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));

//genres_routes.js: here we removed the ref to "asyncMiddleware" we used earlier
const { Genre, validate } = require("../models/genres_model");
const auth = require("../middleware/authorization");
const isAdmin = require("../middleware/admin");
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

/*Now if we shutdown mongod service and try to send a request to our endpoint, we get the error message "Something failed"*/
