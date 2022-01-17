const winston = require("winston");
const express = require("express");
const app = express();

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db_init")();
require("./startup/config")();
require("./startup/joi_validate")();
require("./startup/prod")(app);

const port = process.env.PORT || 4000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
