/*The next thing we need to do is to create a schema. We use a schema to define the shape of object in a collection in mongodb.
A collection in mongodb is like a table in relational database. This collections contains documents and documents are similar to a row in relational database. So in relational databases, we have tables and rows, while in mongodb, we have collections and documents.

Each document is a container of key value pairs : - When we say a document is a collection of keyvalue pairs, what we mean is a document contains "keys" and "values" e.g. "name: mosh" - Here "name" is the key while "mosh" is the value

We use schema to define the shape of the document in mongodb, to define what properties we have in the document. (This schema is mongoose concept, not mongodb).
*/

/*
SCHEMA PROPERTY TYPES
String
Number
Date
Buffer : For binary data
Boolean
ObjectID : For Unique identifier
Array
*/

//CREATING A SCHEMA
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
