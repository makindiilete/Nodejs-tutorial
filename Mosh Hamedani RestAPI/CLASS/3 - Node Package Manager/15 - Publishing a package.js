/*You can create your own node packages and publish them to the node registry
 *
 * 1) Create a new folder "mkdir lion-lib" (We will be creating a library called lion).
 * 2) cd lion-lib/
 * 3) npm init --yes (to create a package.json)
 * 4) Open the folder in the code editor
 * 5) Add a new file, index.js and add a simple js function e.g. "module.exports.add = function(a,b) (return a + b };"
 *
 * 6) "npm adduser" (this creates account on npmjs), if you already have an account, you run "npm login"
 * 7) Enter your username, password and email.
 * 8) Run "npm publish" to publish the package
 * 9) You might need to add a unique character to the package name before you publish just incase the name is already taken
 * */

//USING THE PUBLISHED PACKAGE
/*1) Set up a new app
 * 2) Install the published package "npm i lion-lib"
 * 3) Set up an index.js file and use the package using :
 * */

var lion = require("lion-lib");
var result = lion.add(1, 2);
console.log(result);

//RESULT "3"
