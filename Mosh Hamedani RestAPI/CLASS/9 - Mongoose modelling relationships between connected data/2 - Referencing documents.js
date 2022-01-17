/*We will learn how to ref a document in another document.
 * 1) Download the attached "population.js" file which contains already build database code
 * 2) Delete the "playground" database from compass so we start afresh with new database.*/

//STAGE ONE : - CREATING AUTHOR DOCUMENT
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

//Author model
const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

//course model
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String
  })
);

//Post request to create author with 3 args
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

//Post request to create course
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

//get request to retreive courses
async function listCourses() {
  const courses = await Course.find().select("name");
  console.log(courses);
}

//calling/activating the createAuthor function and passing the 3 args value
createAuthor("Mosh", "My bio", "My Website");

// createCourse("Node Course", "authorID");

// listCourses();

/*RESULT : -
Connected to MongoDB...
{ _id: 5d03512c3f242619b4f9c3bc,
  name: 'Mosh',
  bio: 'My bio',
  website: 'My Website',
  __v: 0 }
*/

//STAGE TWO : CREATING THE COURSE OBJECT WHERE WE WILL REFERENCE THE AUTHOR DOCUMENT/OBJECT
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

//Author model
const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

//course model
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //setting the schema for the author property which will be a ref to another document/object containing the author id
    author: {
      //here we set the type to ds bcos we want to ref an objectId
      type: mongoose.Schema.Types.ObjectId,
      //here we ref the name of the target collection
      ref: "Author"
    }
  })
);

//Post request to create author with 3 args
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

//Post request to create course
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

//get request to retreive courses
async function listCourses() {
  const courses = await Course.find().select("name");
  console.log(courses);
}

// createAuthor("Mosh", "My bio", "My Website");

// calling/activating the createCourse function and passing the 2 args value where the author arg is the referenced id of the author
createCourse("Node Course", "5d034dfcdcda6c1f206659f5");

// listCourses();

/*
RESULT : -
Connected to MongoDB...
{ _id: 5d03517dba37e200d411d333,
  name: 'Node Course',
  author: 5d034dfcdcda6c1f206659f5,
  __v: 0 }

  Now we have the course created with the authors property which takes the ObjectId*/
