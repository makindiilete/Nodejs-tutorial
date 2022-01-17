/*We will be learning how we can add array of embedded documents*/
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

//array of embedded documents
createCourse("Node Course", [
  //author 1
  new Author({ name: "Mosh" }),
  //author 2
  new Author({ name: "Michaelz" })
]);

//activating the updateAuthor function
// deleteAuthor("5d035ad210bef31ea4f5d25f");

/*RESULT: -
{ authors:
   [ { _id: 5d03d8da43695408f022f881, name: 'Mosh' },
     { _id: 5d03d8da43695408f022f882, name: 'Michaelz' } ],
  _id: 5d03d8da43695408f022f883,
  name: 'Node Course',
  __v: 0 }
*/

//ADDING A NEW AUTHOR TO THE ARRAY
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

//adding to the existing array of embedded authors documents
addAuthor("5d03d8da43695408f022f883", new Author({ name: "Amy" }));

//REMOVING AN OBJECT FROM THE EMBEDDED DOCUMENT ARRAY
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
