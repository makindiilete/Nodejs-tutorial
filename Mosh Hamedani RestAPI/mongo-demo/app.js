const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB....."))
  .catch(err => console.err("Could not connect to MongoDB....", err));

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
    enum: ["web", "mobile", "network"],
    lowercase: true
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
    //additional options
    get: value => Math.round(value),
    set: value => Math.round(value)
  }
});

// MODEL
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Vue.js Course",
    category: "WEB",
    author: "Mosh",
    tags: ["frontend"],
    isPublished: true,
    //rounding this with "math.round()" in the schema
    price: 12.89
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    // HERE WE WANT TO EXPOSE OUR ERROR OBJECT
    for (field in err.errors)
      console.log(
        "Error message : - " + err.errors[field].message,
        "Reason for error: - " + err.errors[field].reason
      );
  }
}
// createCourse();

//QUERIES
async function getCourses() {
  //hardcoded const to be used for pagination. In real world app we pass this values as query strings to our restful APIs

  // Real world scenario : - "/api/courses?pageNumber=2&pageSize=10"
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ _id: "5d015132d1ad6077506a0b78" })

    //pageNumber starts from 1 (bcos its not pageIndex only index starts from 0) so we need to minus 1 to starts from page 0
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 });
  console.log(courses[0].price);
}
getCourses();

//REMOVE DOCUMENTS
async function removeCourse(id) {
  const result = await Course;

  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
// removeCourse("5d0045377a12d80e2c8d75ce");
