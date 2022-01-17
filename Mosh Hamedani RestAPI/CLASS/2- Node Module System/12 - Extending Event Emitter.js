//If you want to raise event in your app to signal that something has happened.
/*1) You need to create a class that extends EventEmitter. This class we have all the functionality defined in the EventEmitter but you can also add more functionality in this case we log a message 'log(message) {}'
 * 2) Inside the class, to raise an event, we use 'this.emit'
 * */

const EventEmitter = require("events");
//emitter = new EventEmitter(); "we have gotten rid of this"

var url = "http://mylogger.io/log";

//we create a class that extends our 'EventEmitter' so with this we can get rid of the 'emitter = new EventEmitter'
class Logger extends EventEmitter {
  //we removed the 'function' keyword because its now inside on a class
  log(message) {
    //    Send an HTTP request
    console.log(message);

    //Here we directly access the emit method using 'this' without needing the 'emitter.emit'
    this.emit("Logging", { data: "message" });
  }
}

//here we export the class 'Logger' instead of the function 'log'
module.exports = Logger;

/*In appmodule, instead of using a new instance of EventEmitter, we simply use the custom class that extends EventEmitter 'const logger = new Logger();*/

const EventEmitter = require("events");
//emitter = new EventEmitter(); "we have gotten rid of this"

//here we load our class inside the logger.js module as a constant and it requires the filepath to the logger module
const Logger = require("./logger");
//'logger' here replaces 'emitter' and we create instance of the 'Logger' class instead of 'const emitter = new EventEmitter'
const logger = new Logger();
//register listener
//'logger' replaces 'emitter'
logger.addListener("Logging", args => {
  console.log("Listener called", args);
});
//We call the method 'log' from the logger.js and we pass a string as the parameter.
//'logger' also replaces 'emitter'
logger.log("message");

//RESULT
// Listener called { data: 'message' }
