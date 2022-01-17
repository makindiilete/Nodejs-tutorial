/*EVENTS : - This is one of the core concept in node, it is a signal that something has happened in our app. let's see how to work with events.
 * On the Events inside the docs, under it we have "Class:EventEmitter"*/

//Note that "EventEmitter" starts with uppercase? This indicate that it is a class and not a function or simple value. Class contains properties and functions which we call methods.
const EventEmitter = require("events");
//this defined the actual object
const emitter = new EventEmitter();

//Register a listener : - This will listen to the event emitted. This take two parameters : the event  (as string) and a call back function
emitter.addListener("messageLogged", function() {
  console.log("Listener called");
});
//This can also be re-written as :-

/*emitter.on("messageLogged", function() {
    console.log("Listener called");
});*/

//RAISE AN EVENT
//typing 'emitter.' displays alot of methods available from which we only use 2 of them most of the time
emitter.emit("messageLogged");

//Emit : - Making a nose, produce - signalling that an event has happened.
//Note that the order id important, you need to register first before raising an event
