/*GOAL : - We will add a new feature to the chat application which will allow user to share their exact location with one another.

To get the user's current location, we will be running some code inside client side js file using the browser geo-location api. That gives a way to fetch d location (Longitude & Latitude) for a given user assuming they want to share their location. This will be shared with the server and server in turn share it with all connected clients.

The browser geo-location api we will be using is known as "MDN Geolocation" >>> Search for this on google to check the docs.

1-  We move to index.html to create a new button that shares the location when clicked*/

/*ACTIVATING THE GEO-LOCATION API FROM THE BROWSER*/
/*INDEX.HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Chat App</title>
  </head>
  <body>
    <h1>Chat App</h1>
    <form id="message-form">
      <input name="message" placeholder="Message" />
      <button>Send</button>
    </form>
    <button id="send-location">Send location</button>

    <!--The client side version of socket.io library-->
    <script src="/socket.io/socket.io.js"></script>
    <script src="js/chat.js"></script>
  </body>
</html>
*/

//CHAT.JS CLIENT
//The socket variable here allows sending and receiving event from client --> server and vice versa

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
    //3-  Sending event with the input value to the server
    socket.emit("sendMessage", clientData);
  });

//selecting the send-location by id
document.querySelector("#send-location").addEventListener("click", () => {
  //checking support for the geo-location in d browser, if d browser does not support d geo-location, we send an alert
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  //Getting the current location
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
  });
});

/*Now if we go back to the browser and click on the Send location button, we get a modal telling us dt localhost:3000 want to know our location click "Allow" >>> Click Allow and in the console, we get our position object : -
Position {coords: Coordinates, timestamp: 1568608794873}
coords: Coordinates
accuracy: 510314
altitude: null
altitudeAccuracy: null
heading: null
latitude: 6.5243793
longitude: 3.3792057
speed: null
__proto__: Coordinates
timestamp: 1568608794873

From all this properties, all we need is the lat & long*/

/*CHALLENGE : - Share coordinates with other users
1-  Have client emit "sendLocation" with an object as the data
        Object should contain latitude and longitude properties
2-  Server should listen for "sendLocation"
        When fired, send a "message" to all connected clients "Location: long, lat"
3-  Test your work*/

///CHAT.JS CLIENT
//The socket variable here allows sending and receiving event from client --> server and vice versa

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
    //3-  Sending event with the input value to the server
    socket.emit("sendMessage", clientData);
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

  //4-  Receiving event with d input value from client
  socket.on("sendMessage", clientData => {
    //5-  sending the received input value to all connected users
    io.emit("message", clientData);
  });

  //RECEIVING GEO-LOCATION FROM CLIENT & SHARING IT REAL TIME 2 ALL CLIENTS
  socket.on("sendLocation", position => {
    io.emit("message", `Location: ${position.latitude}, ${position.longitude}`);
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

///SHARING THE LOCATION WITH GOOGLE MAP LINK INSTEAD OF LAT/LONG : - To get this done, we use the link https://google.com/maps?q=lat,long

///INDEX.JS
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

  //4-  Receiving event with d input value from client
  socket.on("sendMessage", clientData => {
    //5-  sending the received input value to all connected users
    io.emit("message", clientData);
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

/*Now if we send the location again, we now get a google map link https://google.com/maps?q=6.5243793,3.3792057 and clicking on it takes us to our exact location in the world*/
