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

//get request to retrieve courses showing both course name and course author
async function listCourses() {
  const courses = await Course.find()
    //  here we want to get only the name property from the author's object/document while excluding the id property
    .populate("author", "name -_id")
    .select("name author");
  console.log(courses);
}

//calling/activating the createAuthor function and passing the 3 args value
// createAuthor("Mosh", "My bio", "My Website");

// calling/activating the createCourse function and passing the 2 args value where the author arg is the referenced id of the author
// createCourse("HTML Course", "5d034dfcdcda6c1f2066591c");

listCourses();
