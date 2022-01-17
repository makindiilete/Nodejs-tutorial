/*Sometimes the built in validators in mongoose don't gives us the kind of validation we need e.g.

We have a "tags" property which is an array of strings. We cannot use required validator here to enforce that atleast a tag must be passed, if we do this, if the client pass in an empty array, this will be valid from mongoose point of view. Here  we need a custom validator
*/

//CUSTOM VALIDATOR FOR THE TAG PROPERTY
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
    //  defining a custom validator
    validate: {
      validator: function(value) {
        //length of the array sud be greater than 0
        return value.length > 0;
      },
      //custom message
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
    tags: [],
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
RESULT : -
Course validation failed: tags: A course should have at least one tag.
Connected to MongoDB.....

This error will kick in even if the tags property is not set in the model, because we set the tag type to array, mongoose will automatically setup an empty array for the tag when its excluded.


But if we set the value of tags to 'null', we get the error message, "cannot read property of null", so we need to modify our custom validator to cover "null" scenario so we can enforce a value
*/

//AMMENDED CODE FOR "NULL" SCENARIO
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
    //  defining a custom validator
    validate: {
      validator: function(value) {
        //tags must have a value (cannot be 'null) and the length should be greater than 0
        return value && value.length > 0;
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
