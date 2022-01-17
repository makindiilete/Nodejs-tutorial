/*We will starts the  authentication and security with one of the most basic things every app should do which is securely storing user's passwords. Right now, we take the password in from the user and we store them in the database exactly as they typed it.
This is known as storing the password in plain text which is a terrible idea because most users uses the same password for multiple accounts, so if our database get hacked, surely the hacker will be able to access the task data for all of the users and that is not ideal but the worse thing is we have expose the user to further hacks because all of their credentials are out in the open and so the hacker can try to use the same credentials (email & password) for their email, online banking, paypal etc.
So we do not want to store users password in plain text in other not to leave users exposed to further problem if the information get out.
So it is our job as developers to keep the users of our app secured.

The solution is not to store a plain text password but a hashed password. The hashed value will look nothing like the plain text password and if the database get hacked, the passwords will be useless to them because the algorithm we will use to create them is not reversible.

The algorithm we will use to secure & hash the password is known as "bcrypt"which is a very secure hashing algorithm widely used.

1-  Find the bycrypt module on npm "npm i bcrypt.js"*/

//LEARNING HOW BYCRYPT WORKS
//BCRYPT PLAYGROUND
const myFunction = async () => {
  //creating plain text password
  const password = "Red12345!";
  //  the hashed password : - we call "bcrypt.hash" which takes 2 args : d password to hash and the normal of rounds the hashing sud take place. "8" is cool balance btw security & speed
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(password);
  console.log(hashedPassword);
};

myFunction();

/*Runing the app : -
Red12345!
$2a$08$JMhoWWtIeYJSZJU8fEskFePTVi6rAcG4t9I/1GMmT0X5dE25syvW2


The first value is the plain text version
 The second value is the hashed version

 And the hashed version is what we will be storing in the database. Now there is a difference between hashing algorithms and encryption algorithms.
 ENCRYPTION : - This allows us to get the original value back (andrew -> hghhhghfhdhhd3848 -> andrew)
 HASHING : - This are one way algorithms, we cannot revert the process (mypass -> ghghghfhfhhdhdh484848484j). We cannot get the plain text version out.

 So we might ask, since we are using the hashing algorithm and we cannot convert the hash back to the plain text, how do we know check the password the users type to login to see if it matched the one stored in the database?

 Bcrypt gives us a very easy way to do that, all we do is to take the plain text password they provided when logging in and hash it and then we compare the hash with the hash stored in the database.
 */

//CONVERTING PLAIN TEXT PASSWORD IN LOGIN PROCESS TO HASH AND COMPARING WITH THE HASH STORED IN DATABASE

//BCRYPT PLAYGROUND
const myFunction = async () => {
  //creating plain text password
  const password = "Red12345!";
  //  the hashed password : - we call "bcrypt.hash" which takes 2 args : d password to hash and the normal of rounds the hashing sud take place. "8" is cool balance btw security & speed
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(password);
  console.log(hashedPassword);

  //  comparing the given password match the hash stored in db
  //  to do this, we use the "bcrypt.compare()"which takes 2 args : the plain text password users entered to login & the hashed version stored in db
  const isMatch = await bcrypt.compare("Red12345!", hashedPassword);
  console.log(isMatch);
};

myFunction();

/*The result of the comparison should return "true" the plain text password matches the hashed version and vice versa.

Running the app, we get : -

Red12345!
$2a$08$/EiyQbpwGTYXuzhqmwyfQ.JRJEJwonzhrSOTNk3wDRQo1wU.0qzS2
true
*/

/*CHECKING WITH A WRONG PASSWORD*/
//loading bcryptjs
const bcrypt = require("bcryptjs");

//BCRYPT PLAYGROUND
const myFunction = async () => {
  //creating plain text password
  const password = "Red12345!";
  //  the hashed password : - we call "bcrypt.hash" which takes 2 args : d password to hash and the normal of rounds the hashing sud take place. "8" is cool balance btw security & speed
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(password);
  console.log(hashedPassword);

  //  comparing the given password match the hash stored in db
  //  to do this, we use the "bcrypt.compare()"which takes 2 args : the plain text password users entered to login & the hashed version stored in db
  const isMatch = await bcrypt.compare("red12345!", hashedPassword);
  console.log(isMatch);
};

myFunction();
/*Running the app : -
Red12345!
$2a$08$T0IPFbU3mRRnmNqD/sU2C.OpgCgyk2WtDX8aihSm8kpq8bRlwO1we
false

This returned "false" because the real password is "Red12345!" but we tried to login with "red12345!"
 */
