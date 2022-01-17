/*
We already learnt one of the built in validators in mongoose which include the "required: true".

We want to take a closer look at this validators.

1) REQUIRED : - This returns a boolean so you can set its value to boolean or a function that returns a boolean. The function will be useful if you want to conditionally set the validation e.g. Let assume that, "price" is only required if the course is published
2) minlength : - Minimum required characters "minlength:5" (useful for string)
3) maxlength : - Maximum allowed characters "maxlength: 255" (useful for string)
4) min : - minimum (useful for numbers & dates)
5) max : - maximum (useful for numbers & dates)
4) Match : - Useful for regular expression "match: /pattern/"
5) enum : - when we use this, we defined an array of strings and the field must be either one of these strings "enum: ["web", "mobile", "network"]"
*/

//Here we implement a validation set the "price" property to "required" if "isPublished:true"

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB....."))
  .catch(error => console.error("Could not connect to MongoDB....", error));

//SCHEMA VALIDATION
const courseSchema = new mongoose.Schema({
  //required validator set to simple boolean
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  // required validator set to boolean function
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    }
  }
});

// MODEL
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    // name: "Vue.js Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true
    // price: 15
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
createCourse();

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
// getCourses();

//REMOVE DOCUMENTS
async function removeCourse(id) {
  const result = await Course;

  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
// removeCourse("5d0045377a12d80e2c8d75ce");

/*
RESULT : -
Course validation failed: price: Path `price` is required., name: Path `name` is required.
Connected to MongoDB.....
*/

/*

2) minlength : - Minimum required characters "minlength:5" (useful for string)
3) maxlength : - Maximum allowed characters "maxlength: 255" (useful for string)
4) min : - minimum (useful for numbers & dates)
5) max : - maximum (useful for numbers & dates)
4) Match : - Useful for regular expression "match: /pattern/"
5) enum : - when we use this, we defined an array of strings and the field must be either one of these strings "enum: ["web", "mobile", "network"]"
*/

//TESTING ENUM VALIDATION
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB....."))
  .catch(error => console.error("Could not connect to MongoDB....", error));

//SCHEMA VALIDATION
const courseSchema = new mongoose.Schema({
  //name property is required
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"]
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  // setting require to a function that returns a boolean. We cannot use arrow function here
  price: {
    type: Number,
    required: function() {
      return !this.isPublished;
    }
  }
});

// MODEL
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Vue.js Course",
    // INVALID CATEGORY
    category: "-",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 15
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
createCourse();

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
// getCourses();

//REMOVE DOCUMENTS
async function removeCourse(id) {
  const result = await Course;

  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
// removeCourse("5d0045377a12d80e2c8d75ce");

/*

RESULT : - Course validation failed: category: `-` is not a valid enum value for path `category`.
Connected to MongoDB.....
*/

//TESTING FOR MIN LENGTH
