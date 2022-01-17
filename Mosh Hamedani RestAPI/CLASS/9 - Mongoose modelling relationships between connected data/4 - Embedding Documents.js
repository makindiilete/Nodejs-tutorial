/*Let us check the 2nd approach which is embedding documents.
 * 1) Download the attached file "embedding.js"
 * 2) Delete the playground database so we start afresh*/

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //embedding the author object: we declare the author property and assign its value to the variable 'authorSchema'
    author: authorSchema
  })
);

//post request to create course, we av 2 args, 'course name', the 2nd arg is the author object which we need to pass as object while creating the course
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

//activating the createCourse function while creating the author object
createCourse("Node Course", new Author({ name: "Mosh" }));

/*RESULT: -
Connected to MongoDB...
{ _id: 5d035ad210bef31ea4f5d25f,
  name: 'Node Course',
  author: { _id: 5d035ad210bef31ea4f5d25e, name: 'Mosh' },
  __v: 0 }

So we have the author document created as a sub-document or an embedded document inside the course document. This embedeed document are like normal documents so most features that are available on normal documents are available for them e.g. We can implement validation here that the property "author.name" should be required. However, embedded documents cannot be saved on their own, they can only be saved inside their parent.*/

/*UPDATING THE EMBEEDED DOCUMENT FROM THE PARENT DOCUMENT*/
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //embedding the author object: we declare the author property and assign its value to the variable 'authorSchema'
    author: authorSchema
  })
);

//post request to create course, we av 2 args, 'course name', the 2nd arg is the author object which we need to pass as object while creating the course
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

//get request to list all courses
async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

//put request to update the author's name from the parent object
async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = "Michaelz Omoakin";
  course.save();
  console.log("Authors name Updated", course);
}

//activating the createCourse function while creating the author object
// createCourse("Node Course", new Author({ name: "Mosh" }));

//activating the updateAuthor function
updateAuthor("5d035ad210bef31ea4f5d25f");

/*RESULT:
Authors name Updated { _id: 5d035ad210bef31ea4f5d25f,
  name: 'Node Course',
  author: { _id: 5d035ad210bef31ea4f5d25e, name: 'Michaelz Omoakin' },
  __v: 0 }*/

/*UPDATING THE EMBEDDED DOCUMENT DIRECTLY WITHOUT PASSING THOUGH THE PARENT*/
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //embedding the author object: we declare the author property and assign its value to the variable 'authorSchema'
    author: authorSchema
  })
);

//post request to create course, we av 2 args, 'course name', the 2nd arg is the author object which we need to pass as object while creating the course
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

//get request to list all courses
async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

//put request to update the author's name from the parent object
async function updateAuthor(courseId) {
  //'.update({id})' - find the document with the given id and set it "$set" to this object "$set:{}"
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        "author.name": "John Doe"
      }
    }
  );
  console.log("Authors name Updated", course);
}

//activating the createCourse function while creating the author object
// createCourse("Node Course", new Author({ name: "Mosh" }));

//activating the updateAuthor function
updateAuthor("5d035ad210bef31ea4f5d25f");

/*RESULT:
Connected to MongoDB...
Authors name Updated { n: 1, nModified: 1, ok: 1 }*/

/*REMOVING AN EMBEDDED DOCUMENT
You can either remove a property from the embedded document :
//delete request to remove the authors.name property
async function deleteAuthor(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $unset: {
        "author.name": ""
      }
    }
  );
}


OR

You remove the embedded document itself as a whole
//delete request to remove the authors.name property
async function deleteAuthor(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $unset: {
        "author": ""
      }
    }
  );
}
*/

/*VALIDATING EMBEDDED DOCUMENTS : -
 * We can validate the course to ensure every course contains an author*/
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //applying validation to ensure every course contains an author
    author: {
      type: authorSchema,
      required: true
    }
  })
);

//We can also validate the authors document itself to set certain properties to be required like "website or name"

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  website: String
});
