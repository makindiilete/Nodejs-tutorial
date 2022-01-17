/*Let us see how to retrieve a document from mongodb database
Available query methods : -
find : - this returns all the documents in the database
findById : - returns the document with the given id
findOne : - returns a single document
*/

//FIND
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

async function createCourse() {
  const Course = mongoose.model("Course", courseSchema);
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

////////////////////////////////////////////////////////////////////////////////////
///////////// NEEDED CODE /////////////////////////////////////////////////////////
//Getting the list of all documents (COMMAND PROMPT VERSION)
async function getCourses() {
  const Course = mongoose.model("Course", courseSchema);
  const courses = await Course.find();
  console.log(courses);
}
getCourses();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////// NEEDED CODE /////////////////////////////////////////////////////////
//Getting the list of all documents (API VERSION)
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});
////////////////////////////////////////////////////////////////////////////////////

/*RESULT : -

Connected to MongoDB.....
[ { tags: [ 'node', 'backend' ],
    date: 2019-06-12T00:11:46.395Z,
    _id: 5d00434263ac6862f4ca8057,
    name: 'Node.js Course',
    author: 'Mosh',
    isPublished: true,
    __v: 0 },
  { tags: [ 'angular', 'frontend' ],
    date: 2019-06-12T00:20:07.732Z,
    _id: 5d0045377a12d80e2c8d75ce,
    name: 'Angular Course',
    author: 'Mosh',
    isPublished: true,
    __v: 0 } ]
*/

//FILTERING THE GET REQUEST (find arguments)
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

async function createCourse() {
  const Course = mongoose.model("Course", courseSchema);
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}
////////////////////////////////////////////////////////////////////////////////
//PASSING ARGS TO THE FIND METHOD : - Get all courses published by mosh
async function getCourses() {
  const Course = mongoose.model("Course", courseSchema);
  const courses = await Course.find({ author: "Mosh", isPublished: true });
  console.log(courses);
}
getCourses();
///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
///////////////////////API VERSION//////////////////////////////////////////////////
router.get("/", async (req, res) => {
  const courses = await Course.find({ author: "Mosh", isPublished: true });
  res.send(courses);
});
//////////////////////////////////////////////////////////////////////////////////////

//FILTERING THE DOCUMENTS TO BE RETURNED : With filter, we can apply limit, sorting etc to the documents returned to the client
/*limit : - Specifies the maximum number of documents the query will return
 * sort : - We sort the document in ascending order "1" or descending order "-1"
 * select : - We can select the properties we want to be returned*/

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

async function createCourse() {
  const Course = mongoose.model("Course", courseSchema);
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

//QUERIES
async function getCourses() {
  const Course = mongoose.model("Course", courseSchema);
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10)
    //  sorting in ascending order by their name
    .sort({ name: 1 })
    //    the query should return only the names and tags
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
getCourses();

/*
RESULT : -

Connected to MongoDB.....
[ { tags: [ 'angular', 'frontend' ],
    _id: 5d0045377a12d80e2c8d75ce,
    name: 'Angular Course' },
  { tags: [ 'node', 'backend' ],
    _id: 5d00434263ac6862f4ca8057,
    name: 'Node.js Course' } ]
*/
