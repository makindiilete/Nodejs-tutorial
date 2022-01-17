/*GOAL : - We now have the ability to be able to fill a form with our username & room to join before we are taking to a chat page with the data provided as query string but we are not using those data yet. In this lesson we will learn how to use those data by getting access to them from our client side JS.
    We will also talk about ROOMS in socket.io, this will allow us to emit events to a specific set of connections (only to people in a specific room).
    To parse our query string in our client side JS, we will be using the 3rd npm module "qs (query string)"
    By default, we can use JS to get access to our query string by using the
    syntax : -
location.search
"?username=Michaelz&room=Lagos"
So we will be passing "location.search" to our Qs module and removing the question mark with an option and this will create an object : - {username: "Michaelz", room:"Lagos"}*/

//CHAT.JS CLIENT
const socket = io();

/*HTML ELEMENTS ($ before variable tells user dey are html elements)*/
//form
const $messageForm = document.querySelector("#message-form");
//input
const $messageFormInput = $messageForm.querySelector("input");
//submit button
const $messageFormButton = $messageForm.querySelector("button");
//location button
const $sendMessageButton = document.querySelector("#send-location");
//message container
const $messages = document.querySelector("#messages");

/*TEMPLATES*/
//dynamic template for chat messages
const messageTemplate = document.querySelector("#message-template").innerHTML; //dynamic template for location messages
const locationTemplate = document.querySelector("#location-template").innerHTML;

//2-  receiving welcome from server
//eventname, generateMessage{}
socket.on("message", message => {
  console.log(message);
  ///rendering the html chat template message
  //2 args : - (id of script containing dynamic msg in html file, an object with key(d dynamic html name) & value = the message receives from server @ line 19
  const html = Mustache.render(messageTemplate, {
    //extracting the text property from d message object
    chatMessage: message.text,
    //extracting the timestamp property from the message object & formatting the display with moment library loaded in index.html. (h:mm a = ds r formats for regular chat time on popular apps like 12:32 pm)...U can check d various format on moment docs
    createdAt: moment(message.createdAt).format("h:mm a")
  });
  //inserting d html msgs inside the container
  $messages.insertAdjacentHTML("beforeend", html);
});

//Here we listen to the "locationMessage" event from d server and dump it to d console. the parameter url is now an object containing text & createdAt property
socket.on("locationMessage", url => {
  console.log(url);
  //LOCATION TEMPLATE RENDERED TO D BROWSER WINDOW
  const html = Mustache.render(locationTemplate, {
    locationUrl: url.text,
    createdAt: moment(url.createdAt).format("h:mm a")
  });
  //inserting d html msgs inside the container
  $messages.insertAdjacentHTML("beforeend", html);
});

//selecting the form by id
$messageForm.addEventListener("submit", e => {
  e.preventDefault();
  //disable d submit button while the msg is bin sent by setting a disabled attribute
  $messageFormButton.setAttribute("disabled", "disabled");
  //selecting the input by tag
  const clientData =
    //"target" = d form, "elements" = all html elements inside the form, 'message' = the name of the element
    e.target.elements.message.value;
  //3-  Sending event with the input value to the server & waiting for acknowledgment, then the additional acknowledgement msg arg from server///////////////////
  socket.emit("sendMessage", clientData, callback => {
    //enabling d form after the msg has bin sent
    $messageFormButton.removeAttribute("disabled");
    //clearing the input field
    $messageFormInput.value = "";
    //changing the focus back to d input
    $messageFormInput.focus();
    if (callback) {
      return console.log(callback);
    }
    console.log("Message delivered!");
  });
});

//selecting the send-location by id
$sendMessageButton.addEventListener("click", () => {
  //disabling the location button while fetching the location
  $sendMessageButton.setAttribute("disabled", "disabled");
  //checking support for the geo-location in d browser, if d browser does not support d geo-location, we send an alert
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  //Getting the current location
  navigator.geolocation.getCurrentPosition(position => {
    //sharing the location object with the server
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      //setting up client acknowledgement
      () => {
        console.log("Location Shared");
      }
    );
    //enabling the location button after the location has been sent
    $sendMessageButton.removeAttribute("disabled");
  });
});

/*OPTIONS*/
//Using the Qs module to parse our query string and create an obj from it.
//2 args : (location.search = gives us access to d querystring, 2nd arg help removes d question mark infront of our queryString
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

//Sending an event with the username & room to the server
socket.emit("join", { username, room });

//INDEX.JS
//loading express
const express = require("express");
//loading the path module for our public dir
const path = require("path");
//loading d http
const http = require("http");
//loading in socket.io
const socketio = require("socket.io");
//foul language validation module
const Filter = require("bad-words");
//loading in our utils/messages.js file
const {
  generateMessage,
  generateLocationMessage
} = require("./utils/messages");

//creating d app
const app = express();
//creating server using d http (ds is wat express does behind d scene for us by default)
const server = http.createServer(app);
//an instance of socketio to configure websocket to work with our server.
const io = socketio(server);

//setting our port
const port = process.env.PORT;

//serving up our public dir
const publicDirectoryPath = path.join(__dirname, "../public");

//using d created public dir
app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  //msg to display when a user connects
  console.log("New Websocket connection");

  /////LISTENER FOR "join"
  socket.on("join", ({ username, room }) => {
    //ds allows us to join a particular room
    socket.join(room);

    //1-  SENDING WELCOME MESSAGE TO A SPECIFIC ROOM
    socket.emit("message", generateMessage("Welcome!"));
    //sending a broadcast msg to only a specific room the user joined
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined!`));
  });

  //4-  Receiving event with d input value from client & sending back acknowledgement to the client
  socket.on("sendMessage", (clientData, callback) => {
    //init bad-words
    const filter = new Filter();
    //we checking the msg sent from client if it contains foul words
    if (filter.isProfane(clientData)) {
      return callback("Profanity is not allowed");
    }
    //We only send the msg if profanity is not in the messsage
    //5-  sending the received input value to all connected users
    io.emit("message", generateMessage(clientData));
    //additional msg for acknowledgement
    callback("Delivered");
  });

  //RECEIVING GEO-LOCATION FROM CLIENT & SENDING BACK ACKNOWLEDGEMENT TO CLIENT
  socket.on("sendLocation", (position, callback) => {
    //So far we have been sending & receiving events btw server & client under one event name which is "message", we changed the event name of the location sharing here from "message" to "locationMessage" in order to remove it from other events that are already using mustache template and displaying in the browser.....
    io.emit(
      "locationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${position.latitude},${position.longitude}`
      )
    );
    //sending d acknowledgement
    callback();
  });

  ////sending a broadcast msg to all clients when a user disconnects (all users except the disconnected user)////
  socket.on("disconnect", () => {
    //sending d msgs to all connected clients
    io.emit("message", generateMessage("A user has left!"));
  });
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

/*With this in place, now if we visit the homepage again and we enter a room, the other user already in that same room will be notified using our username that we have joined but if we are not in the same room, there will be no notification

Some User Name 2:49 pm

Welcome!

Some User Name 2:49 pm

Bimbo has joined!

The thing is messages we send still get delivered to every connected room so they are still not specific to the room where it has been sent, this is because we are currently using io.emit to send our msgs and we need to incoporate the "to()" to get this to work. For us to see a sample of what we are working towards, we will modify the io.emit code that we are using to send message from server to all connected rooms so it can only send message to hard coded room*/

//loading express
const express = require("express");
//loading the path module for our public dir
const path = require("path");
//loading d http
const http = require("http");
//loading in socket.io
const socketio = require("socket.io");
//foul language validation module
const Filter = require("bad-words");
//loading in our utils/messages.js file
const {
  generateMessage,
  generateLocationMessage
} = require("./utils/messages");

//creating d app
const app = express();
//creating server using d http (ds is wat express does behind d scene for us by default)
const server = http.createServer(app);
//an instance of socketio to configure websocket to work with our server.
const io = socketio(server);

//setting our port
const port = process.env.PORT;

//serving up our public dir
const publicDirectoryPath = path.join(__dirname, "../public");

//using d created public dir
app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  //msg to display when a user connects
  console.log("New Websocket connection");

  /////LISTENER FOR "join"
  socket.on("join", ({ username, room }) => {
    //ds allows us to join a particular room
    socket.join(room);

    //1-  SENDING WELCOME MESSAGE TO A SPECIFIC ROOM
    socket.emit("message", generateMessage("Welcome!"));
    //sending a broadcast msg to only a specific room the user joined
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined!`));
  });

  //4-  Receiving event with d input value from client & sending back acknowledgement to the client
  socket.on("sendMessage", (clientData, callback) => {
    //init bad-words
    const filter = new Filter();
    //we checking the msg sent from client if it contains foul words
    if (filter.isProfane(clientData)) {
      return callback("Profanity is not allowed");
    }
    //We only send the msg if profanity is not in the messsage
    //5-  sending the received input value to only users in Lagos room
    io.to("Lagos").emit("message", generateMessage(clientData));
    //additional msg for acknowledgement
    callback("Delivered");
  });

  //RECEIVING GEO-LOCATION FROM CLIENT & SENDING BACK ACKNOWLEDGEMENT TO CLIENT
  socket.on("sendLocation", (position, callback) => {
    //So far we have been sending & receiving events btw server & client under one event name which is "message", we changed the event name of the location sharing here from "message" to "locationMessage" in order to remove it from other events that are already using mustache template and displaying in the browser.....
    io.emit(
      "locationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${position.latitude},${position.longitude}`
      )
    );
    //sending d acknowledgement
    callback();
  });

  ////sending a broadcast msg to all clients when a user disconnects (all users except the disconnected user)////
  socket.on("disconnect", () => {
    //sending d msgs to all connected clients
    io.emit("message", generateMessage("A user has left!"));
  });
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

/*Now if we have two users in Lagos room, they both get the msgs sent across but other users cannot*/
