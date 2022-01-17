/*We have learnt how to handle uncaught exception using winston but if we have a rejected promise somewhere, the error handler for the uncaught exception will not work for it.*/

//throwing a rejected promise
const p = Promise.reject(new Error("Something failed miserably!"));

//a valid way of handling promise rejection without async/await try/catch

p.then(() => console.log("Done")).catch(() => console.log("Promise rejected"));

/*Running the code in line 8, where we handled our promise rejection well, we will get the error message "Promise rejected" in the terminal.*/

//here we intentionally dont want to handle the promise rejection with 'catch'
p.then(() => console.log("Done"));

/*Because this promise was not properly handled, we will get Unhandled Promise Rejection Warning in the terminal and we can use winston to fix this.*/

//APP.JS

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

//Uncaught Exception
process.on("uncaughtException", error => {
  //we log the uncaught error in console
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  //and then we use winston to handle it
  winston.error(error.message, error);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", error => {
  //we log the uncaught error in console
  console.log("WE GOT AN UNHANDLED REJECTION");
  //and then we use winston to handle it
  winston.error(error.message, error);
});

//throwing a rejected promise
const p = Promise.reject(new Error("Something failed miserably!"));
//here we intentionally dont want to handle the promise rejection with 'catch'
p.then(() => console.log("Done"));

winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });

if (!configJwt.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB......"))
  .catch(error => console.error("Could not connect to MongoDB....", error));

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));

/*When we have uncaught exceptions or unhandled rejection, we get error but the process "connected to mongodb" wont terminate so for best practise, we should manually terminate the process.

To do this, we simply modify the "uncaughtException & unhandledRejection" code to this below*/

//Uncaught Exception
process.on("uncaughtException", error => {
  winston.error(error.message, error);
  //0 - success, other numbers = failure
  process.exit(1);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", error => {
  winston.error(error.message, error);
  //0 - success, other numbers = failure
  process.exit(1);
});

/*For best practice, its better to log your error to both mongodb and file so incase database is down, you can revert to file*/

//APP.JS (REFACTORED VERSION)
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

//Uncaught Exception
//using a different transport/file to log "uncaughtExceptions"
winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);
//adding transport for logging errors to file
winston.add(winston.transports.File, { filename: "logfile.log" });
//adding transport for logging errors to mongodb, we pass entry to our vidly database @ line 35
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });

//Unhandled Promise Rejection
process.on("unhandledRejection", error => {
  //  this will throw an unhandledException which will be handled by winston
  throw error;
});

//throwing a rejected promise
const p = Promise.reject(new Error("Something failed miserably!"));
//here we intentionally dont want to handle the promise rejection with 'catch'
p.then(() => console.log("Done"));

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
