/*We will integrate send grid into our task manager app so when a user creates an account, they get a welcome email and you could use that to start a conversation on what they hope to get out of your products and if they cancel their account, we follow up by sending them one last email maybe asking why they choose to cancel and what we could have done to have kept them as a customer.
 *
 * To implement this, the "account.js" file will stay in place. The only difference is that we will setup functions that get called elsewhere in the application and that is how emails will get sent. For example, in the user.js, we have the user router, the first route runs when a user signup, what we will do is setup a function in account.js that actually sends an email to that new user. The text of the emaill will include their name, and the two values will be the email address they registered with.*/

//accounts.js
//loading send grid package
const sgMail = require("@sendgrid/mail");

//our send grid ap key
const sendgridAPIKey =
  "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";
//telling the send grid module d API key we want to use
sgMail.setApiKey(sendgridAPIKey);

//this function will be called when a user signup in user.js router
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "michaelz@sahel.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. let me know how you get along with the app.`,
    html: "<h1> Welcome User </h1>"
  });
};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail
};

//user.js (create user router)
//SIGN UP
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    //awaiting our user.save() async operation
    await user.save();
    //sending email after the user signup and it is saved to d db
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    //201 : created
    res.status(201).send({ user, token });
  } catch (e) {
    //400: bad request
    res.status(400).send();
  }
});

/*Now if we go to postman and create a new user with valid email address and send the request, we get back a success response and if we check our mailbox, we will see the welcome email.*/

/*REGISTERING YOUR DOMAIN WITH SENDGRID
 * 1-  lOGIN TO YOUR SEND GRID ACCOUNT
 * 2-  CLICK ON SETTINGS
 * 3-  SENDER AUTHENTICATION
 * 4-  AUTHENTICATE YOUR DOMAIN*/

/*CHALLENGE : - Send email to user on cancelation
 * 1-  Setup a new function for sending an email on cancelation
 *       email and name as args
 * 2-  Include their name in the email and ask why they canceled
 * 3-  Call it just after the account is removed
 * 4-  Run the request and check your inbox!*/

//acounts.js
//loading send grid package
const sgMail = require("@sendgrid/mail");

//our send grid ap key
const sendgridAPIKey =
  "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";
//telling the send grid module d API key we want to use
sgMail.setApiKey(sendgridAPIKey);

//this function will be called when a user signup in user.js router
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "michaelz@sahel.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. let me know how you get along with the app.`
    // html: "<h1>Welcome To The App</h1>"
  });
};

//this function will be called when a user delete his/her account in user.js router
const sendAccountDeleteEmail = (email, name) => {
  const faq = "https://bit.ly/sahelapp";
  sgMail.send({
    to: email,
    from: "michaelz@sahel.com",
    subject: "So sad to se you leave!",
    text: `It is so sad to see you leave, ${name}. Please fill this questionnaire to let us know how we would have served you better. ${faq}`
    // html: "<h1>We are sorry we could not serve you better!</h1>"
  });
};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail,
  sendAccountDeleteEmail: sendAccountDeleteEmail
};

//user.js (router)
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
//loading in "Account.js" email function
const { sendWelcomeEmail } = require("../emails/accounts");
const { sendAccountDeleteEmail } = require("../emails/accounts");

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
    //sending email after the user signup and it is saved to d db
    sendWelcomeEmail(user.email, user.name);
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
    //sending email after the user delete their accounts from the database
    sendAccountDeleteEmail(req.user.email, req.user.name);
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
