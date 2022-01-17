/* Currently with the implementation of ".find({ author: 'Mosh", isPublished: true })" : - This returns courses that are authored by "Mosh" and published.

What if we want to get courses that are published but are not authored by Mosh? That is where we need the OR operator :

We have two logical operators : - OR, AND
*/

//OR : - This returns course published by mosh or courses that are published even if they were not authored by mosh
.or([{ author: "Mosh" }, { isPublished: true }])

//AND : - This returns course published by mosh or courses that are published even if they were not authored by mosh
    .and({ author: "Mosh", isPublished: true });

//APP.JS

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
        name: "Vue.js Course",
        author: "Mosh",
        tags: ["angular", "frontend"],
        isPublished: false
    });

    const result = await course.save();
    console.log(result);
}
// createCourse();

//QUERIES
async function getCourses() {
    const Course = mongoose.model("Course", courseSchema);
    const courses = await Course
    // .find({ author: "Mosh", isPublished: true })
        .find()
        .or([{ author: "Mosh" }, { isPublished: true }])
        // .and({ author: "Mosh", isPublished: true })

        .limit(10)
        //  sorting in ascending order by their name
        .sort({ name: 1 })
        //    the query should return only the names and tags
        .select({ name: 1, tags: 1 });
    console.log(courses);
}
getCourses();




