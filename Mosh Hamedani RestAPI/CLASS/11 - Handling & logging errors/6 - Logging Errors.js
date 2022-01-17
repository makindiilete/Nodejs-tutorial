/*As we have talked about that in real world enterprise app, we need to log our errors so later we come back to look at the log and see
"What are the areas of the application that we can improve"
So we will be using a popular library "winston" to achieve this.

You can also create a logger manually but using the default logger is sufficient for small to medium sized apps. You may need a custom logger only if you are building a really large app and you want to have different logger that behaves differently in different part of the app.

TRANSPORT : - This are mediums for logging msgs:

1) Console
2) File
3) Http

The default logger exported from winston comes with one transport for logging msgs to the console, lets see how to add another transport for logging messages to file
*/

//APP.JS
//our winston error logger package
const winston = require("winston");
require("express-async-errors");
const error = require("./middleware/Errors/error");
const configJwt = require("config");
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

//adding transport for logging errors to file
winston.add(winston.transports.File, { filename: "logfile.log" });

//checking for our jwt private key when the application starts
if (!configJwt.get("jwtPrivateKey")) {
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

//error.js (error middleware) file

//our winston error logger package
const winston = require("winston");

module.exports = function(error, req, res, next) {
  //Log the exception/error
  //error
  //warn
  //info
  //verbose
  //debug
  //silly
  // winston.log('error', error.message);
  winston.error(error.message);
  res.status(500).send("Something failed.");
};

///genres_routes.js file
const { Genre, validate } = require("../models/genres_model");
const auth = require("../middleware/authorization");
const isAdmin = require("../middleware/admin");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//MONGODB DATABASE OBJECTS - GET THE LIST OF ALL THE GENRES
router.get("/", async (req, res) => {
  //testing for error
  throw new Error("Could not get the genres");
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

/*Now if we run the app and send a get request, we get the response "Something failed" in postman and if we check our app folder, we have a new file "logfile.log" which we configured for winston and inside this file we have details of our error:

{"level":"error","message":"Could not get the genres","timestamp":"2019-06-18T05:50:16.532Z"}

*/
