//We have learnt that each function & variable is a scope to the module where they exist but we might be wondering how node manage to do this where we can define different functions with the same name in different modules without one overriding the other.
/*Node is able to do this because it doesnt execute our code directly (unlike client side js), it wraps the code in each module inside a function like this : -*/

(function (exports, require, module, __filename, __dirname) {
//YOUR MODULE CODES
}

/*exports = This is the "module.exports = log;" which we have seen but we can also re-write it as "exports.log = log"
require = This is the syntax we have also seen which we use to load a module. It is present in every module as local scope.
Module = This comes before the exports.
__filename = This is the name of the file.
__dirname = Name of the directory.*/

// We can test this out by creating a syntax error on the first line of our code and run it :

var x =;
var url = "http://mylogger.io/log";

function log(message) {
  //    Send an HTTP request
  console.log(message);
}

module.exports = log;

//This will give us an error where we have the function wrapper at the top. THIS IS CALLED THE MODULE WRAPPER FUNCTION....

// So the complete code at runtime with the wrapper function will be :

(function(exports, require, module, __filename, __dirname) {

var url = "http://mylogger.io/log";

function log(message) {
  //    Send an HTTP request
  console.log(message);
}

module.exports = log;
});

//We can log the filename & dirname to the console : -

console.log(__filename);
console.log(__dirname);

var url = "http://mylogger.io/log";

function log(message) {
  //    Send an HTTP request
  console.log(message);
}

module.exports = log;

//When we run this, we get the complete path to the file on the 1st line and the complete path to the dir on the 2nd line : -

/*
C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\first-app\logger.js
C:\Users\Michaelzgraphix\Desktop\web dev\Nodejs\first-app
   Message
   */
