/*We talked about protecting routes that has to do with modifying data available only to authenticated users.... So our genres endpoint should only be called by authenticated users

For this we will create a middleware function
1) Create a new folder "middleware"
2) Create a new file in that folder "auth.js"
*/

//AUTH.JS
const jwt = require("jsonwebtoken");
const config = require("config");

//MIDDLEWARE FUNCTION FOR CHECKING AND AUTHORIZING OUR WEB TOKEN

function auth(req, res, next) {
  //the program checks if the user has a token in the headers which means he/she is logged in, if no token is found
  const token = req.header("x-auth-token");
  //we send this error
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //else we verify that the token is valid
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    //we set our user variable to the "decoded" variable
    req.user = decoded;
    //pass control to the next middleware function
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
