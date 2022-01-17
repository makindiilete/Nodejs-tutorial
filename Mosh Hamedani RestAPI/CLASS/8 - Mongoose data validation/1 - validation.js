/*By default, we can create a document in mongodb without setting a schema first. MongoDB doesnt care if any property is missing.

With validation we can validate our model to ensure the follow a defined schema e.g. We can make any of the properties to be required.

Making the name property required

//SCHEMA VALIDATION
const courseSchema = new mongoose.Schema({
  //name property is required
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

*/

//APP.JS
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB....."))
  .catch(error => console.error("Could not connect to MongoDB....", error));

//SCHEMA VALIDATION
const courseSchema = new mongoose.Schema({
  //name property is required
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

// MODEL
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    // name: "Vue.js Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: false,
    price: 15
  });
  try {
    await course.validate();
    /* const result = await course.save();
        console.log(result);*/
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

Course validation failed: name: Path `name` is required.
Connected to MongoDB.....
*/

//TRIGGERING VALIDATION MANUALLY

async function createCourse() {
  const course = new Course({
    // name: "Vue.js Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: false,
    price: 15
  });
  try {
    //this triggers validation manually and we still get the same result
    await course.validate();
  } catch (error) {
    console.log(error.message);
  }
}
createCourse();

/*The downside of this manual validation is that it returns promise of void and because of this, we cannot have a code like this : -

async function createCourse() {
    const course = new Course({
        // name: "Vue.js Course",
        author: "Mosh",
        tags: ["angular", "frontend"],
        isPublished: false,
        price: 15
    });
    try {
       const isValid =  await course.validate();
       if (!isValid) {
       //execute this code if validation fails
       }
    } catch (error) {
        console.log(error.message);
    }
}
createCourse();



The only way to correct this is to use a call back function
*/

async function createCourse() {
  const course = new Course({
    // name: "Vue.js Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: false,
    price: 15
  });
  try {
    //callback function
    course.validate(error => {
      if (error) {
        console.log("Hey Error detected");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}
createCourse();

/*NOTE : - This validation is meaningless to mongodb, mongodb doesnt care about this validation we implemented unlike other relational database that has validation at database level, such doesnt exist in mongodb, its mongoose that comes to rescue to implement validation for us in place of mongodb, so mongoose will check the model for validation and if the validation fails, it wont be save to mongodb.
 */

//NOW THAT WE ARE USING MONGOOSE DIRECTLY IN OUR VALIDATION, WHAT ABOUT THE JOI WE USED BEFORE? WHICH SHOULD WE USE?

/*The simple answer is both because the compliment each other:  -

JOI : - Use this validation for your restful APIs, this is the first attack to make sure the data the client is sending is valid data.
MONGOOSE VALIDATION : - Use this to validate the data you want to save in a database document.
*/
