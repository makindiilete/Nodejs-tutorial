/*In this lesson, we will be setting up an express middleware function we can use to add auth into any request in our applications.

OUR FUNCTION WILL :
1-  Will check for an incoming auth token
2-  Verify it is a valid JWT
3-  It returns the matching user

We wont be running our middleware inside the index.js, instead we will create a new dir inside the src folder and name it "middleware"*/

//auth.js
//defining the middleware function
const auth = async function(req, res, next) {
  console.log("auth middleware");
  next();
};
//exporting the middleware
module.exports = auth;

//user.js (router)

//loading the auth middleware
const auth = require("../middleware/auth");
/*FETCHING MULTIPLE USERS*/
/*GET REQUEST*/
//this route will accept request to "/users", runs the "auth" middleware, and then execute the async function if the middleware calls the "next()"
router.get("/users", auth, async (req, res) => {
  try {
    //finding all users (no filter applied)
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

/*Running the app and sending a get request to the "/users", we get our message in the console : auth middleware*/

/*HOW THE AUTH MIDDLEWARE FUNCTION WILL ENSURE THE GIVEN USER IS AUTHENTICATED : -
* 1-  The process starts when the user takes the token they get from signing up or logging in and provides it with the request they are trying to perform.


a-  Login via Postman
b-  Copy the token generated > Go to the GET /users route and add an header
c-  To provide the token along with the request, we need to set Headers.
d-  Click on Headers tab in postman
e-  Set your keyvalue pairs : KEY = Authorization, VALUE (Bearer token) = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczNTZkMDQ3M2RiNDMzN2M3OGYxMDciLCJpYXQiOjE1Njc4NDY4NDl9.ncoAdxfqV-J676RsCeGqC2MuMGAmqEKvvdAAQZ0382g*/

/*GETTING OUR HEADERS VALUE*/
const jwt = require("jsonwebtoken");
const User = require("../models/users");

//defining the middleware function
const auth = async function(req, res, next) {
  try {
    //  how to get the value of the token
    //  req.header takes the KEY name we passed in postman as arg
    const token = req.header("Authorization");
    console.log(token);
  } catch (e) {
    res.status(401).send({ error: "Please authenticate!" });
  }
};
//exporting the middleware
module.exports = auth;

/*Now if we send a request to get users : -
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczNTZkMDQ3M2RiNDMzN2M3OGYxMDci
LCJpYXQiOjE1Njc4NDc0OTZ9.zHO4nUBUpUEhj8vYdcvxc0QBR_-aaOGVuN5-ilG3gd8
 */
/*NOW WE WANT TO MAKE OUR MIDDLEWARE GET OUR JWT AND VERIFY IT*/

//auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/users");

//defining the middleware function
const auth = async function(req, res, next) {
  try {
    //  how to get the value of the token
    //  req.header takes the KEY name we passed in postman as arg
    //replace() removes the "Bearer " so we are left with our token : 2 args = what to remove and what to replace it with (nothing)
    const token = req.header("Authorization").replace("Bearer ", "");
    //verifying the token validity (the token & secret string)
    const decoded = jwt.verify(token, "thisismynewcourse");
    //finding the user : the decoded now has the "_id" property bcos dt is what we use in creating the token.
    //tokens.token : - From the tokens[] in d db, we want to search for the user having the current token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    //  if no user is found
    if (!user) {
      throw new Error();
    } else {
      //sending the user details
      req.user = user;
      next();
    }
  } catch (e) {
    res.status(401).send({ error: "Please authenticate!" });
  }
};
//exporting the middleware
module.exports = auth;

/*Now if we go to postman and send a get request to get all users with your headers properly configure, we get the required response, else we get our "Please authenticate" message.*/

/*NOW WE WANT TO CHANGE THIS ROUTE AND REPLACE IT WITH ANOTHER ONE BECAUSE WE DO NOT WANT AN AUTHENTICATED USER TO BE ABLE TO GET THE DETAILS OF ALL THE APP USERS BUT ONLY FOR THEM TO BE ABLE TO GET THEIR OWN PROFILE DETAILS*/

/*FETCHING USER PROFILE*/
/*GET REQUEST*/
//this route will send back your profile details when you are authenticated
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

/*Now if we go to "localhost:3000/users/me" in postman and we set the headers correctly, we get only the details of the users whose token matched the token provided.*/

///////////////////////////////////////////////////////////////////////////
//user.js (router)
const express = require("express");
const router = new express.Router();
//loading in the user model
const User = require("../models/users");
//loading the auth middleware
const auth = require("../middleware/auth");

//DEFINING OUR ROUTERS
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

/*FETCHING USER PROFILE*/
/*GET REQUEST*/
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

//auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/users");

//defining the middleware function
const auth = async function(req, res, next) {
  try {
    //  how to get the value of the token
    //  req.header takes the KEY name we passed in postman as arg
    //replace() removes the "Bearer " so we are left with our token : 2 args = what to remove and what to replace it with (nothing)
    const token = req.header("Authorization").replace("Bearer ", "");
    //verifying the token validity (the token & secret string)
    const decoded = jwt.verify(token, "thisismynewcourse");
    //finding the user : the decoded now has the "_id" property bcos dt is what we use in creating the token.
    //tokens.token : - From the tokens[] in d db, we want to search for the user having the current token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    //  if no user is found
    if (!user) {
      throw new Error();
    } else {
      //sending the user details from "req.user"
      req.user = user;
      next();
    }
  } catch (e) {
    res.status(401).send({ error: "Please authenticate!" });
  }
};
//exporting the middleware
module.exports = auth;
