/*The error middleware that we have added in error.js only catches errors that happens as part of http request pipeline. This is particular to express but if an error is thrown outside express, our error middleware will not be called.

for example if we intentionally throw a new Error in our app.js, since this error is not thrown during an http request, the error will not be logged. */

//UNCAUGHT EXCEPTIONS EXAMPLE

const winston = require("winston");
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

winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });

/////////////////////////////////////////////////////////////////////
//throwing error outside http request/outside express context
throw new Error("Something failed during startup.");
/////////////////////////////////////////////////////////////////////

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

//Listening to port
const port = 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));

/*RESULT: - We get error in the terminal on running the app and the process terminated but the logfile is empty which means the error was not caught.*/

//HANDLING UNCAUGHT EXCEPTIONS

//APP.JS FILE

const winston = require("winston");
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

////////////////UNCAUGHT EXCEPTIONS////////////////////////////////
//this event emitter is raised when we have an exception/error in the app but no where have we handled it
process.on("uncaughtException", error => {
  //we log the uncaught error in console
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  //and then we use winston to handle it
  winston.error(error.message, error);
});

winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });

//throwing error outside http request/outside express context
throw new Error("Something failed during startup.");

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

/*Now if we run the app, we get error message but the process did not terminate and also in our log file we have the error logged :

{"message":"Something failed during startup.","stack":"Error: Something failed during startup.\n    at Object.<anonymous> (C:\\Users\\Michaelzgraphix\\Desktop\\web dev\\Nodejs\\vidly-demo\\app.js:35:7)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)\n    at Function.Module._load (internal/modules/cjs/loader.js:529:3)\n    at Function.Module.runMain (internal/modules/cjs/loader.js:741:12)\n    at startup (internal/bootstrap/node.js:285:19)\n    at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)","level":"error","timestamp":"2019-06-18T09:51:25.510Z"}
*/
