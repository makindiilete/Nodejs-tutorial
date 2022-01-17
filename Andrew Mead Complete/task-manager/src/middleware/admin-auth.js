const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorObj = e => {
  return { isError: true, message: e.message };
};
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
      res.status(403).send(
        errorObj({
          message: "You must be an admin to perform this operation!"
        })
      );
    } else {
      next();
    }
  } catch (e) {
    //if no matching user is found
    res.status(401).send(errorObj({ message: "Please authenticate!" }));
  }
};
//exporting the middleware
module.exports = adminAuth;
