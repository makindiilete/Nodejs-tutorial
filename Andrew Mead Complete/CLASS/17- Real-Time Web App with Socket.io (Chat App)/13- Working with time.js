/*GOAL : - How to integrate time into the chat app.
So along with every single message that shows up in the browser, we also see the time that which it was sent.
1-  Figuring how to generate timestamps
2-  How to transfer them between client & server
3-  How to format them in a useful way for the users of our chat app.

HOW TO GENERATE TIMESTAMPS
We can do that using JS built-in functionality
const now = new Date()
undefined
now.toString
ƒ toString() { [native code] }
now.toString()
"Mon Sep 16 2019 11:56:22 GMT+0100 (West Africa Standard Time)"
now.getDate()
16
now.getTime()
1568631382354 //This is a timestamp which is the number of ms from 1970, very good for using on the server bcos its just a number....

HOW TO GENERATE TIME STAMP ON THE SERVER
We will be using the same code we have used in the browser console to generate timestamp on the server and this will be attached to every message the server sends to the clients. The clients will receive the msg and will be able to use the msg text and the timestamp and we will format it later to make it nicer and more useful to humans

1-  In the scr dir, create a new dir "utils" >>> A new file inside "messages.js". This file contains functions that generates the objects we want to use in our server events
*/
//MESSAGES.JS (UTILS/MESSAGES.JS)
const generateMessage = text => {
  return {
    text: text,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage
};

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
//loading in our utils/messages.js file
const { generateMessage } = require("./utils/messages");

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
      `https://google.com/maps?q=${position.latitude},${position.longitude}`
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
    //extracting the timestamp property from the message object
    createdAt: message.createdAt
  });
  //inserting d html msgs inside the container
  $messages.insertAdjacentHTML("beforeend", html);
});

//Here we listen to the "locationMessage" event from d server and dump it to d console.
socket.on("locationMessage", url => {
  console.log(url);
  //LOCATION TEMPLATE RENDERED TO D BROWSER WINDOW
  const html = Mustache.render(locationTemplate, {
    locationUrl: url
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
              <p>  <a href="{{locationUrl}}" target="_blank">My Current Location</a> </p>
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

/*Now if we save and refresh the browser, we get our timestamp placed infront of every messages like this : -

 1568632846084 - Welcome!

1568632857430 - This is a test

1568632982751 - Welcome!

1568632982761 - A new user has joined!

This is not really useful now as this is not how we want the data format to be displayed....
To correct this, we will use the npm moment library.


TO LEARN HOW TO USE THE LIBRARY, HEAD OVER TO https://momentjs.come/docs
There are alot of things you can do with it and alot of options we get but out of all, we are going to focus on "Display". We want to use moment to display time in a way that is useful for our app*/

//FORMATTING JS TIMESTAMP WITH MOMENT
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

//Here we listen to the "locationMessage" event from d server and dump it to d console.
socket.on("locationMessage", url => {
  console.log(url);
  //LOCATION TEMPLATE RENDERED TO D BROWSER WINDOW
  const html = Mustache.render(locationTemplate, {
    locationUrl: url
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
