const { User } = require("../models/user");
const jwtDecode = require("jwt-decode");

const errorObj = e => {
  return { isError: true, message: e.message };
};

//defining the middleware function
const auth = async function(req, res, next) {
  try {
    //  how to get the value of the token
    //  req.header takes the KEY name we passed in postman as arg
    //replace() removes the "Bearer " so we are left with our token : 2 args = what to remove and what to replace it with (nothing)
    const token = req.header("Authorization").replace("Bearer ", "");
    //We decode our token
    const decoded = jwtDecode(token);

    // Check Token Expiry
    const dateNow = new Date();
    const tokenExpiry = new Date(decoded.exp * 1000);
    if (dateNow > tokenExpiry) {
      return res.status(401).send(errorObj({ message: "Token Expired!" }));
    }
    //finding the user : the decoded now has the "email" property bcos dt is what we use in creating the token.
    //tokens.token : - From the tokens[] in d db, we want to search for the user having the current token
    const user = await User.findOne({
      email: decoded.email,
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
    res.status(401).send(errorObj({ message: "Please authenticate!" }));
  }
};
//exporting the middleware
module.exports = auth;
