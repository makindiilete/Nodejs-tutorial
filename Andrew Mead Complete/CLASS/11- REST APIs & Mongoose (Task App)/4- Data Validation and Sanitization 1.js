/*
DATA VALIDATION : - We can enforce that the data conforms to some rules e.g. We can say the user age must be equals to or greater than 18. (Adult).
DATA SANITIZATION : - This allows us to alter data before saving it e.g. Removing empty spaces around user's name.

We will explore both in this video.
*/

//DATA VALIDATION
/*Required : - This makes field compulsory but other fields can be optional*/

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
    type: String,
    //setting the name property to be a compulsory input
    required: true
  },
  age: {
    type: Number
  }
});

/*//TASK MODEL
const Task = mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});*/

//CREATING INSTANCES OF THE CREATED MODEL SO WE CAN START ADDING DOCUMENTS
//Here we are not providing both name and age
const me = new User({});

//SAVING THE INSTANCE TO DATABASE WITH ".save()" WHICH RETURNS A PROMISE
me.save()
  .then(me => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error ", error);
  });

/*
//Creating the task document/instance
const task = new Task({
  description: "Check Forex Currency Strength",
  completed: false
});

//Saving to db
task
  .save()
  .then(task => {
    console.log(task);
  })
  .catch(error => {
    console.log("Error ", error);
  });
*/

/*Runing the app, the app fails because the name field is required but we did not provide it and we get the error message stating this : -

Error  { ValidationError: User validation failed: name: Path `name` is required

As we can see, there was no complaint about age field because it is optional*/

//ADDING THE "name" REQUIRED
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
    type: String,
    //setting the name property to be a compulsory input
    required: true
  },
  age: {
    type: Number
  }
});

/*//TASK MODEL
const Task = mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});*/

//CREATING INSTANCES OF THE CREATED MODEL SO WE CAN START ADDING DOCUMENTS
const me = new User({
  name: "Mike"
});

//SAVING THE INSTANCE TO DATABASE WITH ".save()" WHICH RETURNS A PROMISE
me.save()
  .then(me => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error ", error);
  });

/*
//Creating the task document/instance
const task = new Task({
  description: "Check Forex Currency Strength",
  completed: false
});

//Saving to db
task
  .save()
  .then(task => {
    console.log(task);
  })
  .catch(error => {
    console.log("Error ", error);
  });
*/

/*Now running our app, it runs fine without the age and we have our new document created.

{ _id: 5d7155f8c4dbe7087885d357, name: 'Mike', __v: 0 }
*/

/*OTHER VALIDATORS
Numbers : min and max
STRINGS : enum, match, minlength & maxlength

All these can be found on the mongoose docs.
We can see that these validators are too few to be used for real app because many validators are missing e.g. email, credit card number etc.
To solve this problem, we can setup CUSTOM VALIDATORS*/

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
    type: String,
    //setting the name property to be a compulsory input
    required: true
  },
  age: {
    type: Number,
    //    setting custom validator for age to be positive no
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number!");
      }
    }
  }
});

/*//TASK MODEL
const Task = mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});*/

//CREATING INSTANCES OF THE CREATED MODEL SO WE CAN START ADDING DOCUMENTS
const me = new User({
  name: "Mike",
  age: -1
});

//SAVING THE INSTANCE TO DATABASE WITH ".save()" WHICH RETURNS A PROMISE
me.save()
  .then(me => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error ", error);
  });

/*
//Creating the task document/instance
const task = new Task({
  description: "Check Forex Currency Strength",
  completed: false
});

//Saving to db
task
  .save()
  .then(task => {
    console.log(task);
  })
  .catch(error => {
    console.log("Error ", error);
  });
*/

/*Now if we run the app with the negative number provided to age, we get the result : -
Error  { ValidationError: User validation failed: age: Age must be a positive number!

But if we do not provide the age field at all, the app will still run and no validation will kick in because it is an optional field.

Even though we can set custom validators for our fields, it will be tideous to set them for complex fields like url, email, credit card etc. And in such cases, we can use npm module "validator.js".

-   Install it via "npm i validator"
 */

//USING NPM VALIDATOR
const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");
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
    type: String,
    //setting the name property to be a compulsory input
    required: true
  },
  email: {
    type: String,
    required: true,
    //using the npm validator to validate email field
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email not valid");
      }
    }
  },
  age: {
    type: Number,
    //    setting custom validator for age to be positive no
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number!");
      }
    }
  }
});

//CREATING INSTANCES OF THE CREATED MODEL SO WE CAN START ADDING DOCUMENTS
const me = new User({
  name: "Mike",
  //  passing an invalid email
  email: "mike@"
});

//SAVING THE INSTANCE TO DATABASE WITH ".save()" WHICH RETURNS A PROMISE
me.save()
  .then(me => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error ", error);
  });

/*This returns error because the email is not valid*/

/*MONGOOSE SCHEMA TYPES WE WILL BE USING (Can be seen in the docs)
 * String
 * Number
 * Date : - Date when things happen
 * Buffer : - To store profile images for users
 * ObjectId
 * Array

SCHEMA PROPERTIES
required : - To set a field to be required
default : - To set a default value

MONGOOSE SANITIZATION :- Adjust data before they get saved
String : lowercase, uppercase, trim, match, enum, minlength, maxlength
Number : min, max
 * */

//SANITIZATION
const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");
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
    type: String,
    //setting the name property to be a compulsory input
    required: true,
    //    adding trim to our name field to remove any spaces
    trim: true
  },
  email: {
    type: String,
    //this will ensure 2 users cannot create acct with the same email
    unique: true,
    required: true,
    //remove space
    trim: true,
    //convert to lowercase
    lowercase: true,
    //using the npm validator to validate email field
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email not valid");
      }
    }
  },
  age: {
    type: Number,
    //adding default age value for when age is not provided
    default: 0,
    //    setting custom validator for age to be positive no
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number!");
      }
    }
  }
});

/*//TASK MODEL
const Task = mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});*/

//CREATING INSTANCES OF THE CREATED MODEL SO WE CAN START ADDING DOCUMENTS
const me = new User({
  //  intentionally adding space for sanitization
  name: "  Mike",
  //  intentionally passing email in uppercase and space
  email: "AKINDIILETEFOREX@GMAIL.COM  "
  //    intentionally excluding age field
});

//SAVING THE INSTANCE TO DATABASE WITH ".save()" WHICH RETURNS A PROMISE
me.save()
  .then(me => {
    console.log(me);
  })
  .catch(error => {
    console.log("Error ", error);
  });

/*
//Creating the task document/instance
const task = new Task({
  description: "Check Forex Currency Strength",
  completed: false
});

//Saving to db
task
  .save()
  .then(task => {
    console.log(task);
  })
  .catch(error => {
    console.log("Error ", error);
  });
*/

/*{ age: 0,
  _id: 5d715b6e35b7e624dc4b8f25,
  name: 'Mike',
  email: 'akindiileteforex@gmail.com',
  __v: 0 }*/
