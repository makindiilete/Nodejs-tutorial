/*Here we will get a bit of experience working with an npm package on our own
*
* This will be a challenge for us to load and use a npm package "chalk"
* This package allows us to customize how text appears in the console when working with node....
 * With this package we can customize what we print e.g. Print success message in Green, Warning in Yellow, Error in Red*/

/*CHALLENGE : Use the chalk library in your project
* 1-    Install version 2.4.1 of chalk
* 2-    Load chalk into app.js
* 3-    Use it to print the string "Success!" to the console in green
* 4-    Test your work
* 5-    Bonus: Use docs to mess around with other styles. Make text bold and inversed*/

/*Solution
* npm install chalk@2.4.1*/

//Printing in green

const chalk = require("chalk");
const getNotes = require("./notes");

const msg = getNotes();
console.log(msg);

const greenMsg = chalk.green('Success!');
console.log(greenMsg);

//Printing in bold and inversed
const chalk = require("chalk");
const getNotes = require("./notes");

const msg = getNotes();
console.log(msg);

const greenMsg = chalk.green.inverse.bold('Success!');
console.log(greenMsg);