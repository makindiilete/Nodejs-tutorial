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
