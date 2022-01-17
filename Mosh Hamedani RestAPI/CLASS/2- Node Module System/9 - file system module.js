//Here we will be using a module that allows to work with files in node. This module is the "File System" which can be found in the docs list.

//We have both sync and async method for each of the fs methods, so when we type 'fs.', we get intellisense showing all available methods in both sync/blocking and async. Remember we need to always choose async so we can serve multiple with single thread

//TESTING FOR SYNC

//we declare a variable and set it to require the 'fs' module which represents 'file system'
const fileSystem = require("fs");

//We declare another variable and set the value to the variable declared in line 2 and select a method from the intellisense list.
// this will return all the files in the current folder './'
const files = fileSystem.readdirSync("./");
console.log(files);

//RESULT :
[".idea", "class", "myExpressApp"];

//TESTING FOR ASYNC
const fileSystem = require("fs");

//In async, the readdir takes two parameters : the path and a function that will be called when the process is completed.
//This function takes two parameters : - One for error and a string to display the result. The error here is 'err', result is 'files.
fileSystem.readdir("./", function(err, files) {
  if (err) console.log("We have an error of ", err);
  else console.log("Result is ", files);
});

//RESULT
// Result is  [ '.idea', 'class', 'myExpressApp' ]

//SIMULATING FOR ERROR

const fileSystem = require("fs");

//We simulate an error to change the directory to an invalid directory of '$'
fileSystem.readdir("$", function(err, files) {
  if (err) console.log("We have an error of ", err);
  else console.log("Result is ", files);
});

//RESULT
// We have an error of  { [Error: ENOENT: no such file or directory, scandir 'C:\Users\Michaelzgraphix\Desktop\web dev\node\$']

//RECAP
/*To work with files and directories in node :
 * 1) You need to require the fs module 'const fs = require('fs');
 * 2) Use one or more of the methods defined in this module "readdir' for example.
 * 3) All these methods comes in pairs, async & sync. Always prefer to use async methods.*/
