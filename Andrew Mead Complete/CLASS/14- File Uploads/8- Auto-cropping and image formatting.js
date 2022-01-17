/*We will wrap up the session by using an npm module called "sharp" to process the image supplied by users before we save them. That will allow us to : -
 * 1-  Resize images :- So if someone upload a huge image, we do not want to store that as our little profile picture will always small
 * 2- Converting the image to unified type : - This will allow us to store all our images in a unified type e.g. png. So any type of image uploaded will be converted to png.*/

//UPLOAD USER AVATAR WITH IMAGE CROPPING & FORMATTING (path, authentication, file upload middleware, route handler, file upload error handler)
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    //using sharp to convert our image to png and resize to 250 X 250
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    //we assign our avatar field to the buffer variable
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  //this handles file upload errors
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//FETCHING USER AVATAR VIA URL LINK AND USER ID
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //if we cannot find the user by the id in the url or we find the user but the user does not have an avatar
    if (!user || !user.avatar) {
      throw new Error();
    }
    //We setting our header to png now that we are sure all our images will be in png
    res.set("Content-Type", "image/png");
    //ds send back the avatar we av found
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

//user.js
const express = require("express");
//loading sharp for image processing
const sharp = require("sharp");
const router = new express.Router();
//loading in the user model
const User = require("../models/user");
//loading the auth middleware
const auth = require("../middleware/auth");
//loading the auth middleware
const adminAuth = require("../middleware/admin-auth");

//FILE UPLOAD TO EXPRESS WITH FILE TYPE & FILE SIZE VALIDATION
const multer = require("multer");
const upload = multer({
  //we remove the dest property so we can stop saving into file system and save on database
  // dest: "avatar",
  limits: {
    fileSize: 1000000 //1mb limit
  },
  fileFilter(req, file, cb) {
    //if file uploaded is not any of jpg,jpeg or png format
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      //we return an error
      return cb(new Error("Please upload an image."));
    }
    //else we pass the upload
    cb(undefined, true);
  }
});

//UPLOAD USER AVATAR WITH IMAGE CROPPING & FORMATTING (path, authentication, file upload middleware, route handler, file upload error handler)
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    //using sharp to convert our image to png and resize to 250 X 250
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    //we assign our avatar field to the buffer variable
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  //this handles file upload errors
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//DELETE PROFILE IMAGE
router.delete("/users/me/avatar", auth, async (req, res) => {
  //ds line delete the profile image
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

//FETCHING USER AVATAR VIA URL LINK AND USER ID
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //if we cannot find the user by the id in the url or we find the user but the user does not have an avatar
    if (!user || !user.avatar) {
      throw new Error();
    }
    //We setting our header to png now that we are sure all our images will be in png
    res.set("Content-Type", "image/png");
    //ds send back the avatar we av found
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
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

//EXPORTING THE ROUTER
module.exports = router;
