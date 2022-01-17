//We need to load the module we have exported. To load a module, we used the keyword "require('./filepath');"

//We declare a variable whose value is a special node keyword "require' and the file path of the exported module

var appLogger = require("./logger");
//here we call the variable we declared "appLogger" and typing dot, we get intellisense with which we can access the function exported from the logger module.

appLogger.log("Message");

//IT IS BETTER TO STORE OUR EXPORTED MODULE AS A CONSTANT INSTEAD OF A VARIABLE IN OTHER TO PREVENT OVER-WRITE BECAUSE A VARIABLE CAN BE OVERWIRTTEN AND THIS WILL GIVE US ERROR AT RUNTIME, SO BY USING CONSTANT, IF WE MISTAKENLY OVERRIDE THE EXPORTED MODULE, WE WILL GET AN ERROR TELLING US WE JUST TRIED TO OVERIDE A CONST

const appLogger = require("./logger");

appLogger.log("Message");

//With the way we performed the export, we exported an object which is not needed because this should be used when we have different functions/methods and we want to export one of them but because we only have one function inside the module then we dont need to export as "module.exports.log = log" instead we can simply use "module.exports = log"

//logger.js : - Here we will get rid of the ".log" extension in "module.exports.log"

//sending an http request to the endpoint 'url'
var url = "http://mylogger.io/log";

function log(message) {
  //    Send an HTTP request
  console.log(message);
}

module.exports = log;

//app.js : - Here we simply call the function defined in the logger.js and we changed the name of the constant to that function. So just as we need to call a function after defining it e.g.
function myFunction() {
  //anything
}
myFunction();

//////////////////////////////////////////////////////

const log = require("./logger");

//here we simply call the function directly
log("Message");
