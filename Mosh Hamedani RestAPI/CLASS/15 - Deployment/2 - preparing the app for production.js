/*To prepare our app for production to heroku, we need to install two npm packages

1) npm install helmet@3.11.0   : This protects our app from well known web vulnerabilities
2) npm install compression@1.7.2 : This is use to compress the http request that we send to the clients
3) Open the startup folder and add a new module "prod.js"
*/

//prod.js
const helmet = require("helmet");
const compression = require("compression");

module.exports = function(app) {
  app.use(helmet());
  app.use(compression());
};

//app.js
const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db_init")();
require("./startup/config")();
require("./startup/joi_validate")();
require("./startup/prod")(app);

const port = process.env.PORT || 4000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
