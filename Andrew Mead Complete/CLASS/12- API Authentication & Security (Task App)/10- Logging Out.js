/*Here we will be adding another feature which will allow our users to be able to logout after they are logged in. We will create a new route to achieve this and this will allow them to logout from their current device but still stayed logged in on other devices. So on their current device where they want to logout, their auth token will be removed....

1-  We added a new route to the user.js in line 61 - 74
2-  We modified our auth.js middleware to send the currently authenticated token in line 172*/

//user.js (router)
const express = require("express");
const router = new express.Router();
//loading in the user model
const User = require("../models/users");
//loading the auth middleware
const auth = require("../middleware/auth");
//loading the auth middleware
const adminAuth = require("../middleware/admin-auth");

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

//fetching all users (Admin operation)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(500).send();
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
    res.send();
  } catch (e) {
    res.status(500).send();
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
      //sending the auth token details on the current device so it can be accessed from "req.token"
      req.token = token;
      //sending the user details so it can be accessed from "req.user"
      req.user = user;
      next();
    }
  } catch (e) {
    //if no matching user is found
    res.status(401).send({ error: "Please authenticate!" });
  }
};
//exporting the middleware
module.exports = auth;

/*Now to test the logout router, the user needs to be authenticated first, which means the user must be logged in before we can logout, so we verify this by sending the "READ PROFILE" request and once this display the user profile, WE fire up the logout request and when this completes with 200 code, we try to read the user profile again and we should get error message "Please authenticate" which means our logout is working well.*/

/*ADDING A ROUTE THAT LOG YOU OUT ON ALL SESSIONS : - Many services like neflix, gmail etc allows you to do this so you can logout from all your sessions/devices and change your password. This means we will have to wipe all the tokens inside the token array

CHALLENGE : - Create a way to logout of all sessions
1-  Setup POST /users/logoutAll
2-  Create the router handler to wipe the tokens array
        - Send 200 or 500
3-  Test your work
    Login a few times and logout of all. Check database*/

//LOG OUT FROM ALL SESSIONS/DEVICES
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    //Here we remove all tokens inside the user's document token array
    req.user.tokens = [];
    //We save the user document
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

//user.js
const express = require("express");
const router = new express.Router();
//loading in the user model
const User = require("../models/users");
//loading the auth middleware
const auth = require("../middleware/auth");
//loading the auth middleware
const adminAuth = require("../middleware/admin-auth");

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

//fetching all users (Admin operation)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(500).send();
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
