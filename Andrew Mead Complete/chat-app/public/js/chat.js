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
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

//IMPLEMENTING AUTO-SCROLL
const autoscroll = () => {
  //New message element(grabbing the last msg on d screen)
  const $newMessage = $messages.lastElementChild;
  //trying to gt the margin button set for d new msg
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  //Getting d height of the new msg and adding the margin bottom value
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  //visible height : the height visible to user
  const visibleHeight = $messages.offsetHeight;
  //Height of messages container : -  height of all msgs sent including the invisible
  const containerHeight = $messages.scrollHeight;
  //checking hwfr have i scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  //if we are the bottom before last msg was added
  if (containerHeight - newMessageHeight <= scrollOffset) {
    //we push user to the bottom
    $messages.scrollTop = $messages.scrollHeight;
  }
};

//2-  receiving welcome from server
//eventname, generateMessage{}
socket.on("message", message => {
  console.log(message);
  ///rendering the html chat template message
  //2 args : - (id of script containing dynamic msg in html file, an object with key(d dynamic html name) & value = the message receives from server @ line 19
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    //extracting the text property from d message object
    chatMessage: message.text,
    //extracting the timestamp property from the message object & formatting the display with moment library loaded in index.html. (h:mm a = ds r formats for regular chat time on popular apps like 12:32 pm)...U can check d various format on moment docs
    createdAt: moment(message.createdAt).format("h:mm a")
  });
  //inserting d html msgs inside the container
  $messages.insertAdjacentHTML("beforeend", html);
  //calling autoscroll after chat msgs
  autoscroll();
});

//Here we listen to the "locationMessage" event from d server and dump it to d console. the parameter url is now an object containing text & createdAt property
socket.on("locationMessage", locationMessage => {
  console.log(locationMessage);
  //LOCATION TEMPLATE RENDERED TO D BROWSER WINDOW
  const html = Mustache.render(locationTemplate, {
    username: locationMessage.username,
    locationUrl: locationMessage.url,
    createdAt: moment(locationMessage.createdAt).format("h:mm a")
  });
  //inserting d html msgs inside the container
  $messages.insertAdjacentHTML("beforeend", html);
  //calling autoscroll after location msgs
  autoscroll();
});

//Listening to the roomData event
socket.on("roomData", ({ room, users }) => {
  //SIDEBAR TEMPLATE RENDERED TO D BROWSER WINDOW
  const html = Mustache.render(sidebarTemplate, {
    room: room,
    users: users
  });
  //populating the empty div with the object
  document.querySelector("#sidebar").innerHTML = html;
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
