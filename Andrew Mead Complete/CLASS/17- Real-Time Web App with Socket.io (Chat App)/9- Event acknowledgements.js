/*GOAL : - We will learn about event acknowledgement in socket.io..
Event acknowledgement allows the receiver to acknowledge that it receives and processed the event. For example : - When the client sends the location message to the server, the client get acknowledgement that the server receives the message and it was delivered and processed successfully...*/
/*Event acknowledgement
server (emit) --> client (receive) --acknowledgment --> server
client (emit) --> server (receive) --acknowledgment --> client*/

//CHAT.JS CLIENT
/*Event acknowledgement
server (emit) --> client (receive) --acknowledgment --> server
client (emit) --> server (receive) --acknowledgment --> client*/

const socket = io();
//2-  receiving welcome from server
socket.on("message", message => {
  console.log(message);
});

//selecting the form by id
document
  .querySelector("#message-form")
  //Targeting submit event on the form
  .addEventListener("submit", e => {
    //preventing reload
    e.preventDefault();
    //selecting the input by tag
    const clientData =
      //"target" = d form, "elements" = all html elements inside the form, 'message' = the name of the element
      e.target.elements.message.value; //we use ds bcos if we av multiple inputs, our code will break using the previous option
    //3-  Sending event with the input value to the server & waiting for acknowledgment///////////////////
    socket.emit("sendMessage", clientData, () => {
      console.log("The message was delivered!");
    });
  });

//selecting the send-location by id
document.querySelector("#send-location").addEventListener("click", () => {
  //checking support for the geo-location in d browser, if d browser does not support d geo-location, we send an alert
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  //Getting the current location
  navigator.geolocation.getCurrentPosition(position => {
    //sharing the location object with the server
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
});

///INDEX.JS SERVER
//loading express
const express = require("express");
//loading the path module for our public dir
const path = require("path");
//loading d http
const http = require("http");
//loading in socket.io
const socketio = require("socket.io");

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

  //1-  SENDING WELCOME MESSAGE TO ALL CLIENTS
  socket.emit("message", "Welcome!");
  //sending a broadcast msg to all clients (except d current user dt performed d event), args (default eventName@line31, msg/data to send)//
  socket.broadcast.emit("message", "A new user has joined!");

  //4-  Receiving event with d input value from client & sending back acknowledgement to the client
  socket.on("sendMessage", (clientData, callback) => {
    //5-  sending the received input value to all connected users
    io.emit("message", clientData);
    callback();
  });

  //RECEIVING GEO-LOCATION FROM CLIENT
  socket.on("sendLocation", position => {
    //sharing the location to all connected clients via google map
    io.emit(
      "message",
      `https://google.com/maps?q=${position.latitude},${position.longitude}`
    );
  });

  ////sending a broadcast msg to all clients when a user disconnects (all users except the disconnected user)////
  socket.on("disconnect", () => {
    //sending d msgs to all connected clients
    io.emit("message", "A user has left!");
  });
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

/*Now when we go back to the browser and send a message, we get:
This is a test
The message was delivered*/

/*PROVIDING ADDITIONAL DATA WITH EVENT ACKNOWLEDGEMENT : - We know that the acknowledgement message that get displayed was set on the client side, we can also provide additional message on the server side to add to the message*/

//INDEX.JS
//loading express
const express = require("express");
//loading the path module for our public dir
const path = require("path");
//loading d http
const http = require("http");
//loading in socket.io
const socketio = require("socket.io");

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

  //1-  SENDING WELCOME MESSAGE TO ALL CLIENTS
  socket.emit("message", "Welcome!");
  //sending a broadcast msg to all clients (except d current user dt performed d event), args (default eventName@line31, msg/data to send)//
  socket.broadcast.emit("message", "A new user has joined!");

  //4-  Receiving event with d input value from client & sending back acknowledgement to the client
  socket.on("sendMessage", (clientData, callback) => {
    //5-  sending the received input value to all connected users
    io.emit("message", clientData);
    //additional msg for acknowledgement
    callback("Delivered");
  });

  //RECEIVING GEO-LOCATION FROM CLIENT
  socket.on("sendLocation", position => {
    //sharing the location to all connected clients via google map
    io.emit(
      "message",
      `https://google.com/maps?q=${position.latitude},${position.longitude}`
    );
  });

  ////sending a broadcast msg to all clients when a user disconnects (all users except the disconnected user)////
  socket.on("disconnect", () => {
    //sending d msgs to all connected clients
    io.emit("message", "A user has left!");
  });
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//CHAT.JS CLIENT
/*Event acknowledgement
server (emit) --> client (receive) --acknowledgment --> server
client (emit) --> server (receive) --acknowledgment --> client*/

const socket = io();
//2-  receiving welcome from server
socket.on("message", message => {
  console.log(message);
});

//selecting the form by id
document
  .querySelector("#message-form")
  //Targeting submit event on the form
  .addEventListener("submit", e => {
    //preventing reload
    e.preventDefault();
    //selecting the input by tag
    const clientData =
      //"target" = d form, "elements" = all html elements inside the form, 'message' = the name of the element
      e.target.elements.message.value; //we use ds bcos if we av multiple inputs, our code will break using the previous option
    //3-  Sending event with the input value to the server & waiting for acknowledgment, then the additional acknowledgement msg arg from server///////////////////
    socket.emit("sendMessage", clientData, delivered => {
      console.log("The message was delivered!", delivered);
    });
  });

//selecting the send-location by id
document.querySelector("#send-location").addEventListener("click", () => {
  //checking support for the geo-location in d browser, if d browser does not support d geo-location, we send an alert
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  //Getting the current location
  navigator.geolocation.getCurrentPosition(position => {
    //sharing the location object with the server
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
});

/*Now if we save and send another message, we now have : -
This is a test
The message was delivered! Delivered */

/*A great usage of acknowledgement is for validation e.g. Maybe we do not want messages that contains foul language, there is an npm module we can use to integrate that to our project "npm bad-words"*/

//INDEX.JS SERVER
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

  //1-  SENDING WELCOME MESSAGE TO ALL CLIENTS
  socket.emit("message", "Welcome!");
  //sending a broadcast msg to all clients (except d current user dt performed d event), args (default eventName@line31, msg/data to send)//
  socket.broadcast.emit("message", "A new user has joined!");

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
    io.emit("message", clientData);
    //additional msg for acknowledgement
    callback("Delivered");
  });

  //RECEIVING GEO-LOCATION FROM CLIENT
  socket.on("sendLocation", position => {
    //sharing the location to all connected clients via google map
    io.emit(
      "message",
      `https://google.com/maps?q=${position.latitude},${position.longitude}`
    );
  });

  ////sending a broadcast msg to all clients when a user disconnects (all users except the disconnected user)////
  socket.on("disconnect", () => {
    //sending d msgs to all connected clients
    io.emit("message", "A user has left!");
  });
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//CHAT.JS CLIENT
/*Event acknowledgement
server (emit) --> client (receive) --acknowledgment --> server
client (emit) --> server (receive) --acknowledgment --> client*/

const socket = io();
//2-  receiving welcome from server
socket.on("message", message => {
  console.log(message);
});

//selecting the form by id
document
  .querySelector("#message-form")
  //Targeting submit event on the form
  .addEventListener("submit", e => {
    //preventing reload
    e.preventDefault();
    //selecting the input by tag
    const clientData =
      //"target" = d form, "elements" = all html elements inside the form, 'message' = the name of the element
      e.target.elements.message.value; //we use ds bcos if we av multiple inputs, our code will break using the previous option
    //3-  Sending event with the input value to the server & waiting for acknowledgment, then the additional acknowledgement msg arg from server///////////////////
    socket.emit("sendMessage", clientData, error => {
      if (error) {
        return console.log(error);
      }
      console.log("Message delivered!");
    });
  });

//selecting the send-location by id
document.querySelector("#send-location").addEventListener("click", () => {
  //checking support for the geo-location in d browser, if d browser does not support d geo-location, we send an alert
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  //Getting the current location
  navigator.geolocation.getCurrentPosition(position => {
    //sharing the location object with the server
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
});

/*Now if we send a normal message like "Hello", this get sent but if we type word like "pussy, hell", this messages are not sent are we get the warning "Profanity is not allowed"*/

/*CHALLENGE : - Setup acknowledgment
 * 1-  Setup the client acknowledgement function
 * 2-  Setup the server to send back the acknowledgment
 * 3-  Have the client print "Location shared!" when acknowledged
 * 4-  Test your work!*/

//CHAT.JS CLIENT
/*Event acknowledgement
server (emit) --> client (receive) --acknowledgment --> server
client (emit) --> server (receive) --acknowledgment --> client*/

const socket = io();
//2-  receiving welcome from server
socket.on("message", message => {
  console.log(message);
});

//selecting the form by id
document
  .querySelector("#message-form")
  //Targeting submit event on the form
  .addEventListener("submit", e => {
    //preventing reload
    e.preventDefault();
    //selecting the input by tag
    const clientData =
      //"target" = d form, "elements" = all html elements inside the form, 'message' = the name of the element
      e.target.elements.message.value; //we use ds bcos if we av multiple inputs, our code will break using the previous option
    //3-  Sending event with the input value to the server & waiting for acknowledgment, then the additional acknowledgement msg arg from server///////////////////
    socket.emit("sendMessage", clientData, callback => {
      if (callback) {
        return console.log(callback);
      }
      console.log("Message delivered!");
    });
  });

//selecting the send-location by id
document.querySelector("#send-location").addEventListener("click", () => {
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
  });
});

//INDEX.JS SERVER
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

  //1-  SENDING WELCOME MESSAGE TO ALL CLIENTS
  socket.emit("message", "Welcome!");
  //sending a broadcast msg to all clients (except d current user dt performed d event), args (default eventName@line31, msg/data to send)//
  socket.broadcast.emit("message", "A new user has joined!");

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
    io.emit("message", clientData);
    //additional msg for acknowledgement
    callback("Delivered");
  });

  //RECEIVING GEO-LOCATION FROM CLIENT & SENDING BACK ACKNOWLEDGEMENT TO CLIENT
  socket.on("sendLocation", (position, callback) => {
    //sharing the location to all connected clients via google map
    io.emit(
      "message",
      `https://google.com/maps?q=${position.latitude},${position.longitude}`
    );
    //sending d acknowledgement
    callback();
  });

  ////sending a broadcast msg to all clients when a user disconnects (all users except the disconnected user)////
  socket.on("disconnect", () => {
    //sending d msgs to all connected clients
    io.emit("message", "A user has left!");
  });
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

/*Now running the app and clicking the share location button : -
 Welcome!
A user has left!
A new user has joined!
https://google.com/maps?q=6.5243793,3.3792057
Location Shared*/
