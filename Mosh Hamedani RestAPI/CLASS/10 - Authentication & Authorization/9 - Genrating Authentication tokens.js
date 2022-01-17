/*Install "npm i jsonwebtoken"*/

//AUTH.JS
const bcrypt = require("bcrypt");
const { User } = require("../models/users_model");
const lodash = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
//loading jwt
const jwt = require("jsonwebtoken");

//MONGODB AUTHENTICATION WITH POST REQUEST
router.post("/", async (req, res) => {
  //  input validation using function defined
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //checking if the user already exist in the database to avoid duplicate reg.
  let user = await User.findOne({ email: req.body.email });
  //if the user that is trying to login does not exist
  if (!user) return res.status(400).send("Invalid email or password..");

  //  validating the plain text password d user enters with the hashed passwords in the database: the first arg is the plain text password, the 2nd is the hash password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  //if the password d client enters is invalid
  if (!validPassword)
    return res.status(400).send("Invalid email or password..");
  //here we use the jwt and pass any property(s) we want to include in it and we also pass a secret key "jwtPrivatekey" which will be use to generate digital signature. this sud not be hardcoded in real world usage
  const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");

  //if all the details are correct, we return the jwt token to the client
  res.send(token);
});

// AUTH VALIDATION HANDLER
function validate(req) {
  const schema = {
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
  return Joi.validate(req, schema);
}
module.exports = router;

/*Now if we test the auth by sending a post login request with valid credentials, we get a jwt token in return: -
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDA3YjdlZjU2MDBhNjNiZjRlODZkZjMiLCJpYXQiOjE1NjA3ODkzODV9.ImesXOiDXnx4MwW__xdWswkiEuD0p1NViYKehlA-HWg"

and if we paste this inside the jwt debugger, we get: -
{
  "_id": "5d07b7ef5600a63bf4e86df3",
  "iat": 1560789385
}

The "_id" here is the document id which was the only property we set for the jwt and the "iat" is the time the jwt was created.
* */
