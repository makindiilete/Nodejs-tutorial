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
//loading in user.js functions
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./utils/users");

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

  ////ADD USER
  socket.on("join", ({ username, room }, callback) => {
    //we declare an object variable dt takes our addUser() function... The object contains error & user bcos joining can return an error or the user details
    const { error, user } = addUser({
      id: socket.id,
      username: username,
      room: room
    });
    //if the user cud not join bcos of wrong info
    if (error) {
      //we call our acknowledgement option and pass in the error
      return callback(error);
    }
    //ds allows us to join a particular room
    socket.join(user.room);

    //1-  SENDING WELCOME MESSAGE TO A SPECIFIC ROOM
    socket.emit("message", generateMessage("Admin", "Welcome!"));
    //sending a broadcast msg to only a specific room the user joined
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("Admin", `${user.username} has joined!`)
      );
    ////When user joins, we emit event to the clients with the updated user's list and room name
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
    callback();
  });

  //4-  Receiving event with d input value from client & sending back acknowledgement to the client
  socket.on("sendMessage", (clientData, callback) => {
    //getting user by their id
    const user = getUser(socket.id);
    //init bad-words
    const filter = new Filter();
    //we checking the msg sent from client if it contains foul words
    if (filter.isProfane(clientData)) {
      return callback("Profanity is not allowed");
    }
    //We only send the msg if profanity is not in the message
    //5-  sending the received input value to only users in Lagos room
    io.to(user.room).emit(
      "message",
      generateMessage(user.username, clientData)
    );
    //additional msg for acknowledgement
    callback();
  });

  //RECEIVING GEO-LOCATION FROM CLIENT & SENDING BACK ACKNOWLEDGEMENT TO CLIENT
  socket.on("sendLocation", (position, callback) => {
    const user = getUser(socket.id);
    //So far we have been sending & receiving events btw server & client under one event name which is "message", we changed the event name of the location sharing here from "message" to "locationMessage" in order to remove it from other events that are already using mustache template and displaying in the browser.....
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${position.latitude},${position.longitude}`
      )
    );
    //sending d acknowledgement
    callback();
  });

  //REMOVE USER
  socket.on("disconnect", () => {
    //calling the removeUser() from user.js when a user that joins the room successfully now leaves the room
    const user = removeUser(socket.id);
    //if we have such user
    if (user) {
      //sending d msgs to only users in the room the user joins
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left!`)
      );
      //When user disconnects, we emit event to the clients with the updated user's list and room name
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
