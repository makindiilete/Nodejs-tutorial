/*With counting, we can get the number of documents instead of the real document contents.

With ".count();" we simply return the number of documents that matches the specified criteria in the ".find()" method
*/

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
// createCourse();

//QUERIES
async function getCourses() {
  const Course = mongoose.model("Course", courseSchema);
  const courses = await Course.find({ author: "Mosh", isPublished: true })

    .limit(10)
    .sort({ name: 1 })
    // returns the number of documents that matches our criteria
    .count();
  console.log(courses);
}
getCourses();

//RESULT

/*
Connected to MongoDB.....
2
*/
