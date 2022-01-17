/*Having installed mongodb and performed all the configuration settings, we can now connect to mongo database.
 1) Ensure that mongodb is listening to port in cmd
  then execute this codes in "app.js"*/

const mongoose = require("mongoose");

//connecting to the locally installed mongodb on pc
//mongodb will automatically create 'playground' database for us.....
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB....."))
  .catch(error => console.error("Could not connect to MongoDB....", error));
