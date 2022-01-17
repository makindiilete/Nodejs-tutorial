/*GOAL : - Taking the functions we created in the last lesson and actually integrating them in index.js*/

//USERS.JS
//tracking our users
//addUser : -  Allowing us to track a new user
// removeUser : - Stop tracking a user when they leave/ close their chat tab
// getUser : - Allow us to fetch existing user's data
// getUsersInRoom : - Fetch all users in a specific room (ds will allow us render their list to the sidebar)
const users = [];

//ADD USER FUNCTION
const addUser = ({ id, username, room }) => {
  //Clean the data by removing space and coverting dem to lowercas
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  //Validate if the username & room exist
  if (!username || !room) {
    return {
      error: "Username and room are required"
    };
  }
  //Check for existing user to avoid duplicate username
  const existingUser = users.find(user => {
    return user.room === room && user.username === username;
  });
  //Validation to run if there is an existing user in a room
  if (existingUser) {
    return {
      error: "Username is in use!"
    };
  }
  //When a user pass all validations and ready to be stored
  const user = { id, username, room };
  //pushing the new user to d user list
  users.push(user);
  //returning the user
  return { user };
};

//REMOVE USER FUNCTION
const removeUser = id => {
  //if the id passed match the id of a user. findIndex() returns -1 if no match is found and return >= 0 if a match is found
  const index = users.findIndex(user => user.id === id);
  //if a match is found
  if (index !== -1) {
    //we remove the user from the users area. This return an array of all the removed items so we pick the first one using the "[0]"
    return users.splice(index, 1)[0];
  }
};

//GET USER
const getUser = id => {
  const user = users.find(user => user.id === id);
  if (user) {
    return { user };
  }
};

//GET ALL USERS IN ROOM
const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  const usersArray = users.filter(user => user.room === room);
  if (usersArray) {
    return usersArray;
  }
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};

//CHAT.JS
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
//2 args : (location.search = gives us access to d querystring, 2nd arg help removes d question mark in front of our queryString
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

//Sending an event with the username & room to the server, acknowledgement option for the error
socket.emit("join", { username, room }, error => {
  if (error) {
    alert(error);
    //redirecting them to homepage
    location.href = "/";
  }
});

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
    socket.emit("message", generateMessage("Welcome!"));
    //sending a broadcast msg to only a specific room the user joined
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(`${user.username} has joined!`));
    callback();
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

  //REMOVE USER
  socket.on("disconnect", () => {
    //calling the removeUser() from user.js when a user that joins the room successfully now leaves the room
    const user = removeUser(socket.id);
    //if we have such user
    if (user) {
      //sending d msgs to only users in the room the user joins
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.username} has left!`)
      );
    }
  });
});

//Starting up the server with "server.listen" instead of "app.listen".
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
