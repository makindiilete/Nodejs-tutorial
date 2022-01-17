/*it is possible that we will be needing the Joi object id validation in other modules, we dont want to re-define this in every module so we can perform a better implementation. So we move the joi objectid validation to "app.js" which is our root module*/

//APP.JS
const Joi = require("joi");
//loading joi-objectid validation package
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres_route");
const customers = require("./routes/customers_route");
const rentals = require("./routes/rentals_route");
const movies = require("./routes/movies_route");
const app = express();

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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Listening to port
const port = 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));

//MOVIE_MODEL.JS
const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genres_model");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true
  },
  movieGenre: {
    type: genreSchema,
    required: true
  },
  //useful for reference object
  /*  movieGenre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre"
    },*/
  numberInStock: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});

const Movie = mongoose.model("Movie", movieSchema);

// JOI VALIDATION HANDLER
function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(10)
      .required(),
    //implementing joi object id to validate 'genreId"
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(5)
      .max(255)
      .required(),
    dailyRentalRate: Joi.number()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.movieSchema = movieSchema;
exports.validate = validateMovie;
