/*Now that we have our course object, we need to save this to our database*/

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

//here we are dealing with async operation because it will takes some time to save to the file system. Mongodb will assign a unique identifier to this course object when we save it to the database so we can get this uid in the console
async function createCourse() {
  //////////////////////////////////////////////////////////////////////////
  /////////////////// NEEDED CODE (CMD VERSION) /////////////////////////////////////////
  const Course = mongoose.model("Course", courseSchema);
  //first letter is lowercase because we are defining an object
  const course = new Course({
    name: "Node.js Course",
    author: "Mosh",
    tags: ["node", "backend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}
createCourse();
////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////// NEEDED CODE (API VERSION) /////////////////////////////////////////////////////////
router.post("/", async (req, res) => {
  //  we first validate the input before we post with JOI FUNCTION "validateCourse"
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //if validation passed, we post
  const course = new Course({
    name: req.body.name
  });
  const result = await course.save();
  console.log(result);
  res.send(course);
});
////////////////////////////////////////////////////////////////////////////////////

//Run the app with "node app.js" (we wont run with nodemon bcos we dont want to create a new collection each them we edit a code)

/*
Now we get this result in the console: -

Connected to MongoDB.....
{ tags: [ 'node', 'backend' ],
  date: 2019-06-12T00:11:46.395Z,
  _id: 5d00434263ac6862f4ca8057,
  name: 'Node.js Course',
  author: 'Mosh',
  isPublished: true,
  __v: 0 }

  //this is our document and we have the uid "_id: 5d00434263ac6862f4ca8057"

  Now if we go back to compass and refresh, we see our "Playground" database, inside it we have our "courses" collection and inside this we have our document.

  Unlike relational databases, we didnt have to create a table, script the table. All we did was to create a document and stored it in mongodb database.
*/

//ADDING ANOTHER DOCUMENT IN THE COLLECTION
/*We already have a document in the collection, to add another one, all we need is to change the values of the properties and re-run the program. This will generate a new document base on this new values and the new document will be created below the first one.*/

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
createCourse();
