/*QUESTION : -
1) Get all the published frontend and backend courses
2) Sort them by their price in a descending order
3) Pick only their name and author
4) Display them
*/

//MICHAELZ SOLUTION (USING IN METHOD)
const mongoose = require("mongoose");

//CONNECTING TO DB
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB...."))
  .catch(error => console.error("Could not connect to MongoDB....", error));

//SCHEMA
const exerciseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

//defining the course const

const Course = mongoose.model("Course", exerciseSchema);

//Getting the courses
async function getexerciseSchema() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] }
  })
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}
async function run() {
  const courses = await getexerciseSchema();
  console.log(courses);
}
run();

//RESULT
/*
Connected to MongoDB....
[ { _id: 5a68fdd7bee8ea64649c2777,
    name: 'Node.js Course',
    author: 'Mosh',
    price: 20 },
  { _id: 5a6900fff467be65019a9001,
    name: 'Angular Course',
    author: 'Mosh',
    price: 15 },
  { _id: 5a68fde3f09ad7646ddec17e,
    name: 'ASP.NET MVC Course',
    author: 'Mosh',
    price: 15 },
  { _id: 5a68fe2142ae6a6482c4c9cb,
    name: 'Node.js Course by Jack',
    author: 'Jack',
    price: 12 },
  { _id: 5a68fdc3615eda645bc6bdec,
    name: 'Express.js Course',
    author: 'Mosh',
    price: 10 } ]
*/

//USING OR METHOD
const mongoose = require("mongoose");

//CONNECTING TO DB
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB...."))
  .catch(error => console.error("Could not connect to MongoDB....", error));

//SCHEMA
const exerciseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

//defining the course const

const Course = mongoose.model("Course", exerciseSchema);

//Getting the courses
async function getexerciseSchema() {
  return await Course.find({ isPublished: true })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}
async function run() {
  const courses = await getexerciseSchema();
  console.log(courses);
}
run();

//EXERCISE 3 : - Get all the published courses that are $15 or more, or have the word 'by' in their name.
/*here we will use 'or' method and regular expression for finding the 'by' character*/

const mongoose = require("mongoose");

//CONNECTING TO DB
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB...."))
  .catch(error => console.error("Could not connect to MongoDB....", error));

//SCHEMA
const exerciseSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

//defining the course const

const Course = mongoose.model("Course", exerciseSchema);

//Getting the courses
async function getexerciseSchema() {
  // getting courses that are published
  return await Course.find({ isPublished: true })
    //  getting courses with price >= 15 or their name contains "by"
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}
async function run() {
  const courses = await getexerciseSchema();
  console.log(courses);
}
run();
