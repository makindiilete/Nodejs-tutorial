/*GOAL : - Setting up websocket support for our server.
To get that done, we will be using the very popular socket.io library which provides everything we need to start working with websocket in nodejs server and also provides us with what we need to use in the client side to also communicate with that server.

TO LEARN MORE, https://socket.io  >>> On the navbar >>> Click on "Learn".

1-  Install the library with "npm i socket.io@2.2.0"
2-  Restart your server

Now to setup our app to use socket.io, we will need to do some code refactoring because we cannot start the socket.io sever with the express app using the same way we are starting our server now.

//The code we are about to write will not change the behavior of our app but just a different way of configuring express.//

3-  After the code refactoring, we can now load in our socket.io and create a new instance of socket.io
4-  We create socketio instance by creating the variable "io" whose value is "socketio()" function and it takes the server as argument. It expects a raw server created with http and this was why we had to do the refactoring because even though express creates the server for us behind the scene, we do not have access to it to pass to the socketio function.
5-  Now we can configure index.js further to work with the client that connects to it e.g Print a message to the terminal when a client connects
*/

//SOCKET.IO SETUP CONFIG
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

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//LISTENING TO CONNECTION EVENT FROM THE CLIENT SIDE AND RUNNING A FUNCTION WHEN THE EVENT OCCURS
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

//listening to event (event = connection to server from client)
//2 args : - event name, callbackfn to run when the event occurs
io.on("connection", () => {
  console.log("New Websocket connection");
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

/*Now if we try to refresh the browser again and see if we get the New connection message in the console, we got nothing even though the client is connected to the server as an event. To fix this, we need to load in the client side of the socket.io library.
We already have socket.io activated on the server side, we also needs it activated on the client side.
When we setup socket.io with a given server "const io = socketio(server)", it also setup a file to be served up that client can access and that is what we need to do.
1-      So inside our html, we setup a new script tag. The script we are trying to create is not the one we have created before now, it is a script we have access to use because we already setup socketio on the server.
2-        <!--The client side version of socket.io library, when we load ds in, the client side javascript code will have access to all the stuff from the library it needs in other to setup the communication, so the next thing we need is create our own client side JS file, load that in and use what is provided by the socketio script-->
3-        Create a new folder in the public dir "js"
4-        In the "js" dir, create a new file "chat.js" and inside here we will write some code in a few minutes to actually connect to the server using websocket.
5-        Now that we have our client side "chat.js", we will write a second script tag to load it in the html.
6-        Because we have loaded in the socketio script, our chat.js file now has access to some stuffs that otherwise would not have had access to e.g. a function called "io()"
7-        Now if we refresh the browser, we get the connection message we specified in the backend file "New WebSocket connection" and this means our server and client bi-directional connection now works.
8-        Now our realtime communication has been facilitated and that is what we will start to do in the next lesson.*/

///INDEX.JS (BACKEND)
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

//listening to event (event = connection to server from client)
//2 args : - event name, callbackfn to run when the event occurs
io.on("connection", () => {
  console.log("New Websocket connection");
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

/*
////INDEX.HTML
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

////CHAT.JS (CLIENT SIDE JS)
//This is the function this file now has access to because we loaded in the socketio script in our template :
// <script src="/socket.io/socket.io.js"></script>
io();
