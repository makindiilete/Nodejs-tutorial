/*GOAL : - How to use socketio to transfer data the server and the client in realtime....
Together, we will work on a side project and not what is necessary for the chat app, instead we will create a little counter app which we will talk about in a couple of moment, once we know how to use socket.io, in the next lesson, it will be your challenge to start creating the code necessary for the chat app.

///CHAT APP
The server will store a single number called "count" and it will share the count with all connected clients. The client will render that count in the browser and it will also show the user a button they can click to increment the count. Once the server has the incremented count, it will share the new count with all connected clients and they will all have their data updated.

So we start by seeing how to share data from server to client
*/

//SERVER --> CLIENT COMMUNICATION : - All we want to achieve is for the client to know that the server talked to client

//INDEX.JS (SERVER)
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

let count = 0;

//listening to event (event = connection to server from client)...This function runs a number of clients for the total number of client connected
//2 args : - event name, callbackfn to run when the event occurs
//the callbackfn takes a param "socket" which is an object containing info about the event name "connection".
io.on("connection", socket => {
  console.log("New Websocket connection");

  //sending event to the client that just opened the connection
  socket.emit("countUpdated");
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//CHAT.JS (CLIENT)
//The socket variable here allows sending and receiving event from client --> server and vice versa

const socket = io();

//receiving event the server is sending to us the client
//socket.on listens to event just like io.on() does on d server side and it takes the name of the event we are trying to receive and the callbackfn to run when the event is received
socket.on("countUpdated", () => {
  console.log("The count has been updated");
});

/*
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
    <!--The client side version of socket.io library.-->
    <script src="/socket.io/socket.io.js"></script>
    <script src="js/chat.js"></script>
  </body>
</html>

*/

///SERVER --> CLIENT COMMUNICATION ; - Now that we know how the server can turn to the client, we can now try to send data like the "count" value from the server to the client.

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

let count = 0;

//listening to event (event = connection to server from client)...This function runs a number of clients for the total number of client connected
//2 args : - event name, callbackfn to run when the event occurs
//the callbackfn takes a param "socket" which is an object containing info about the event name "connection".
io.on("connection", socket => {
  console.log("New Websocket connection");

  //sending the "count" event to the client that just opened the connection, we provide the data we want to send a the second arg "count"
  socket.emit("countUpdated", count);
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//CHAT.JS CLIENT
//The socket variable here allows sending and receiving event from client --> server and vice versa

const socket = io();

//receiving the "count" event the server is sending to us the client
//Here we use the data sent from server "count" as the parameter for our client side js function (The name can be any string)
socket.on("countUpdated", count => {
  //We printing a msg when server connects to client and we receive "count" data and prints its value from d server to the client console.
  console.log("The count has been updated", count);
});

/*CLIENT --> SERVER COMMUNICATION : - We want the client to click a button and increment the value of the count inside the server script.

//SENDING : - socket.emit OR io.emit (io.emit should be used when we want the event to be sent to all connected clients realtime)
//RECEIVING : - socket.on
*/

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

let count = 0;

//io.on() : - Function to run when a user is connected
//2 args : - event name, callbackfn to run when the event occurs
//the callbackfn takes a param "socket" which is an object containing info about the event name "connection".
io.on("connection", socket => {
  console.log("New Websocket connection");

  //sending event to the client (no need to use "io.emit" here bcos the count has not been updated @ ds stage)
  //socket.emit(eventName1, data)
  socket.emit("countUpdated", count);

  //receiving event from the client
  //socket.on(eventName2, callbackfn(io.emit(eventName1, data))
  socket.on("increment", () => {
    //incrementing the count value
    count++;
    //sending back the updated count to all clients
    io.emit("countUpdated", count);
  });
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//CHAT.JS CLIENT
//The socket variable here allows sending and receiving event from client --> server and vice versa

const socket = io();

//receiving event from the server
//socket.on(eventName, callbackfn(data_frm_server)
socket.on("countUpdated", count => {
  //We printing a msg when server connects to client and we receive "count" data and prints its value from d server to the client console.
  console.log("The count has been updated", count);
});

//selecting the button from the html
document
  .querySelector("#increment")
  //adding event listening to d button
  .addEventListener("click", () => {
    console.log("Clicked");
    //sending event to the server
    //socket.emit(eventName)
    socket.emit("increment");
  });

/*
//INDEX.HTML
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
    <button id="increment">+1</button>
    <!--The client side version of socket.io library.-->
    <script src="/socket.io/socket.io.js"></script>
    <script src="js/chat.js"></script>
  </body>
</html>
*/
