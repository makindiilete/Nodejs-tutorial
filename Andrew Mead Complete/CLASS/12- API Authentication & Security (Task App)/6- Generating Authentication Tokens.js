/*Now we will go back to the login endpoint and set it up to generate a jwt and send it back to the user and we will do the same fore signing up. If you just sign up, you wont need to login to start doing things.

Just like we did for our "findByCredentials", we will create the function inside our user.js (model) and simply call it inside our routes to make it reusable*/

//user.js (model)
//Creating the JWT generator function
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  //as d first args, jwt expects a standard string as d value of the key, and mongodb _id are object id so we convert it to string with "toString()"
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");
  return token;
};

//user.js (router)
//logging in users
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
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

/*Now if we go to postman to test the login route again, now we get the user info and the token : -

{
    "user": {
        "age": 0,
        "_id": "5d7356d0473db4337c78f107",
        "name": "Oluwamayowa",
        "email": "akindiileteforex@gmail.com",
        "password": "$2a$08$X52QnFInu5bEDeG2YE4.AeGf8E2dkx3Lk6Pt9yQpzphUmEs6coXTC",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczNTZkMDQ3M2RiNDMzN2M3OGYxMDciLCJpYXQiOjE1Njc4NDM3ODF9.xRaYoVOGJNkjP_HCsaVfry238sk_DF3za8q-E-54QSk"
}*/

/*TRACKING OUR TOKEN : - Currently there is no place where we track the token generated and this is bad because once user login, there is no option to logout or login on multiple devices. So we need to store the tokens we generate for user as part of the document.*/

//user.js (model)
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

/*user.js (router)*/
const express = require("express");
const router = new express.Router();
//loading in the user model
const User = require("../models/users");

//DEFINING OUR ROUTERS
//creating a new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    //awaiting our user.save() async operation
    await user.save();
    //201 : created
    res.status(201).send(user);
  } catch (e) {
    //400: bad request
    res.status(400).send();
  }
});

//logging in users
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
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

/*FETCHING MULTIPLE USERS*/
/*GET REQUEST*/
router.get("/users", async (req, res) => {
  try {
    //finding all users (no filter applied)
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
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
  const allowedUpdates = ["name", "email", "password", "age"];
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

/*Now if we save and login again via POSTMAN, we get our token return and also included in the document and if we check our database, we have the token added as a sub-document with its own id.

{
    "user": {
        "age": 0,
        "_id": "5d7356d0473db4337c78f107",
        "name": "Oluwamayowa",
        "email": "akindiileteforex@gmail.com",
        "password": "$2a$08$X52QnFInu5bEDeG2YE4.AeGf8E2dkx3Lk6Pt9yQpzphUmEs6coXTC",
        "__v": 1,
        "tokens": [
            {
                "_id": "5d73678fbf14b32674d9db8a",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczNTZkMDQ3M2RiNDMzN2M3OGYxMDciLCJpYXQiOjE1Njc4NDQyMzl9.7HTBSC7Xg4n4pKnToxmT1XI7vjRMZTijTLzJgCkGB1w"
            }
        ]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczNTZkMDQ3M2RiNDMzN2M3OGYxMDciLCJpYXQiOjE1Njc4NDQyMzl9.7HTBSC7Xg4n4pKnToxmT1XI7vjRMZTijTLzJgCkGB1w"
}
*/

/*CHALLENGE : - Have the signup send back auth token
 * 1-  Generate a token for the saved user
 * 2-  Send back the token and the user
 * 3-  Create a new user from Postman and confirm the token is there*/

//creating a new user
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

/*Runing the app in postman : -
REQUEST : POST
URL :  localhost:3000/users
BODY : -
{
	"name":"Abimbolaa Akindiilete  ",
	"email":"1987Vickyluv@gmail.com",
	"password":"1987Vickyluv"
}

RESPONSE : -
{
    "user": {
        "age": 0,
        "_id": "5d736900d96c061f1cd50c0f",
        "name": "Abimbolaa Akindiilete",
        "email": "1987vickyluv@gmail.com",
        "password": "$2a$08$1YzUaJC8fI5/gdXCGpqFKOuL1MHJ3YunvtNm.TPpJWB7AHsbyQ0DS",
        "tokens": [
            {
                "_id": "5d736900d96c061f1cd50c10",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczNjkwMGQ5NmMwNjFmMWNkNTBjMGYiLCJpYXQiOjE1Njc4NDQ2MDh9.Rx0LvnW95J3kUSLIjKYcQWMI0cyuBunBH42bA2AB-mA"
            }
        ],
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczNjkwMGQ5NmMwNjFmMWNkNTBjMGYiLCJpYXQiOjE1Njc4NDQ2MDh9.Rx0LvnW95J3kUSLIjKYcQWMI0cyuBunBH42bA2AB-mA"
}*/
