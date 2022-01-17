/*So far we only display a simple message about our validation error using

  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }

  We will examine the error object in more detail
*/

//EXPOSING THE ERROR OBJECT

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
    category: "-",
    author: "Mosh",
    tags: null,
    isPublished: true,
    price: 15
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    // HERE WE WANT TO EXPOSE OUR ERROR OBJECT
    for (field in error.errors) console.log(error.errors[field]);
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

Connected to MongoDB.....
{ ValidatorError: `-` is not a valid enum value for path `category`.


    at new ValidatorError (C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\mongo-demo\node_modules\mongoose\lib\error\validator.js:25:11)
    at validate (C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\mongo-demo\node_modules\mongoose\lib\schematype.js:782:13)
    at C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\mongo-demo\node_modules\mongoose\lib\schematype.js:831:11
    at Array.forEach (<anonymous>)
    at SchemaString.SchemaType.doValidate (C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\mongo-demo\node_modules\mongoose\lib\schematype.js:791:19)
    at C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\mongo-demo\node_modules\mongoose\lib\document.js:1526:9
    at process._tickCallback (internal/process/next_tick.js:61:11)
    at Function.Module.runMain (internal/modules/cjs/loader.js:744:11)
    at startup (internal/bootstrap/node.js:285:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)


  message: '`-` is not a valid enum value for path `category`.',
  name: 'ValidatorError',
  properties:
   { validator: [Function],
     message: '`{VALUE}` is not a valid enum value for path `{PATH}`.',
     type: 'enum',
     enumValues: [ 'web', 'mobile', 'network' ],
     path: 'category',
     value: '-' },
  kind: 'enum',
  path: 'category',
  value: '-',
  reason: undefined,
  '$isValidatorError': true }

{ ValidatorError: A course should have at least one tag.


    at new ValidatorError (C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\mongo-demo\node_modules\mongoose\lib\error\validator.js:25:11)
    at validate (C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\mongo-demo\node_modules\mongoose\lib\schematype.js:782:13)
    at C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\mongo-demo\node_modules\mongoose\lib\schematype.js:855:5
    at Timeout.setTimeout [as _onTimeout] (C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\mongo-demo\app.js:31:11)
    at ontimeout (timers.js:436:11)
    at tryOnTimeout (timers.js:300:5)
    at listOnTimeout (timers.js:263:5)
    at Timer.processTimers (timers.js:223:10)


  message: 'A course should have at least one tag.',
  name: 'ValidatorError',
  properties:
   { isAsync: true,
     validator: [Function: validator],
     message: 'A course should have at least one tag.',
     type: 'user defined',
     path: 'tags',
     value: null },
  kind: 'user defined',
  path: 'tags',
  value: null,
  reason: undefined,
  '$isValidatorError': true }



  So now that we have exposed all the errors object, we can simply call either ".message", ".name", ".reason" etc. Let us see this in action
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
    category: "-",
    author: "Mosh",
    tags: null,
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

/*
RESULT : -
Connected to MongoDB.....
Error message : - `-` is not a valid enum value for path `category`. Reason for error: - undefined
Error message : - A course should have at least one tag. Reason for error: - undefined
*/
