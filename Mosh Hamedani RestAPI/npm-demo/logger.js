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
