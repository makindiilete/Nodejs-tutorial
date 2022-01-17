/*Removing single document*/
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

//REMOVE SINGLE DOCUMENT
async function removeCourse(id) {
  const result = await Course
    //deleteOne will find all courses with "isPublished:false" and deletes the first one
    //     .deleteOne({isPublished: false});

    //deleteOne will find the course that match the given id and removes it
    .deleteOne({ _id: id });
  console.log(result);
}
removeCourse("5d00434263ac6862f4ca8057");

/*REMOVING MANY DOCUMENTS AT ONCE*/

/*  remove many docs
  .deleteMany({ _id: id });*/

//DISPLAYING THE REMOVED DOCUMENTS
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////NEEDED CODE (CMD VERSION)/////////////////////////////////////////////////////////////////
//TO DISPLAY THE REMOVED DOCUMENTS
async function removeCourse(id) {
  const result = await Course;
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
removeCourse("5d00434263ac6862f4ca8057");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////NEEDED CODE (API VERSION)/////////////////////////////////////////////////////////////////
//TO DISPLAY THE REMOVED DOCUMENTS
router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  console.log(course);
  if (!course) {
    res
        .status(404)
        .send(
            "The genre you try to delete doesnt exist or might have already been deleted!"
        );
  }
  res.send(course);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
