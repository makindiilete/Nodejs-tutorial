/*Let us take the app further to ensure certain operations like deleting data can only be performed by the admins. This is called "Role based authorization"...

So we can go into the mongodb compass and turn one of the users to an admin by adding the field "isAdmin: true" and changing the type from string to boolean

Then we will store this "isAdmin" property to the jwt so we can extract this anytime the token is sent to the server.

So we go into the "user_model.js" where we encapsulated our jwt payload and add the isAdmin property

Then we add a new middleware to check if a jwt is an admin or not
*/

//users_models.js
const Joi = require("joi");
const mongoose = require("mongoose");
//loading jwt and config module
const config = require("config");
const jwt = require("jsonwebtoken");

//SCHEMA
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    //  we will be hashing the password into a longer string which we will store in mongodb so dts y we av a maxlength of 1024, but the real user password will be 255 max which we define in Joi validation.
    maxlength: 1024,
    required: true
  },

  //this is to separate the admins from normal users
  isAdmin: {
    type: Boolean,
    default: false
  },
  //  In real world app, you might have multiple roles like admins, moderators etc. In that case you will need the roles property which will be an array of string or complex object:
  roles: [],
  //  In more advanced app, instead of roles, you will manage operations a user is allowed to perform and this will be under the field "operations" which will be an array of complex objects e.g. a user might be allowed to delete or create genres.
  operations: []
});

/*Irrespective of the app size and approach (roles,  operations etc), the concept is still the same. You pass something that determines the level of the access of the user in the jwt that you generates as part of authenticating the user and you will add a middleware where you look at the roles array or the operations array and base on that you make a decision to either decline or grant access.*/

//generating our JWT
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    //  adding "isAdmin" & "_id" to the payload
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// JOI VALIDATION HANDLER
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;

//ADMIN MIDDLEWARE FUNCTION
const jwt = require("jsonwebtoken");
const config = require("config");

function isAdmin(req, res, next) {
  // 401 Unauthorized : - when user tries to access a valid resource without a valid jwt so we give them a chance to retry and send a valid jwt
  // 403 Forbidden : - if they send a valid jwt but are not allowed to access a valid resource, that is when we use 403

  //  if a user is not an admin, we return ds error
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  //else if user is an admin, we pass control to the next middleware function
  next();
}

module.exports = isAdmin;

//IMPLEMENTING THE MIDDLEWARE IN THE DELETE ROUTE INSIDE genres_route.js
const { Genre, validate } = require("../models/genres_model");
const auth = require("../middleware/authorization");
const isAdmin = require("../middleware/admin");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//MONGODB DATABASE OBJECTS - GET THE LIST OF ALL THE GENRES
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

//MONGODB GET SINGLE OBJECT - GET A SINGLE OBJECT BY ID
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send("Such genre does not exist");
    return;
  }
  res.send(genre);
});

//MONGODB DATABASE  POST REQUEST - CREATE A NEW GENRE OBJECT
//we pass our middleware function "auth" here which will be executed before the route handler
router.post("/", auth, async (req, res) => {
  //  input validation using function defined
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = new Genre({
    name: req.body.name,
    author: req.body.author
  });
  const result = await genre.save();
  console.log(result);
  res.send(genre);
});

//MONGODB DATABASE PUT REQUEST
router.put("/:id", async (req, res) => {
  // JOI VALIDATION
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { author: req.body.author }
  );
  res.send(genre);
});

//MONGODB DATA DELETE REQUEST : - here we av 2 middleware functions, first the token will be checked with "auth", next we will verify if the user is an admin with "isAdmin" and if that is the case, the delete route will be executed
router.delete("/:id", [auth, isAdmin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  console.log(genre);
  if (!genre) {
    res
      .status(404)
      .send(
        "The genre you try to delete doesnt exist or might have already been deleted!"
      );
  }
  res.send(genre);
});

module.exports = router;
