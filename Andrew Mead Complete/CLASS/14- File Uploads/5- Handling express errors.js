/*We will learn how to customize the error that get sent back when the file upload fails. So that we can specific error message depending on why the upload fails maybe it is because of wrong file type or it doesnt meet the limit we set.
Either way, we can send back a json error message instead of the html document we are getting.*/

//Adding custom middleware for our upload route
const errorMiddleware = (req, res, next) => {
  throw new Error("From my middleware");
};

//CREATING AN ENDPOINT WHERE USER CAN USE TO UPLOAD THE FILES
//we provided multer middleware (upload.single) which takes an arg which is a name for d upload
app.post(
  "/upload",
  errorMiddleware,
  (req, res) => {
    res.send();
  },
  //we run this code after our callbackfn (Args: error : -> ds ref d error msg in line 41.
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

/*Now if we fire up the route, we get our json error response instead of the html we are getting previously.....

{
    "error": "From my middleware"
}


So now, all we need to do is swap our "errorMiddleware" for our multer middleware
*/

//CREATING AN ENDPOINT WHERE USER CAN USE TO UPLOAD THE FILES & GET CORRECT ERROR MESSAGE ON UPLOAD ERRORS
//we provided multer middleware (upload.single) which takes an arg which is a name for d upload
app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  //we add ds function after our route handler callbackfn to handler errors from our multer middleware
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

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
  dest: "images",
  //  file size validation
  limits: {
    //max file size
    fileSize: 1000000 //this is in bytes so 1million = 1mb
  },
  //file type validation (req => request bin made, file => file type, cb => callback to call when done
  fileFilter(req, file, cb) {
    //  various way to use cb
    //  To send an error => cb(new Error("File must be a PDF"))
    // To accept the upload => cb(undefined, true)
    //To silently reject the upload => cb(undefined, false) -> We wont be using this because we either want to accept d upload or send an error

    //getting d name of d uploaded file to check the extension and verify it.
    //if the file d user uploaded does not ends with either .doc OR .docx (regular expression from regex101.com)
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please upload a Word document"));
    }
    //else we accept the upload
    cb(undefined, true);
  }
});

//CREATING AN ENDPOINT WHERE USER CAN USE TO UPLOAD THE FILES & GET CORRECT ERROR MESSAGE ON UPLOAD ERRORS
//we provided multer middleware (upload.single) which takes an arg which is a name for d upload
app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  //we add ds function after our route handler callbackfn to handler errors from our multer middleware
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

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

/*CHALLENGE : - Clean up error handling
 * 1-  Setup an error handler function
 * 2-  Send back a 400 with the error message
 * 3-  Test your work*/

//user.js

const express = require("express");
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
  //dest = destination (folder where all d uploads sud b stored)
  dest: "avatar",
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
router.post(
  "/users/me/avatar",
  upload.single("avatar"),
  (req, res) => {
    res.send();
  },
  //this handles file upload errors
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//EXPORTING THE ROUTER
module.exports = router;
