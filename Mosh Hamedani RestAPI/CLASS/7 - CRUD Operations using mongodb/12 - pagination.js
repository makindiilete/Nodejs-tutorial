/*We already learnt the ".limit" method which allows us to limit the number of documents we get, another method that goes hand in hand with the limit method is the skip method ".skip()"

We use the skip method to implement pagination
*/

//PAGINATION

//hardcoded const to be used for pagination. In real world app we pass this values as query strings to our restful APIs

// Real world scenario : - "/api/courses?pageNumber=2&pageSize=10"
const pageNumber = 2;
const pageSize = 10;

const Course = mongoose.model("Course", courseSchema);
const courses = await Course.find({ author: "Mosh", isPublished: true })

  //pageNumber starts from 1 (bcos its not pageIndex only index starts from 0) so we need to minus 1 to starts from page 0
  .skip((pageNumber - 1) * pageSize)
  //  and we change our limit to 'pageSize'
  .limit(pageSize);

//API.JS

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
  //hardcoded const to be used for pagination. In real world app we pass this values as query strings to our restful APIs

  // Real world scenario : - "/api/courses?pageNumber=2&pageSize=10"
  const pageNumber = 2;
  const pageSize = 10;

  const Course = mongoose.model("Course", courseSchema);
  const courses = await Course.find({ author: "Mosh", isPublished: true })

    //pageNumber starts from 1 (bcos its not pageIndex only index starts from 0) so we need to minus 1 to starts from page 0
    .skip((pageNumber - 1) * pageSize)
    //  and we change our limit to 'pageSize'
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
getCourses();
