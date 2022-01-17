/*Now we want to talk about how we can better hide the private data we have been sending to the user.

When we login, we are sending the password & tokens [] as part of the data we have been sending. Both the password and the tokens[] should be hidden as they are not useful to the user.

We will explore two solutions to get this done. We are already familiar with the first solution.*/

//models/user.js
const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");
//loading bycrpt module
const bcrypt = require("bcryptjs");
//JWT token module
const jwt = require("jsonwebtoken");

//Creating our own schema to take advantage of using middleware
//we create a schema variable and we pass the schema objects/structure/configuration to it
const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      //  checking to see if the password entered includes "password"
      if (value.toLowerCase().includes("password")) {
        throw new Error("Your password cannot include 'password'");
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
  },
  //Admin profiles
  isAdmin: {
    type: Boolean,
    default: false
  },
  //Adding our token (this will be provided by d server automatically so ds is all we need)
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//CREATING THE FUNCTION THAT HIDES SENSITIVE USER'S DATA
userSchema.methods.getPublicProfile = function() {
  const user = this;
  //We convert the user document to a JS object
  const userObject = user.toObject();
  //We use the delete keyword to remove/hide objects we do not want to be sent back
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

//Creating the JWT generator function
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  //as d first args, jwt expects a standard string as d value of the key, and mongodb _id are object id so we convert it to string with "toString()"
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");
  //saving tokens to d database
  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  //returning the token
  return token;
};

//Creating the new "findByCredentials()"
userSchema.statics.findByCredentials = async (email, password) => {
  //  finding the users by email: we use "findOne"to find a single user whose email === email passed in the argument
  const user = await User.findOne({ email: email });
  //if we cannot find the user's email
  if (!user) {
    throw new Error("Unable to login!");
  }
  //we check if the password entered in the arg/req.body matches with password in the user db
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    //if we cannot match the password
    throw new Error("Unable to login!");
  }
  //if both email and password works, we return the user
  return user;

  //  "unable to login" is cool enough bcos we do not want to provide a too specific msg why the login didnt work incase of hackers
};

//HASHING THE PLAIN TEXT PASSWORD
userSchema.pre("save", async function(next) {
  //from this variable "user", we will be able to access all the fields provided in the user model e.g. name, email, password
  const user = this;
  //this is where we state the code to run before saving the user
  //we check if the password field is getting modified and if true, we hash it
  if (user.isModified("password")) {
    //hashing the password
    user.password = await bcrypt.hash(user.password, 8);
  }
  //this is where we give the go-ahead to save the user after our code above has been run
  next();
});

//DEFINING OUR BASIC USER MODEL : - This takes 2 args, the model name and the schema (the model object/structure/configuration
const User = mongoose.model("User", userSchema);

module.exports = User;

//router/user.js
const express = require("express");
const router = new express.Router();
//loading in the user model
const User = require("../models/user");
//loading the auth middleware
const auth = require("../middleware/auth");
//loading the auth middleware
const adminAuth = require("../middleware/admin-auth");

//SIGN UP
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    //awaiting our user.save() async operation
    await user.save();
    const token = await user.generateAuthToken();
    //201 : created
    res.status(201).send({ user, token });
  } catch (e) {
    //400: bad request
    res.status(400).send();
  }
});

//GET ALL USERS (Admin operation)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//LOG IN
router.post("/users/login", async (req, res) => {
  //we are creating our own custom "findByCredentials()"which finds users by their email and verify d password and either the users or error. This takes 2 args : - The user email & password
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //CREATING JWT TOKEN
    const token = await user.generateAuthToken();
    //if their login work, we just send them the user details for nw
    // res.send({ user: user, token: token });
    res.send({ user: user.getPublicProfile(), token });
  } catch (e) {
    res.status(400).send();
  }
});

//LOG OUT
router.post("/users/logout", auth, async (req, res) => {
  try {
    //  here we will remove the token used to login on the current device from the array of tokens for all devices with the array.filter, and ds array of tokens lives inside "req.user.tokens.
    req.user.tokens = req.user.tokens.filter(
      // we simply returns all tokens in the array that are not "req.token" which is the current logged in token on d current device
      tokenObject => tokenObject.token !== req.token
    );
    //We then save all those tokens that are not "req.token", which means the token dt is equal to "req.token" (the token user used to login) is deleted.
    await req.user.save();
    res.send("Your current session has expired!");
  } catch (e) {
    res.status(500).send();
  }
});

//LOG OUT FROM ALL SESSIONS/DEVICES
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    //Here we remove all tokens inside the user's document token array
    req.user.tokens = [];
    //We save the user document
    await req.user.save();
    res.send("You have been logged out on all devices!");
  } catch (e) {
    res.status(500).send();
  }
});

// FETCH THE PROFILE DETAILS OF THE LOGGED IN USER
//this route will send back your profile details when you are authenticated
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

/*FETCH USER BY ID*/
router.get("/users/:id", async (req, res) => {
  //we use req.params.id to check the id we pass in the url and take the value to check for matching _id in the database
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//UPDATING A USER
router.patch("/users/:id", async (req, res) => {
  //this converts our model properties/objects into array
  const updates = Object.keys(req.body);
  //in this array are all properties defined in the model
  const allowedUpdates = ["name", "email", "password", "age", "isAdmin"];
  //this perform the checking validation to see if the property entered exist in "allowedUpdates[]"
  //the arg "üpdate" here represents the req.body so we check to see if the model properties array includes the property
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.findById(req.params.id);
    //here we use the "updates" variable that contains all our fields and run a function on all fields
    updates.forEach(update => (user[update] = req.body[update]));
    //we save the user
    await user.save();
    /*    //we passed 3 args : the user id, the object to use for the update which is the "req.body" i.e. the json from postman, the we set options
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      //this will ensure we get back the newly updated details
      new: true,
      //this will turn on our model validation for the update
      runValidators: true
    });*/
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//DELETING A USER BY ID
router.delete("/users/:id", async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(userToDelete);
  } catch (e) {
    res.status(500).send();
  }
});

//EXPORTING THE ROUTER
module.exports = router;

/*Now if we try to login, we will see that our user sensitive details are now hidden. This is the manual way of getting this done and it is manual because we need to call the function on the user anytime we are sending back the user details.
There is a way to get this automated so that we will not need to make any change to our route handlers.*/

//models/user.js
//CREATING THE FUNCTION THAT HIDES SENSITIVE USER'S DATA
userSchema.methods.toJSON = function() {
  const user = this;
  //We convert the user document to a JS object
  const userObject = user.toObject();
  //We use the delete keyword to remove/hide objects we do not want to be sent back
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

/*Just by adding the "toJSON", it has activated the function on all our routes where we are calling the user and why does this works? We can mess around with some example in the playground inside index.js


WHAT toJSON DOES?

*/

const pet = {
  name: "Hal"
};

//converting the obj to JSON
console.log(JSON.stringify(pet)); /* {"name":"Hal"} */

//USING toJSON
const pet = {
  name: "Hal"
};
//using toJSON to remove object properties
pet.toJSON = function() {
  delete pet.name;
  return pet;
};

//converting the obj to JSON : - This must be called for toJSON function to work
console.log(JSON.stringify(pet));
/* {}
As we can see, we now get back an empty object because we have removed the name property with toJSON...

This is what happens behind the scene : - When we call on "res.user", the JSON.stringify is called on the user object to convert the user object into a JSON and with this, when we add a toJSON function to the user inside the model, this is automatically attached to all the user at the point of signifying them.*/
