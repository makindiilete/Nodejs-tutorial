/*We want to learn how to update documents in a mongodb database*/

// Approach: Query first : - This approach is useful if you receive input from the client and you want to ensure the update is a valid operation e.g. We might not want to update courses with a specific properties e.g. we dont want to update courses with "isPublished:true", so its important to retrieve the document first before update.

/*
1) findById()
2) Modify its properties
3) save()
*/

// Approach: Update first : -
/*
1) Go into the database and update directly
2) Optionally: get the updated document
*/

//QUERY FIRST APPROACH

//APP.JS
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
    name: "Vue.js Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: false
  });

  const result = await course.save();
  console.log(result);
}
// MODEL
const Course = mongoose.model("Course", courseSchema);

//QUERIES
async function getCourses() {
  //hardcoded const to be used for pagination. In real world app we pass this values as query strings to our restful APIs

  // Real world scenario : - "/api/courses?pageNumber=2&pageSize=10"
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "Mosh", isPublished: true })

    //pageNumber starts from 1 (bcos its not pageIndex only index starts from 0) so we need to minus 1 to starts from page 0
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
getCourses();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// NEEDED CODE (CMD VERSION)      //////////////////////////////////////////////////////////////
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) {
    console.log("This course does not exist in the database");
  }

  //this
  // course.isPublished = true;
  // course.author = 'Another Author';

  //or
  course.set({
    isPublished: true,
    author: "Another Author"
  });
  const result = await course.save();
  console.log(result);
}
updateCourse("5d00434263ac6862f4ca8057");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// NEEDED CODE (API VERSION)      //////////////////////////////////////////////////////////////
router.put("/:id", async (req, res) => {
  // JOI VALIDATION
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = await Course.findById(req.params.id);
  course.set({
    name: req.body.name,
    author: req.body.author
  });
  const result = await course.save();
  res.send(result);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//PREVENTING CERTAIN DOCUMENT FROM GETTING UPDATED
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
    name: "Vue.js Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: false
  });

  const result = await course.save();
  console.log(result);
}
// MODEL
const Course = mongoose.model("Course", courseSchema);

//QUERIES
async function getCourses() {
  //hardcoded const to be used for pagination. In real world app we pass this values as query strings to our restful APIs

  // Real world scenario : - "/api/courses?pageNumber=2&pageSize=10"
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "Mosh", isPublished: true })

    //pageNumber starts from 1 (bcos its not pageIndex only index starts from 0) so we need to minus 1 to starts from page 0
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
getCourses();

//UPDATE DOCUMENTS
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) {
    console.log("This course does not exist in the database");
  }
  if (course.isPublished) {
    console.log("You are not permitted to edit this course");
    return;
  }

  //this
  // course.isPublished = true;
  // course.author = 'Another Author';

  //or
  course.set({
    isPublished: true,
    author: "Another Mayor"
  });
  const result = await course.save();
  console.log(result);
}
updateCourse("5d00434263ac6862f4ca8057");
