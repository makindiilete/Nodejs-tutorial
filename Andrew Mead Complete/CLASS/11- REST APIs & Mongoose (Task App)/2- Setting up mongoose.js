/*We will be exploring a new tool we will be making a heavy use of as we create the task manager application. This is npm library called "mongoose". This allows us to do things we have not been able to do so far e.g.
 * Validation for documents (Setting required fields and which fields are optional), Data type (Sting, boolean etc).
 * With mongoose, we will be able to say a given task was created by a user and after adding authentication to the app, only the user that creates a task will be able to read the data and see the private task.
 * Mongoose will allow us to do all these in additional to the normal CRUD Operations.

Inside the root dir of the task manager folder, create a new folder "src", inside the src, create another folder "db" and inside db, create a new file "mongoose.js"*/

const mongoose = require("mongoose");
//mongoose connecting to db. "mongodb://127.0.0.1:27017/" is the url, "/task-manager-api" is the name of the database we want to create and connect to
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
  useCreateIndex: true
});

//DEFINING OUR BASIC USER MODEL : - This takes 2 args, the model name and the schema (the model object/structure/configuration
const User = mongoose.model("User", {
  //  Setting the type for our fields.
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

//CREATING INSTANCES OF THE CREATED MODEL SO WE CAN START ADDING DOCUMENTS
const me = new User({
  name: "Michaelz",
  age: 28
});

//SAVING THE INSTANCE TO DATABASE WITH ".save()" WHICH RETURNS A PROMISE
me.save()
  .then(me => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error ", error);
  });

/*{ _id: 5d714bf8a76601311032f106,
  name: 'Michaelz',
  age: 28,
  __v: 0 }

  __v is automatically added which is the version of the doc*/

//TESTING FOR VALIDATION ERROR BY ENTERING A WRONG VALUE TYPE.
const mongoose = require("mongoose");
//mongoose connecting to db. "mongodb://127.0.0.1:27017/" is the url, "/task-manager-api" is the name of the database we want to create and connect to
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
  useCreateIndex: true
});

//DEFINING OUR BASIC USER MODEL : - This takes 2 args, the model name and the schema (the model object/structure/configuration
const User = mongoose.model("User", {
  //  Setting the type for our fields.
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

//CREATING INSTANCES OF THE CREATED MODEL SO WE CAN START ADDING DOCUMENTS
const me = new User({
  name: "Michaelz",
  age: 28
});

//SAVING THE INSTANCE TO DATABASE WITH ".save()" WHICH RETURNS A PROMISE
me.save()
  .then(me => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error ", error);
  });

/*Error  { ValidationError: User validation failed: age: Cast to Number failed for value "Mike" at path "age"*/
