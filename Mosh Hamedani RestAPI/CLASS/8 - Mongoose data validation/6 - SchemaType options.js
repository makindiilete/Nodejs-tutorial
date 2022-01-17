/*We have learnt that in our schema, we can either set the property directly or use and object*/

/*
//schema property directly
author: String,

    //schema object
    category: {
    type: String,
        required: true,
enum: ["web", "mobile", "network"]
},*/

/*
We have some additional properties we can use for our schema object
1) lowercase : - This returns a boolean : - it converts the result to lowercase
2) uppercase : - this returns boolean and converts result to uppercase
3) trim : - this returns a boolean : - this removes padding from our strings
*/

//lowercase
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
    category: "WEB",
    author: "Mosh",
    tags: ["frontend"],
    isPublished: true,
    price: 15
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

/*Mongoose will create the documents and set the category value to lowercase even though we entered uppercase: -

Connected to MongoDB.....
{ tags: [ 'frontend' ],
(node:31832) [DEP0079] DeprecationWarning: Custom inspection function on Objects via .inspect() is deprecated
  date: 2019-06-12T19:16:21.826Z,
  _id: 5d014f8596d29d7c58150d9b,
  name: 'Vue.js Course',
  category: 'web',
  author: 'Mosh',
  isPublished: true,
  price: 15,
  __v: 0 }
*/

/*Additional schema options that work for any type of property
'get' & 'set'
*/

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

/*RESULT: -

Connected to MongoDB.....
{ tags: [ 'frontend' ],
(node:30544) [DEP0079] DeprecationWarning: Custom inspection function on Objects via .inspect() is deprecated
  date: 2019-06-12T19:23:30.611Z,
  _id: 5d015132d1ad6077506a0b78,
  name: 'Vue.js Course',
  category: 'web',
  author: 'Mosh',
  isPublished: true,
  price: 13,
  __v: 0 }

Our price got rounded up from 12.89 to 13. And even if we go into the database to edit the property from integer to double and change the figure back to decimal then retrieve it, the getter will be called and we will get a rounded figure instead of the decimal in the database
*/

//GETTING THE PRICE PROPERTY TO CHECK FOR getter
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

//RESULT : - We get 13 even though we have 12.8 in the database
