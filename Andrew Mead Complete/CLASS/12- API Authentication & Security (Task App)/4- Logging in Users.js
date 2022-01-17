/*We already setup mongoose to hash users password. In this video, we will provide users with a brand new endpoint that will allow them to login with their existing account. So they will provide their email & password and the new route will confirm that there is a user with that credentials.

We will be using both the user router and model to implement this*/

//user.js (model)
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

//logging in users routes.
router.post("/users/login", async (req, res) => {
  //we are creating our own custom "findByCredentials()"which finds users by their email and verify d password and either the users or error. This takes 2 args : - The user email & password
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //if their login work, we just send them the user details for nw
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

/*When you setup the "unique: true" in your model after you already have a database, you need to first wipe the database because the uniqueness can take effect...This is why it must be created before hand.*/

//TESTING THE "unique:true"
/*Now we can head over to POSTMAN and test things out by creating a new user and using the same details again to creat another user, we should see 400 bad request.*/

/*TESTING THE LOGIN ROUTE
req.body =
{
	"email":"akindiileteforex@gmail.com",
	"password":"123999abc"
}

response =
{
    "age": 0,
    "_id": "5d7356d0473db4337c78f107",
    "name": "Oluwamayowa",
    "email": "akindiileteforex@gmail.com",
    "password": "$2a$08$X52QnFInu5bEDeG2YE4.AeGf8E2dkx3Lk6Pt9yQpzphUmEs6coXTC",
    "__v": 0
}

If we try to mess the email and password, we will get our 400 bad request.*/
