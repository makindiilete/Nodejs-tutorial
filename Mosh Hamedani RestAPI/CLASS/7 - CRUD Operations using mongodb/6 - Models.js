/*Here we want to create and save a document base on a schema (courseSchema) using a model. So to create a document, we compile the schema into a model.

MODEL : -

*/

const mongoose = require("mongoose");

//connecting to the locally installed mongodb on pc
//mongodb will automatically create 'playground' database for us.....
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB....."))
  .catch(error => console.error("Could not connect to MongoDB....", error));

//SCHEMA
//'courseSchema' defines the shape of course document in mongodb
const courseSchema = new mongoose.Schema({
  //    here we specify the key value pairs/ properties we want in the doc
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

//Classes, objects
//Human, John
//Course, nodeCourse

//first letter of the variable is uppercase because this is a class.
//mongoose.model takes two args : singular name of the collection, & schema variable name.
//Mongodb will attribute the first model arg "Course" to the collection, so to save a document inside the collection or to retrieve document, the name used to create the model must be quoted
const Course = mongoose.model("Course", courseSchema);
//first letter is lowercase because we are defining an object
const course = new Course({
  name: "Node.js Course",
  author: "Mosh",
  tags: ["node", "backend"],
  isPublished: true
});

//We didnt include "date" to our properties because we already set its value in the schema to "data.now"

//the good thing about no relational database is that we can have complex object i.e. array (tags) inside an object (course object) which is not possible in relational database unless we create three different tables
