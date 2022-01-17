/*Our app is using an environment variable already which is the "process.env.PORT" we used in index.js where we access the PORT env var provided by heroku when heroku runs our app.

What we will be focusing on is providing environment variable to our application.

2 MAIN IMPORTANCE OF ENV VAR
1-  Security : - Right now we have alot of important information hardcoded into our application such as the API KEY for sendgrid in "account.js". If we are to leave this API keys to the javascript file, we will have to leave the API key inside and push it up to github and push it up to heroku. Now this means there is probability of the API KEY to enter into the wrong hands. And this is why we will also be breaking our API KEYS into env var in other to avoid vulnerabilities.
2-  Customizability : - If we check the mongoose.js file, we have our hardcoded database connection url which connects to our mongodb locally. This has been working well but when we deploy the app to production, we will be using another service to run our mongodb database so we will not be able to use the current local url for production. So with env var, we can setup an environment variable and provide two values for it. One to run when running in development and another when running in production.

//STARTING WITH ENVIRONMENT VARIABLE
We will go into the index.js file > We will create our own env var for PORT which runs on the local machine so we do not need to hard code the port 3000.
1-  Create a new folder in the task manager folder >> File name = "dev.env"
This is a file that contains several key value pairs. Where the key is the property we want to set for e.g. PORT and the value is the value to use
2-  In the file, create the PORT env var with the syntax : - (PORT=3000).
3-  Now if we run the app, we get "Server running on undefined". This is because we have not provided the env var to be used yet and to do this is very complex because there are different ways to get it done depending on the operating system but we will install an npm module that allows us to get this done in a cross OS compatible way. Which means you env will work on Mac, Windows and Linux.
4-  The module we will be using is "npm env-cmd". It will load the "dev.env" file and make sure they are available for our node app.
5-  After installation, we need to make some changes to our package.json file. This changes is to tell the module to provide our project with the environment variable and provide it when using the dev script. We will not do that for our start script bcos that is for production and will be set on heroku.

Here is the changes : -
"dev": "env-cmd ./config/dev.env nodemon src/index.js"
With this command, when we run the server now, we should no longer see "Server is up on port undefined" bu the value defined in the environment variable.

So now if we run the app again, we get our message "Server is up on port 3000".
Now that we know how to configure environment variable, we will be setting environment variable for our : -
1-  JSON web token secret
2-` Send grid API key
3-  Mongodb connection string
*/

//SENDGRID API KEY ENV VAR

//dev.env
// PORT=3000
// SENDGRID_API_KEY=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

//accounts.js
//loading send grid package
const sgMail = require("@sendgrid/mail");

/*//our send grid ap key (Now moved to env var)
const sendgridAPIKey =
  "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";*/
//telling the send grid module d API key we want to use which is now stored in our env variable (env variable sud b in uppercase with underscore to separate texts)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

//index.js
//EXTERNAL ROUTES
const userRouter = require("./src/routers/user");
const taskRouter = require("./src/routers/task");

//loading our mongoose.js file where we connect to database
require("./src/db/mongoose");
/*Creating our server*/
const express = require("express");
const app = express();
const port = process.env.PORT;

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

/*CHALLENGE : - Pull JWT secret and database URL into env vars
 * 1-  Create two new env vars: JWT_SECRET and MONGODB_URL
 * 2-  Setup values for each in the development env files
 * 3-  Swap out three hardcoded values
 * 4-  Test your work. Create new user and get their profile.*/

//dev.env
/*PORT=3000
SENDGRID_API_KEY=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
MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api
JWT_SECRET=thisismynewcourse*/

//mongoose.js
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
  useCreateIndex: true,
  //  correcting findAndModify deprecation warning
  useFindAndModify: false
});

//user.js
const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");
//loading bycrpt module
const bcrypt = require("bcryptjs");
//JWT token module
const jwt = require("jsonwebtoken");
//loading the task model so we can remove tasks of a deleted user via middleware
const Task = require("../models/task");

//Creating our own schema to take advantage of using middleware
//we create a schema variable and we pass the schema objects/structure/configuration to it
const userSchema = new mongoose.Schema(
  {
    //  Setting the type for our fields.
    name: {
      type: String,
      //setting the name property to be a compulsory input
      required: true,
      //    adding trim to our name field to remove any spaces
      trim: true
    },
    email: {
      type: String,
      //this will ensure 2 users cannot create acct with the same email
      unique: true,
      required: true,
      //remove space
      trim: true,
      //convert to lowercase
      lowercase: true,
      //using the npm validator to validate email field
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid");
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        //  checking to see if the password entered includes "password"
        if (value.toLowerCase().includes("password")) {
          throw new Error("Your password cannot include 'password'");
        }
      }
    },
    age: {
      type: Number,
      //adding default age value for when age is not provided
      default: 0,
      //    setting custom validator for age to be positive no
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number!");
        }
      }
    },
    //Admin profiles
    isAdmin: {
      type: Boolean,
      default: false
    },
    //Adding our token (this will be provided by d server automatically so ds is all we need)
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    //  ds stored users profile avatar
    avatar: {
      //ds allows us to store the image with our binary image data ryt in d database alongside of the user dt owns d image
      type: Buffer
    }
  },
  //Just adding this option to our schema will active the 2 timestamp fields (createdAt & UpdatedAt)
  {
    timestamps: true
  }
);

//SETTING VIRTUAL PROPERTY TO ALLOW USER DOCUMENT HAVE ACCESS TO THEIR CREATED TASKS (This is virtual because we are not changing what we stored for the user document, it is just a way to figure out how the user & task document are related)
//we gv the virtual a name "tasks" then an object inside which we create a reference to the Task model.

userSchema.virtual("userTasks", {
  //d model we are referencing
  ref: "Task",
  //d name of the field we will be using inside the user document to store the relationship
  localField: "_id",
  //  the name of the field on the Task document dt creates ds relationship (this is the "owner" field we added to the task model
  foreignField: "owner"
});

//CREATING THE FUNCTION THAT HIDES SENSITIVE USER'S DATA
userSchema.methods.toJSON = function() {
  const user = this;
  //We convert the user document to a JS object
  const userObject = user.toObject();
  //We use the delete keyword to remove/hide objects we do not want to be sent back
  delete userObject.password;
  delete userObject.tokens;
  //we are removing the avatar from bin sent back as part of user details bcos the images are large
  delete userObject.avatar;
  return userObject;
};

//Creating the JWT generator function
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  //as d first args, jwt expects a standard string as d value of the key, and mongodb _id are object id so we convert it to string with "toString()"
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  //saving tokens to d database
  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  //returning the token
  return token;
};

//Creating the new "findByCredentials()"
userSchema.statics.findByCredentials = async (email, password) => {
  //  finding the users by email: we use "findOne"to find a single user whose email === email passed in the argument
  const user = await User.findOne({ email: email });
  //if we cannot find the user's email
  if (!user) {
    throw new Error("Unable to login!");
  }
  //we check if the password entered in the arg/req.body matches with password in the user db
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    //if we cannot match the password
    throw new Error("Unable to login!");
  }
  //if both email and password works, we return the user
  return user;

  //  "unable to login" is cool enough bcos we do not want to provide a too specific msg why the login didnt work incase of hackers
};

//HASHING THE PLAIN TEXT PASSWORD WHENEVER A NEW USER IS CREATED
userSchema.pre("save", async function(next) {
  //from this variable "user", we will be able to access all the fields provided in the user model e.g. name, email, password
  const user = this;
  //this is where we state the code to run before saving the user
  //we check if the password field is getting modified and if true, we hash it
  if (user.isModified("password")) {
    //hashing the password
    user.password = await bcrypt.hash(user.password, 8);
  }
  //this is where we give the go-ahead to save the user after our code above has been run
  next();
});

//DELETE USER TASKS WHEN USER IS REMOVED
userSchema.pre("remove", async function(next) {
  const user = this;
  // here we delete all tasks having their owner id set as the id of this user
  await Task.deleteMany({ owner: user._id });
  next();
});

/*THIS MUST ALWAYS COME AS THE LAST BEFORE EXPORTING*/
//DEFINING OUR BASIC USER MODEL : - This takes 2 args, the model name and the schema (the model object/structure/configuration
const User = mongoose.model("User", userSchema);

module.exports = User;

//admin-auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//defining the middleware function
const adminAuth = async function(req, res, next) {
  try {
    //  how to get the value of the token
    //  req.header takes the KEY name we passed in postman as arg
    //replace() removes the "Bearer " so we are left with our token : 2 args = what to remove and what to replace it with (nothing)
    const token = req.header("Authorization").replace("Bearer ", "");
    //verifying the token validity (the token & secret string)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //finding the user : the decoded now has the "_id" property bcos dt is what we use in creating the token.
    //tokens.token : - From the tokens[] in d db, we want to search for the user having the current token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    //  if no user is found
    if (!user) {
      throw new Error();
    }
    //checks if the user is not an admin.
    else if (user.isAdmin === false) {
      res
        .status(403)
        .send({ error: "You must be an admin to perform this operation!" });
    } else {
      next();
    }
  } catch (e) {
    //if no matching user is found
    res.status(401).send({ error: "Please authenticate!" });
  }
};
//exporting the middleware
module.exports = adminAuth;

//auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//defining the middleware function
const auth = async function(req, res, next) {
  try {
    //  how to get the value of the token
    //  req.header takes the KEY name we passed in postman as arg
    //replace() removes the "Bearer " so we are left with our token : 2 args = what to remove and what to replace it with (nothing)
    const token = req.header("Authorization").replace("Bearer ", "");
    //verifying the token validity (the token & secret string)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
