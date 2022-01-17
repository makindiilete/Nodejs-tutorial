/*Now that we now have an http request for login and we also verify the credentials that are provided, we will continue on by allowing users to truly login so they can perform other actions later on by creating a new task.

So at the end of the day, every express route we create we fall in one of the 2 categories : -
1-  Either to be public and be accessible to anyone
2-  Sit behind authentication and you will have to be correctly authenticated to use it.

OUR PUBLIC ROUTES : -
Sign up & Login routes

Everything else will require you to be authenticated. e.g.
1-  Before deleting a task, we want to authenticate that you are the one who created the task, so you wont delete a task created by another user.
What we need to do to achieve this, is make the login request send back and authentication token, this token will be used by the logged in user to perform other request that required authentication.

WHAT WE WILL BE USING IS CALLED JWT : - JSON Web Tokens. We will be able to use our JWT to setup everything we want for our authentication system e.g.
1-  Have tokens expire after a specific number of time. So user cannot stay logged in forever.
2-  We could decided to make token non-expiry so it can be used indefinitely. This depends on the security required.
*/

/*LEARNING JWT
We can explore this library on npm "npm i jsonwebtoken"

Just like we did with "bcrypt.js" we will start by playing around with it in index.js before integrating it into our task-manager app. */

//CREATING A NEW TOKEN
/*JSON WEB TOKEN PLAYGROUND*/
const jwt = require("jsonwebtoken");

const myFunction = async () => {
  // d method takes 2 args : d object to store in ur token & a secret string to ensure the token has not been tampered with. So in our case, we will store the user id (we can add more than one field)
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse");
  console.log(token);
};

myFunction();

/*Running the program : -
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1Njc4NDEyMjB9.jN6TzF
GvqsIdmctUix4OwC7zoIKpdRoVxIS2VrL6pT4

We get this long series of character which is our token

WHAT A JWT TOKEN IS MADE UP OF
The token contain 3 parts separated by (.)
FIRST PART : - This contain metadata about the type of token it is and the algorithm that was used to generate it
SECOND PART : - The "Payload/Body". This contains the data we provided which in our case the "_id"
THIRD PART : - The signature, which is used to verify the token.

The purpose of the JWT is not to hide data, the data is publicly visible but it cannot be changed or altered because of the secret string "thisismynewcourse"
 */

/*DECODING A JWT
In your browser, visit : - https://wwww.base64decode.org
Copy the JWT seocond part and paste it in the box and click decode. This return a JSON object with two values : - First value is the id we provided, and the 2nd is the timestamp letting u know when the token was created.
{"_id":"abc123", "iat":1567842113 )
*/

/*TOKEN VERIFICATION : - This will allow us verify the token provided and decode it just as we did in the browser but this time via code
 */

/*JSON WEB TOKEN PLAYGROUND*/
const jwt = require("jsonwebtoken");

const myFunction = async () => {
  // d method takes 2 args : d object to store in ur token & a secret string to ensure the token has not been tampered with. So in our case, we will store the user id (we can add more than one field)
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse");
  console.log(token);
  //  Token verification: 2args: the token & secret string
  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

myFunction();

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1Njc4NDIxMTN9.CxXdfR
PhC5EzC-s0eHezwlwQxmf-eQohWXJ9wj5qgeM

{ _id: 'abc123', iat: 1567842113 }
*/

/*PROVIDING WRONG SECRET KEY*/
const jwt = require("jsonwebtoken");

const myFunction = async () => {
  // d method takes 2 args : d object to store in ur token & a secret string to ensure the token has not been tampered with. So in our case, we will store the user id (we can add more than one field)
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse");
  console.log(token);
  //  Token verification: 2args: the token & secret string
  const data = jwt.verify(token, "thisismynewcoursee");
  console.log(data);
};

myFunction();

/*UnhandledPromiseRejectionWarning: JsonWebTokenError: invalid signature*/

/*SETTING JWT TOKEN EXPIRY : - We can make the token also expire after certain amount of time. This means the amount of time to wait before the token will not be verifiable or usable. So we will be using 0 seconds so that the token verification code below the token creation wont have a chance to run*/

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  // d method takes 3 args : d object to store in ur token & a secret string to ensure the token has not been tampered with. So in our case, we will store the user id (we can add more than one field), 3rd arg is the time to wait then make the token expire : ds can be in seconds, minutes, days, weeks, months etc
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
    expiresIn: "0 seconds"
  });
  console.log(token);
  //  Token verification: 2args: the token & secret string
  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

myFunction();

/*UnhandledPromiseRejectionWarning: TokenExpiredError: jwt expired
 */

/*IF WE USE 7DAYS, Things will work well because 7 days wont pass before the token creating and verification runs.*/
