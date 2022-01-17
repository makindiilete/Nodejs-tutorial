/*Goal : - Learning how to broadcast our socketio events.
This will lead us to two practical features in our app : -
1) When a new user joins, other connected users will have a little message showing up saying "A new user has entered the chat  room"
2)  When a user leaves, other connected users will have a little message showing up saying "A new user has left the chat room"
So as things occurs like joining and leaving, the event is broadcast to all users excluding the user that joins or left*/

/*BROADCASTING EVENT WHEN A USER JOINS*/
//INDEX.JS SERVER
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
  ////sending a broadcast msg to all clients (except d current user dt performed d event), args (default eventName@line31, msg/data to send)////
  socket.broadcast.emit("message", "A new user has joined!");

  //4-  Receiving event with d input value from client
  socket.on("sendMessage", clientData => {
    //5-  sending the received input value to all connected users
    io.emit("message", clientData);
  });
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
/*Now when we open a new window and navigate to localhost:3000, we get the message "A new user has joined!"*/

//BROADCASTING EVENT WHEN A USER LEAVES (close their browser tab)
//INDEX.JS SERVER
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

/*Now when we close our tab in a different window, we get the message "A user has left!" in the console of the connected window*/
