//Quite often when we raise an event, we also want to send some data about that event. e.g. In our logger module, when we log a message, we can generate an id to return an id to the client or it may gives us a url to access that logged message directly. So in the 'Raise an event' code, we can add additional argument which we call 'event arguments.

const EventEmitter = require("events");
const emitter = new EventEmitter();
// here we the function now takes the arguments as parameter
emitter.addListener("messageLogged", function(arg) {
  //  logging the event and arguments to the console
  console.log("Listener called", arg);
});
//here we add the event arguments
emitter.emit("messageLogged", { id: 1, url: "http://" });

//ES 6 SYNTAX
const EventEmitter = require("events");
const emitter = new EventEmitter();
// here we the function now takes the arguments as parameter
emitter.addListener("messageLogged", arg => {
  //  logging the event and arguments to the console
  console.log("Listener called", arg);
});
//here we add the event arguments
emitter.emit("messageLogged", { id: 1, url: "http://" });

//Assignment : - Create an event emitter that register and raise an event "Raise: logging (data:message).

const EventEmitter = require("events");
emitter = new EventEmitter();
//register listener
emitter.addListener("Logging", args => {
  console.log("Listener called", args);
});
//raise event
emitter.emit("Logging", { data: "message" });

//RESULT :
// Listener called { data: 'message' }
