/*In Mongodb, we have a bunch of operators for comparing values : -

eq (equal)
ne (not equal)
gt (greater than)
gte (greater than or equal to)
lt (less than)
lte (less than or equal to)
in
nin (not in)
*/

/*When we say a document is a collection of keyvalue pairs, what we mean is a document contains "keys" and "values" e.g. "name: mosh" - Here "name" is the key while "mosh" is the value.

USING COMPARISON OPERATORS : - Let us image that our document contains "price" properties which is a number, with comparison operators, we can get the result of all documents with prices equals to 10 : -
".find({price: {$eq: 10} })"

all documents with prices greater than 10 : -
".find({price: {$gt: 10} })"

all documents with prices greater than or equals to 10 : -
".find({price: {$gte: 10} })"

WORKING WITH RANGE : - Let us assume we want to get documents with prices greater than or equal to 10 and also less than or equal to 20 : -
".find({price: {$gte: 10, $lte: 20} })"

GETTING COURSES THAT ARE $10 OR $15 OR $20 : - Here we can simply use js array
".find({price: {$$in: [10, 15, 20] } })"
*/

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
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

//QUERIES
async function getCourses() {
  const Course = mongoose.model("Course", courseSchema);
  const courses = await Course
    // .find({ author: "Mosh", isPublished: true })
    // .find({price: {$eq: 10} })
    // .find({price: {$gt: 10} })
    // .find({price: {$gte: 10} })
    // .find({price: {$gte: 10, $lte: 20} })

    .find({ price: { $in: [10, 15, 20] } })
    .limit(10)
    //  sorting in ascending order by their name
    .sort({ name: 1 })
    //    the query should return only the names and tags
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
getCourses();
