/*In this lesson, we will be making our form & buttons a little more helpful to our users e.g.
1-  If we type a message in and click send, the message get sent but the form is not cleared & we are not refocused on the input i.e. We want our form to be cleared when we send a message and our cursor back inside the input field.
2-  With the send location button, we want to disable the button after user click to send a location and only enable it back after the location has been fetched and sent so the user does not send another while one is still processing.*/

//CHAT.JS CLIENT
const socket = io();

//HTML ELEMENTS ($ before variable tells user dey are html elements)
//form
const $messageForm = document.querySelector("#message-form");
//input
const $messageFormInput = $messageForm.querySelector("input");
//submit button
const $messageFormButton = $messageForm.querySelector("button");
//2-  receiving welcome from server
socket.on("message", message => {
  console.log(message);
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
document.querySelector("#send-location").addEventListener("click", () => {
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
  });
});

/*CHALLENGE : - Disable the send location button while location being sent
 * 1-  Setup a selector at the top of the file
 * 2-  Disable the button just before getting the current position
 * 3-  Enable the button in the acknowledgement callback
 * 4-  Test your work*/
//CHAT.JS CLIENT
const socket = io();

//HTML ELEMENTS ($ before variable tells user dey are html elements)
//form
const $messageForm = document.querySelector("#message-form");
//input
const $messageFormInput = $messageForm.querySelector("input");
//submit button
const $messageFormButton = $messageForm.querySelector("button");
//location button
const $sendMessageButton = document.querySelector("#send-location");
//2-  receiving welcome from server
socket.on("message", message => {
  console.log(message);
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
