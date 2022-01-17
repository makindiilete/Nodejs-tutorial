/*CHALLENGE : - Send a welcome message to new users
 * 1-  Have server emit "message" when new client connects
 *       Send "Welcome!" as the event data.
 * 2-  Have client listen for "message" event and print to console
 * 3-  Test your work*/

//////INDEX.JS SERVER
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

//We using "io.on" here so we are receiving an event from every connected clients
io.on("connection", socket => {
  //msg to display when a user connects
  console.log("New Websocket connection");

  //(event-name, message to send to client)
  socket.emit("message", "Welcome");
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

////CHAT.JS
//The socket variable here allows sending and receiving event from client --> server and vice versa.....

const socket = io();

socket.on("message", message => {
  console.log(message);
});

/*Now the next thing we want to do is have an input field where user can type and after clicking a button, the text will be sent to the server, then the server can relate that message to all connected client...

CHALLENGE : - Allow clients to send messages
1-  Create a form with an input and button
        Similar to the weather form
2-  Setup event listener for form submission
        Emit "sendMessage" with input string as message data
3-  Have server listen for "sendMessage"
        Send message to all connected clients
4-  Test your work!*/

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
  socket.emit("message", "Welcome");

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

//INDEX.HTML
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
    <form id="message-form">
      <input name="message" placeholder="Message" />
      <button>Send</button>
    </form>

    <!--The client side version of socket.io library-->
    <script src="/socket.io/socket.io.js"></script>
    <script src="js/chat.js"></script>
  </body>
</html>

*/
