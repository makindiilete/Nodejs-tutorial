/*Now let us get the list of all our courses*/
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

//Author model
const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

//course model
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //setting the schema for the authors document which we want to reference in the course document
    author: {
      //here we set the type to ds bcos we want to ref an objectId
      type: mongoose.Schema.Types.ObjectId,
      //here we ref the name of the target collection
      ref: "Author"
    }
  })
);

//Post request to create author with 3 args
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

//Post request to create course
async function createCourse(name) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

//get request to retrieve courses while displaying only the course name
async function listCourses() {
  const courses = await Course.find().select("name");
  console.log(courses);
}

//calling/activating the createAuthor function and passing the 3 args value
// createAuthor("Mosh", "My bio", "My Website");

// calling/activating the createCourse function and passing the 2 args value where the author arg is the referenced id of the author
// createCourse("Node Course", "5d034dfcdcda6c1f206659f5");

//getting the list of all our courses
listCourses();

/*
RESULT : -
[ { _id: 5d034fc622137b1768ec2466, name: 'Node Course' },
  { _id: 5d03508a3c66881674d87a7d, name: 'Node Course' } ]


  As you can see, this only return the course name and document id without the authors, this is because we used a ".select("name")" method in line 59 to only list the course name, so we can add the authors property now to display the authors too
*/

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

//Author model
const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

//course model
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //setting the schema for the author property which will be a ref to another document/object containing the author id
    author: {
      //here we set the type to ds bcos we want to ref an objectId
      type: mongoose.Schema.Types.ObjectId,
      //here we ref the name of the target collection
      ref: "Author"
    }
  })
);

//Post request to create author with 3 args
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

//Post request to create course
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

//get request to retrieve courses showing both course name and course author
async function listCourses() {
  const courses = await Course.find().select("name author");
  console.log(courses);
}

//calling/activating the createAuthor function and passing the 3 args value
// createAuthor("Mosh", "My bio", "My Website");

// calling/activating the createCourse function and passing the 2 args value where the author arg is the referenced id of the author
// createCourse("Node Course", "5d034dfcdcda6c1f206659f5");

listCourses();

/*
RESULT : -
Connected to MongoDB...
[ { _id: 5d034fc622137b1768ec2466, name: 'Node Course' },
  { _id: 5d03508a3c66881674d87a7d,
    name: 'Node Course',
    author: 5d034dfcdcda6c1f206659f5 } ]

    As we can see, we expect to get the author's name but it was the id we got, to get the author's name from the referenced document "Author", we need to use the ".populate('path')" method
*/

//GETTING THE COURSE NAME & AUTHOR
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

//Author model
const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

//course model
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //setting the schema for the author property which will be a ref to another document/object containing the author id
    author: {
      //here we set the type to ds bcos we want to ref an objectId
      type: mongoose.Schema.Types.ObjectId,
      //here we ref the name of the target collection
      ref: "Author"
    }
  })
);

//Post request to create author with 3 args
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

//Post request to create course
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

//get request to retrieve courses showing both course name and course author
async function listCourses() {
  const courses = await Course.find()
    //  here we use the populate method to get d author name and we pass the target object/document which is the 'const' we defined in line 35
    .populate("author")
    .select("name author");
  console.log(courses);
}

//calling/activating the createAuthor function and passing the 3 args value
// createAuthor("Mosh", "My bio", "My Website");

// calling/activating the createCourse function and passing the 2 args value where the author arg is the referenced id of the author
// createCourse("Node Course", "5d034dfcdcda6c1f206659f5");

listCourses();

/*RESULT : -
[ { _id: 5d034fc622137b1768ec2466, name: 'Node Course' },
  { _id: 5d03508a3c66881674d87a7d,
    name: 'Node Course',
    author:
     { _id: 5d034dfcdcda6c1f206659f5,
       name: 'Mosh',
       bio: 'My bio',
       website: 'My Website',
       __v: 0 } } ]


       As we can see, we now get the complete details of the author document/object we referenced.
*/

/*In a real world scenario, this author objects can have 50 or more properties, we dont want to return all this, we only want the author's name in this case, so we adjust the code and pass the 'name' property as second argument in the populate method: - ".populate('author', 'name')"*/
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

//Author model
const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

//course model
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //setting the schema for the author property which will be a ref to another document/object containing the author id
    author: {
      //here we set the type to ds bcos we want to ref an objectId
      type: mongoose.Schema.Types.ObjectId,
      //here we ref the name of the target collection
      ref: "Author"
    }
  })
);

//Post request to create author with 3 args
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

//Post request to create course
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

//get request to retrieve courses showing both course name and course author
async function listCourses() {
  const courses = await Course.find()
    //  here we want to get only the name property from the author's object/document
    .populate("author", "name")
    .select("name author");
  console.log(courses);
}

//calling/activating the createAuthor function and passing the 3 args value
// createAuthor("Mosh", "My bio", "My Website");

// calling/activating the createCourse function and passing the 2 args value where the author arg is the referenced id of the author
// createCourse("Node Course", "5d034dfcdcda6c1f206659f5");

listCourses();

/*RESULT : -
  { _id: 5d03508a3c66881674d87a7d,
    name: 'Node Course',
    author: { _id: 5d034dfcdcda6c1f206659f5, name: 'Mosh' } } ]

    Now have just the id of the author document and the name, we can also exclude this id so we are left with just the author's name*/

//EXCLUDING THE ID
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

//Author model
const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

//course model
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //setting the schema for the author property which will be a ref to another document/object containing the author id
    author: {
      //here we set the type to ds bcos we want to ref an objectId
      type: mongoose.Schema.Types.ObjectId,
      //here we ref the name of the target collection
      ref: "Author"
    }
  })
);

//Post request to create author with 3 args
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

//Post request to create course
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

//get request to retrieve courses showing both course name and course author
async function listCourses() {
  const courses = await Course.find()
    //  here we want to get only the name property from the author's object/document while excluding the id property
    .populate("author", "name -_id")
    .select("name author");
  console.log(courses);
}

//calling/activating the createAuthor function and passing the 3 args value
// createAuthor("Mosh", "My bio", "My Website");

// calling/activating the createCourse function and passing the 2 args value where the author arg is the referenced id of the author
// createCourse("Node Course", "5d034dfcdcda6c1f206659f5");

listCourses();

/*RESULT: -
Connected to MongoDB...
[ { _id: 5d034fc622137b1768ec2466, name: 'Node Course' },
  { _id: 5d03508a3c66881674d87a7d,
    name: 'Node Course',
    author: { name: 'Mosh' } } ]*/

/*It is very possible to populate multiple referenced documents/object e.g. we can have another documents that contains "course categories", to populate this, we simply add another populate method and we will have something like : -

.populate("author", "name -_id")
.populate("category", "name")
*/

/*We talked about the lack of data integrity in mongodb which means when creating a course, the author id we entered might be invalid and mongodb doesnt care or verify if the author exist before saving it to the database.
* So if we create a course and supply an invalid id, when we retrieve it, we get "null" as the author property because the object/document doesnt exist


[ { _id: 5d034fc622137b1768ec2466, name: 'Node Course' },
  { _id: 5d03508a3c66881674d87a7d,
    name: 'Node Course',
    author: { name: 'Mosh' } },
  { _id: 5d03583b32bb210634d896c7,
    name: 'HTML Course',
    author: null } ]*/
