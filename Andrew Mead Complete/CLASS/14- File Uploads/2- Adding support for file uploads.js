/*We will start this section by figuring out how we can add support for file uploads to the express app. For now we will not worry about users bin authenticated or the file bin of the correct type such as image. We will start by kicking off with the basics and later refine the code to fix our specific needs which is to allow a user to upload a profile pic for their account.

//HOW TO ADD SUPPORT FOR FILE UPLOAD IN EXPRESS
Express by default does not support file uploads but there is an npm library that is released and maintained by the same team behind express and this allows us to add file upload to express with just few lines of code and we will start there. THIS IS CALLED MULTER
1-  Install npm multer
So far we have been working with json to send and retrieve data in express but multer will allow us to send data using form data from which we can upload files.
*/

//FILE UPLOAD TO EXPRESS
const multer = require("multer");
//configuring multer to tell it d type of file we want to accept. This configuration will change as the type of file we want to upload changes. But for now we will just accept any type of file
const upload = multer({
  //dest = destination (folder where all d uploads sud b stored)
  dest: "images"
});

//CREATING AN ENDPOINT WHERE USER CAN USE TO UPLOAD THE FILES
//we provided multer middleware (upload.single) which takes an arg which is a name for d upload
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

//RUNNING THE FILE UPLOAD USING POSTMAN
/*1-  Enter the url - localhost:3000/upload -> Change the method to POST
 * 2-  Click on the "body" type and change from "raw" to "form-data"
 * 3-  KEY -> This is the string you provided to the multer middleware in your code which in our case is "upload"
 * 4- On the right hand side of the KEY input, switch from TEXT to FILE
 * 5-  Click on "Select Files", pick an image (philly.jpg)
 * 6- Click on Send

When we send this request, express will create a new directory in our project dir and give it the name we specified (images) as our destination and place the image we uploaded inside.

//OPENING THE IMAGE
Now if we check the images folder, we see a new file has been added but we cannot open it from the editor because it is a binary file without an extension. So to open the image, we need to rename it by adding .jpg to the end.

NOTE : - We will not be adding the extension manually in the future. We will have this done for us automatically.*/

/*CHALLENGE : - Setup endpoint for avatar upload
 * 1-  Add POST /users/me/avatar to user router
 * 2-  Setup multer to store uploads in an avatars directory
 * 3-  Choose name "avatar" for the key when registering the middleware
 * 4-  Send back a 200 response from route handler
 * 5-  Test your work. Create new Task App request and upload image*/

//user.js
const express = require("express");
const router = new express.Router();
//loading in the user model
const User = require("../models/user");
//loading the auth middleware
const auth = require("../middleware/auth");
//loading the auth middleware
const adminAuth = require("../middleware/admin-auth");

//FILE UPLOAD TO EXPRESS
const multer = require("multer");
const upload = multer({
  //dest = destination (folder where all d uploads sud b stored)
  dest: "avatar"
});

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
    res.send({ user: user, token: token });
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
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//UPDATING A USER
router.patch("/users/me", auth, async (req, res) => {
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
    //here we use the "updates" variable that contains all our fields and run a function on all fields
    updates.forEach(update => (req.user[update] = req.body[update]));
    //we save the user
    await req.user.save();
    /*    //we passed 3 args : the user id, the object to use for the update which is the "req.body" i.e. the json from postman, the we set options
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      //this will ensure we get back the newly updated details
      new: true,
      //this will turn on our model validation for the update
      runValidators: true
    });*/
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//DELETING A USER BY ID
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send();
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

//UPLOAD USER AVATAR
router.post("/users/me/avatar", upload.single("avatar"), (req, res) => {
  res.send();
});

//EXPORTING THE ROUTER
module.exports = router;

//index.js
//EXTERNAL ROUTES
const userRouter = require("./src/routers/user");
const taskRouter = require("./src/routers/task");

//loading our mongoose.js file where we connect to database
require("./src/db/mongoose");
/*Creating our server*/
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//FILE UPLOAD TO EXPRESS
const multer = require("multer");
//configuring multer to tell it d type of file we want to accept. This configuration will change as the type of file we want to upload changes. But for now we will just accept any type of file
const upload = multer({
  //dest = destination (folder where all d uploads sud b stored)
  dest: "images"
});

//CREATING AN ENDPOINT WHERE USER CAN USE TO UPLOAD THE FILES
//we provided multer middleware (upload.single) which takes an arg which is a name for d upload
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

app.use(express.json()); //passing json to obj automatically
app.use(userRouter); //registering our userRouter
app.use(taskRouter); //registering our taskRouter

//
//Without middleware: new request -> run route handler
//
//With middleware: new request -> do something -> run route handler
//

app.listen(port, () => {
  console.log("Server is up and running on " + port);
});
/**/
