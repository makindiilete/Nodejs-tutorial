/*We will be learning how to log error messages to mongodb
1) Install "npm i winston-mongodb@3.0.0
2) Then we adjust the code for our app.js and error.js*/

//APP.JS file
//our winston error logger package
const winston = require("winston");
//loading winston-mongodb for logging errors to mongodb
require("winston-mongodb");
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
//adding transport for logging errors to mongodb, we pass entry to our vidly database @ line 35
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });

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

//ERROR.JS FILE
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

  //the first arg here "error.message" is the message field, the 2nd "error" is the meta data field
  winston.error(error.message, error);
  res.status(500).send("Something failed.");
};

/*Now with the error we thrown in genres_route.js, if we send a get request again, we get"Something failed" in postman and in mongodb we get a new collection inside oue vidly database with the name "log" and inside it we get our error document showing the "_id, timestamp, level, message, meta"*/

//You can adjust the winston.add code in app.js to specify the type of levels you want to log, in the case below, only error messages will be logged.
winston.add(winston.transports.MongoDB, {
  db: "mongodb://localhost/vidly",
  level: "error"
});

//in the case below, every levels below 'info' will not be logged and 'error, warn & info' will be logged.
winston.add(winston.transports.MongoDB, {
  db: "mongodb://localhost/vidly",
  level: "info"
});
