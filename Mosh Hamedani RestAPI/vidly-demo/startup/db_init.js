const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence");
const autoIncrement = require("mongoose-auto-increment");

module.exports = function() {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));
};
