const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  website: String
});

//AUTHORS SCHEMA
const Author = mongoose.model("Author", authorsSchema);

//COURSE SCHEMA
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //applying array of embedded documents
    authors: [authorsSchema]
  })
);

//post request to create course, we av 2 args, 'course name', the 2nd arg is the authors object which we need to pass as object while creating the course
async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

//get request to list all courses
async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

//put request to update the authors's name from the parent object
async function updateAuthor(courseId) {
  //'.update({id})' - find the document with the given id and set it "$set" to this object "$set:{}"
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        "authors.name": "John Doe"
      }
    }
  );
  console.log("Authors name Updated", course);
}

//delete request to remove the authorss.name property
async function deleteAuthor(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $unset: {
        authors: ""
      }
    }
  );
}

//Post request to add to the array of embedded documents
async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

//delete request to remove an author from the embedded author array
async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

//removing an author from the embedded author array
removeAuthor("5d03d8da43695408f022f883", "5d03e6be3b6c1f20a8c03fe4");
