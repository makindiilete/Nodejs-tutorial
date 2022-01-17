/*Both in our auth.js and user_route.js, we have the same code that we are using to generate our json web token.

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

Currently in the jwt payload, we only have the "_id" property but this may increase in future and we will have to edit this payload in two separate modules.

We will be moving this logic for generating our jwt into a single place which is inside the "user_model.js"
*/

//user_model.js
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
  }
});

//generating our JWT
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
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

//user_route.js
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/users_model");
const lodash = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
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

  //generating our token from the user model
  const token = user.generateAuthToken();
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

//auth.js
const config = require("config");
const bcrypt = require("bcrypt");
const { User } = require("../models/users_model");
const lodash = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

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

  //generating our token from the user model
  const token = user.generateAuthToken();
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

//app.js
//loading the config package for where we can access the private key
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres_route");
const customers = require("./routes/customers_route");
const rentals = require("./routes/rentals_route");
const movies = require("./routes/movies_route");
const users = require("./routes/users_route");
const auth = require("./routes/auth");
const app = express();

//checking for our jwt private key when the application starts
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  //then we exit the process (0 = success, any other number means error)
  process.exit(1);
}

//Here we create our database, the name will be what we define after "mongodb://localhost/"
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB......"))
  .catch(error => console.error("Could not connect to MongoDB....", error));

// needed to be able to post in json
app.use(express.json());

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////ENDPOINTS & THEIR ROUTES/////////////////////////////////////////////////////////////////////
app.use("/api/genres", genres);

app.use("/api/customers", customers);

app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Listening to port
const port = 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));
