/*The goal of this lesson is to take the messages that are printing to the console and have them getting printed below the form in the browser.
If things go wrong, we will show the error and if things go well, we will show the location and the forecast.

The first thing we need to do is to create a space in the html document to place these messages and to do that we will create two new paragraphs in index.html.

If things go wrong, the first paragraph will contain the error message and the second paragraph will be empty.
If things goes well, the first paragraph will contain the location and the second will contain the actual forecast.
Next we need to target the two paragraphs inside app.js with "document.querySelector"*/

//app.js

console.log("Client side javascript file is loaded!");

//We select the form html element
const weatherForm = document.querySelector("form");
//select the user input
const search = document.querySelector("input");
//select the paragraph with id of "message-1"
const messageOne = document.querySelector("#message-1");
//select the paragraph with id of "message-2"
const messageTwo = document.querySelector("#message-2");

//The code to run when the form is submitted
//Here we add an event listener function which takes 2 args : - the type of event and callbackfn to run every time the event occurs
weatherForm.addEventListener("submit", e => {
  //  this prevents the browser from refreshing
  e.preventDefault();
  //getting the value of what user type in the input element
  const location = search.value;
  //This will show a loading message when user clicks the button while waiting for the async operation to complete
  messageOne.textContent = "Loading....";
  //We need to clear the content of the 2nd paragraph anytime we are waiting for an async operation response and we showing the Loading....
  messageTwo.textContent = "";
  //  FETCHING WEATHER
  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      //  If we have an error, we print it from the "error" property inside "data" object
      if (data.error) {
        messageOne.textContent = data.error;
      }
      //If all goes well, we print location and forecast from the data object in the 1st & 2nd paragraph
      else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
