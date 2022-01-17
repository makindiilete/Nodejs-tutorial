/*Question : - We are to import the array objects in the "exercise-data.json" into an a database.

1) Get all the published "backend" courses
2) Sort them by their name
3) Pick only their name and author
4) Display them

*/

/*

SOLUTION : -
1) Open cmd from the folder that contains the file "exercise-data.json"

2) Run the command "mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray"

*/

//SOLUTION BY MICHAELZ

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

//Getting the courses
async function getexerciseSchema() {
  const Course = mongoose.model("Course", exerciseSchema);
  const courses = await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(courses);
}
getexerciseSchema();

//RESULT: -
/*
Connected to MongoDB....
[ { _id: 5a68fde3f09ad7646ddec17e,
    name: 'ASP.NET MVC Course',
    author: 'Mosh' },
  { _id: 5a68fdc3615eda645bc6bdec,
    name: 'Express.js Course',
    author: 'Mosh' },
  { _id: 5a68fdd7bee8ea64649c2777,
    name: 'Node.js Course',
    author: 'Mosh' },
  { _id: 5a68fe2142ae6a6482c4c9cb,
    name: 'Node.js Course by Jack',
    author: 'Jack' } ]
*/

//SOLUTION BY MOSH
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
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}
async function run() {
  const courses = await getexerciseSchema();
  console.log(courses);
}
run();

//RESULT
/*

Connected to MongoDB....
[ { _id: 5a68fde3f09ad7646ddec17e,
    name: 'ASP.NET MVC Course',
    author: 'Mosh' },
  { _id: 5a68fdc3615eda645bc6bdec,
    name: 'Express.js Course',
    author: 'Mosh' },
  { _id: 5a68fdd7bee8ea64649c2777,
    name: 'Node.js Course',
    author: 'Mosh' },
  { _id: 5a68fe2142ae6a6482c4c9cb,
    name: 'Node.js Course by Jack',
    author: 'Jack' } ]
*/
