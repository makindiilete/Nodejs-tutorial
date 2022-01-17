/*Now that we have messed and understood bcrypt, we can now integrate password hashing into our task-manager api.
There are two main places where plain text password are provided in our app which we can explore by checking the 'user.js' router.

If we check our users model, we see that included in the field is email & password and in our routes, the two places where users will use their password is during creating a user & updating a user. So we can hash the passwords in this two routes.

We will not change the routes code, instead we will work inside the model. Mongoose supports a concept called MIDDLEWARE. This is a way to customize the behavior of your mongoose model so you can do some interesting things. To explore this, we can check mongoose docs, under "Guides", > "Middleware".

With middleware, we can run a function before or after a given event occurs e.g. From the Middleware methods, we have : -
VALIDATE : - We can run some code/function before a given user is validated
SAVE : -  We can run some code before a user is saved
REMOVE : - We can run some code before a user is removed

In our case, we will focus on the SAVE. Our job is to run some code before a user is saved. We will check if there is a plain text password and if that's true, we hashed it.*/

const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");

//Creating our own schema to take advantage of using middleware
//we create a schema variable and we pass the schema objects/structure/configuration to it
const userSchema = new mongoose.Schema({
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
  }
});

//USING A METHOD ON "userSchema" TO SETUP OUR MIDDLEWARE (pre : - before event, post: - after event). 2 args : - (name of the event & function to run which must be a standard function). The standard function takes an arg "next" which we call when we are done
userSchema.pre("save", async function(next) {
  //from this variable "user", we will be able to access all the fields provided in the user model e.g. name, email, password
  const user = this;
  //this is where we state the code to run before saving the user
  console.log("Just before saving");
  //this is where we give the go-ahead to save the user after our code above has been run
  next();
});

//DEFINING OUR BASIC USER MODEL : - This takes 2 args, the model name and the schema (the model object/structure/configuration
const User = mongoose.model("User", userSchema);

module.exports = User;

/*If we run the application and try to create a new user in POSTMAN, before saving the user, we get our console.log statement logged in the console and then the user is created.*/

/*CURRENTLY, THINGS WILL NOT WORK IF WE TRY TO UPDATE THE USER. We can check this out by grabbing the id of the new user we just created and try to use the "UPDATE USER" request in POSTMAN to update it.

When we try to update, the user details indeed got updated but we didnt get our console.log statement the second time. This means that certain mongoose query bypass some advanced fixtures like "middleware" which means if we must use them constantly, then we need to restructure our code.

This update will be perform on our ROUTER.PATCH for user. This is because the "findByIdAndUpdate" bypasses mongoose and perform a direct operation on the db and that is why we had to perform special options like {new: true} and for running validators.*/

//CHANGING THE route.patch CODE

/*BEFORE*/
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
    //we passed 3 args : the user id, the object to use for the update which is the "req.body" i.e. the json from postman, the we set options
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      //this will ensure we get back the newly updated details
      new: true,
      //this will turn on our model validation for the update
      runValidators: true
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*NOW*/
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
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

/*Now if we go to the POSTMAN to update the details again, our console.log statement is now printed which means our middleware now run successfully.
 * THIS IS THE SMALL NEEDED ADJUSTMENT TO ENSURE OUR MIDDLEWARE CONSISTENTLY RUN.
 * Now we can hash our password since we have configured our middleware to consistently run with our routes
 * */

/*HASHING THE PASSWORD : - Before hashing the password, we first check if the password is been changed, that is the only time we want to hash the password, we do not need to hash the password if it is not been changed because it would have been hashed already and since it is not getting changed, the same hash will still work.
 * So we use an if statement to check if the password field is getting modification. This will be true when user is first created and when users are updated and password field is one of the things changed.
 * We will complete this process in the user model file*/

//user.js (model)
const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");
//loading bycrpt module
const bcrypt = require("bcryptjs");

//Creating our own schema to take advantage of using middleware
//we create a schema variable and we pass the schema objects/structure/configuration to it
const userSchema = new mongoose.Schema({
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
  }
});

//USING A METHOD ON "userSchema" TO SETUP OUR MIDDLEWARE (pre : - before event, post: - after event). 2 args : - (name of the event & function to run which must be a standard function). The standard function takes an arg "next" which we call when we are done
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

//DEFINING OUR BASIC USER MODEL : - This takes 2 args, the model name and the schema (the model object/structure/configuration
const User = mongoose.model("User", userSchema);

module.exports = User;

/*Now if we try to create a user with Postman, when we input the fields and send, we get the response : -
 {
    "age": 0,
    "_id": "5d734cf8ea2c5b3c8c274061",
    "name": "Oluwamayowa",
    "email": "akindiileteforex@gmail.com",
    "password": "$2a$08$nKx8p1wHB4J2de20n622/uEFFMb6gST4ZZaEWbM5Sk.UDrIlyXwj6",
    "__v": 0
}

Later in the course we will see how to lock in the password so that users will not get the password back upon creating a user.
*/

/*TRYING TO UPDATE THE USER TO CHECK IF UPDATE WORKS TOO

We go to postman and try to update a user with the details below : -
{
	"name":"Andrew",
	"password":"test123()()"
}

As response, we get back the details below : -
{
    "age": 0,
    "_id": "5d73479181852330a0585a6b",
    "name": "Andrew",
    "email": "akindiileteforex@gmail.com",
    "password": "$2a$08$G7yoYrOdtKaVP5Xj5WK3ZuxPm7jmbgRF3xcLhE3yQ15QrIvg4iR0u",
    "__v": 0
}

So middleware allows us to provide the algorithm once inside the model and it works on all routes without needed to state it out on each routes.*/

/*CHALLENGE : - Change how tasks are updated
 * 1-  Find the task
 * 2-  Alter the task properties
 * 3-  Save the task
 * 4-  Test your work by updating a task from Postman*/

//UPDATING A TASK
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const task = await Task.findById(req.params.id);
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    /*   const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });*/
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});
