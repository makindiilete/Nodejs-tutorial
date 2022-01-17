/*
In some real world app, when a user register, you send them email to verify their email address but for this app, we can imagine it will run locally in a video store and those that uses it are staffs of the store so they dont need to verify their email so once thy register, we want to assume they are logged in so they dont need to login separately.
So once you register, you are logged in
*/

//In our users route, we modify the res.send to this

//before we send response to the client, we generate a token
const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
//here now once a token is generate, we send an header with the token.
res
  .header("x-auth-token", token)
  .send(lodash.pick(user, ["_id", "name", "email"]));

//USer_route
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/users_model");
const lodash = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//loading jwt and config module
const config = require("config");
const jwt = require("jsonwebtoken");
//MONGODB GET REQUEST DATABASE USERS - GET THE LIST OF ALL THE GENRES
router.get("/", async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.send(users);
});

//MONGODB GET REQUEST SINGLE USER - GET A SINGLE USER BY ID
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).send("Such user does not exist");
    return;
  }
  res.send(user);
});

//MONGODB DATABASE  POST REQUEST - CREATE A NEW USER
router.post("/", async (req, res) => {
  //  input validation using function defined
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //checking if the user already exist in the database to avoid duplicate reg.
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered...");

  //setting the user properties with lodash
  user = new User(lodash.pick(req.body, ["name", "email", "password"]));
  //bcrypt salt
  const salt = await bcrypt.genSalt(10);
  //hashing the user password
  user.password = await bcrypt.hash(user.password, salt);

  const result = await user.save();
  console.log(result);

  //before we send response to the client, we generate a token
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  //here now once a token is generate, we send an header with the token.
  res
    .header("x-auth-token", token)
    .send(lodash.pick(user, ["_id", "name", "email"]));
});

//MONGODB DATABASE PUT REQUEST
router.put("/:id", async (req, res) => {
  // JOI VALIDATION
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  res.send(user);
});

//MONGODB DATA DELETE REQUEST
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  console.log(user);
  if (!user) {
    res
      .status(404)
      .send(
        "The user you try to delete doesnt exist or might have already been deleted!"
      );
  }
  res.send(user);
});

module.exports = router;

/*Now if we try to register again, we get the registration details but under the "headers" tab, we have a new property and value:

x-auth-token
 →eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDA3Y2NjMjgzMTAxNTNjODg1NmNhNmQiLCJpYXQiOjE1NjA3OTIyNTh9.GcMSR2U7DDBM1X3Pv2U0zln8a3iZZ7M7njqHUJONuDg


 So this is our token generated upon registration and this can be sent to the server when calling an endpoint.
*/
