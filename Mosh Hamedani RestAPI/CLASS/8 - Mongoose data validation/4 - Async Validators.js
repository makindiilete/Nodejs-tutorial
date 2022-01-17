/*We already learnt how to create custom validators but Sometimes, the custom validation may involves reading something from a database or remote http service so we dont have the answer straight away. In that case we need an Async validator.

*/

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB....."))
  .catch(error => console.error("Could not connect to MongoDB....", error));

//SCHEMA VALIDATION
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"]
  },
  author: String,
  tags: {
    type: Array,
    //  defining a custom async validator
    validate: {
      isAsync: true,
      validator: function(value, callback) {
        setTimeout(() => {
          //Do some async work : in real world scenario, the result will be calculated base on the value we read from the file system or database or remote service.
          const result = value && value.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have at least one tag."
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 10,
    max: 15,
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
    category: "web",
    author: "Mosh",
    tags: null,
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

/*RESULT : -

We got 4 seconds delay then we get the message: -
 Connected to MongoDB.....
Course validation failed: tags: A course should have at least one tag.*/
