/*GOAL : - It will be up to you to add timestamp to our location messages.
 *
 * CHALLENGE : - Add timestamps for location messages
 * 1-  Create generateLocationMessage and export
 *       {url: "", createdAt:0}
 * 2-   Use generateLocationMessage when server emits locationMessage
 * 3-   Update template to render time for the url
 * 4-   Compile the template with the URL and the formatted time
 * 5-   Test your work*/

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
    <div id="messages"></div>
    <form id="message-form">
      <input name="message" placeholder="Message" />
      <button>Send</button>
    </form>
    <button id="send-location">Send location</button>
    <!--Setting our template for chat messages-->
    <script id="message-template" type="text/html">
      <div>
              <p>{{createdAt}} - {{chatMessage}} </p>
      </div>
    </script>
    <!--Setting our template for location messages-->
    <script id="location-template" type="text/html">
      <div>
              <p> {{createdAt}} - <a href="{{locationUrl}}" target="_blank">My Current Location</a> </p>
      </div>
    </script>

    <!--for mustache dynamic templating-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
    <!--ds enable us track d time msgs was sent-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
    <!--ds enable us send query string-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>
    <!--The client side version of socket.io library-->
    <script src="/socket.io/socket.io.js"></script>
    <script src="js/chat.js"></script>
  </body>
</html>
*/

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

  //1-  SENDING WELCOME MESSAGE TO ALL CLIENTS
  socket.emit("message", generateMessage("Welcome!"));
  //sending a broadcast msg to all clients (except d current user dt performed d event), args (default eventName@line31, msg/data to send)//
  socket.broadcast.emit("message", generateMessage("A new user has joined!"));

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

//MESSAGES.JS
//this function is for our chat msgs
const generateMessage = text => {
  return {
    text: text,
    createdAt: new Date().getTime()
  };
};
//ds function is for our location msg
const generateLocationMessage = text => {
  return {
    text: text,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
