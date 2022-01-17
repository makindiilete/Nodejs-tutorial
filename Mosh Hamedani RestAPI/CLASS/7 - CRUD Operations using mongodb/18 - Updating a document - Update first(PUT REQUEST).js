/*In the last lecture we first retrieve the document to check if it is a document we are permitted to edit or to ensure the details are correct before editing. This we have learnt its useful when we expect input from the clients but in a scenario where you dont need client input and you need what you are doing, you might want to edit directly.
 *
 * We will be needing mongodb operator for this : - "https://docs.mongodb.com/manual/reference/operator/update"*/

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////NEDED CODE (CMD VERSION)//////////////////////////////////////////////////////////////////////////////////////
//UPDATE DOCUMENTS DIRECTLY ('$set' is mongodb operator for setting value of a field)
async function updateCourse(id) {
  const result = await Course
    //updating specific course with a given id
    .update(
      { _id: id },
      {
        $set: {
          author: "Mosh",
          isPublished: false
        }
      }
    );
}
updateCourse("5d00434263ac6862f4ca8057");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////NEDED CODE (API VERSION)//////////////////////////////////////////////////////////////////////////////////////
//UPDATE DOCUMENTS DIRECTLY ('$set' is mongodb operator for setting value of a field)
async function updateCourse(id) {
  const result = await Course
    //updating specific course with a given id
    .update(
      { _id: id },
      {
        $set: {
          author: "Mosh",
          isPublished: false
        }
      }
    );
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//TO GET THE DOCUMENTS THAT WAS UPDATED AFTER THE UPDATE : - The result displayed in the console after the update will not be the new update but the old......
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////NEEDED CODE (CMD VERSION)//////////////////////////////////////////////////////////////////////////////
//UPDATE DOCUMENTS DIRECTLY ('$set' is mongodb operator for setting value of a field)
async function updateCourse(id) {
  const course = await Course
    //updating specific course with a given id
    .findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          author: "Michaelz",
          isPublished: true
        }
      }
    );
  console.log(course);
}
updateCourse("5d00434263ac6862f4ca8057");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////NEEDED CODE (API VERSION)//////////////////////////////////////////////////////////////////////////////
router.put("/:id", async (req, res) => {
  // JOI VALIDATION
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { author: req.body.author }
  );
  res.send(course);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//DISPLAYING IN THE CONSOLE THE RESULT OF THE NEWLY UPDATE DOCUMENT
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

//UPDATE DOCUMENTS DIRECTLY ('$set' is mongodb operator for setting value of a field)
async function updateCourse(id) {
  const course = await Course
    //updating specific course with a given id
    .findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          author: "Jason",
          isPublished: false
        }
      },
      { new: true }
    );
  console.log(course);
}
updateCourse("5d00434263ac6862f4ca8057");
