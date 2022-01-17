/*In real world app, we should not send the password back to the user after registration. We should only send the name and email...
There are two approaches: -

1) The first method is modifying the send method from "res.send(user)" to "res.send({
name: user.name,
email: user.email
});

2) The second method is using npm library "lodash"
*/

//APPROACH ONE

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
  //setting the user properties
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const result = await user.save();
  console.log(result);
  //modifying the details sent to the client after registration
  res.send({
    name: user.name,
    email: user.email
  });
});

//APPROACH TWO
const { User, validate } = require("../models/users_model");

//loading lodash
const lodash = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

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
  /*  //setting the user properties
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });*/
  //setting the user properties with lodash
  user = new User(lodash.pick(req.body, ["name", "email", "password"]));

  const result = await user.save();
  console.log(result);
  //USING LODASH TO PICK THE NAME, EMAIL AND ANY OTHER PROPERTY FROM THE TOTAL PROPERTIES AND SEND ONLY THOSE TO CLIENTS AFTER REGISTRATION
  res.send(lodash.pick(user, ["_id", "name", "email"]));
});

/*TO CONFIGURE THE INPUT PASSWORD THE CLIENTS SENDS, YOU CAN USE AN NPM PACKAGE CALLED "joi-password-complexity"*/
