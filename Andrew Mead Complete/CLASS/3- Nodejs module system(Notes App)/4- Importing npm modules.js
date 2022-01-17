/*We will learn how to use the module system to load npm modules/packages.
* We can use this already created packages to solve and add functionalities like validation, sending emails etc
* Run "node -v" & "npm -v" to get node and npm versions

* 1-    Initialise npm in our project "npm init"
*       Press ENTER to accept default value or type in custom value
* 2-    This will create a "package.json" file which will be used to manage all the dependencies that our package needs to run.
* 3-    Install validator package "npm install validator@10.8.0"
* 4-    This will creates a "package-lock.json" file and node_modules folder
* node_modules contains all our package codes and files
* package-lock.json contains all the extra information of our packages e.g. "version" : - The version, resolved: - the path they were fetch from, "integrity" : - The hash code of the package*/

//LOADING AN npm package

//app.js
const validator = require("validator");

/*To learn how to use a package, you can easily check the docs on npm package page*/

//app.js
const validator = require("validator");
//validating email address
console.log(validator.isEmail('akindiileteforex@gmail.com'));

/*Running the code : -
true
*/

//app.js
const validator = require("validator");
//validating email address
console.log(validator.isEmail('gmail.com'));

/*Running the code : -
false
*/

//app.js
const validator = require("validator");
//validating a URL
console.log(validator.isURL('https://mead.io'));

/*Running the code ; -
true
*/

//app.js
const validator = require("validator");
//validating a URL
console.log(validator.isURL('https:/mead.io'));

/*Running the code ; -
false
*/