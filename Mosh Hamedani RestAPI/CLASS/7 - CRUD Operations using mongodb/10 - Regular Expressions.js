/*As you know that regular expressions gives us more control over strings. With regular expression, we can specify the pattern of the input/string and this can be used for email validation in angular but also we can use regular expression to in nodejs.
 * For example with the code : -
".find({author: 'Mosh', isPublished: true", we are getting courses whose author are "Mosh" so if we have a course with author "Mosh hamedani", such courses will still be left out even though their names begins with "Mosh", with regular expression, we can use pattern instead of hardcoded string : -

SYNTAX : -
.find({author: /pattern/ })
^ : starts with
$ : ends with
.* : contains

TYPES : -
/^Mosh/ - Represents a string that starts with "Mosh"
/Hamedani$/ - Represents a string that ends with "Hamedani"



THESE REGULAR EXPRESSIONS ARE CASE SENSITIVE. TO MAKE IT NON-CASE SENSITIVE, WE APPEND "/i" at the end i.e.

/^Mosh/i - Represents a string that starts with "Mosh" without case sensitivity
/Hamedani$/i - Represents a string that ends with "Hamedani" without case sensitivity
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
  const courses = await Course
    // .find({ author: "Mosh", isPublished: true })

    //Starts with Mosh (case sensitive)
    .find({ author: /^Mosh/ })

    //Ends with Hamedani (case sensitive)
    .find({ author: /Mosh$/ })

    //contains the string 'Mosh' anywhere (case sensitive)
    .find({ author: /.*Mosh.*/ })

    //Starts with Mosh (non- case sensitive)
    .find({ author: /^Mosh/i })

    //Ends with Hamedani (non-case sensitive)
    .find({ author: /Mosh$/i })

    //contains the string 'Mosh' anywhere (non-case sensitive)
    .find({ author: /.*Mosh.*/ })

    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
getCourses();
