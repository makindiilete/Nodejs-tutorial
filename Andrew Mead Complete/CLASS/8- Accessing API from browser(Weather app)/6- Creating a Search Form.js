/*We will be creating a form that shows up on the homepage which will give users an input for them to type in an address and click on a button for the forecast info to show up after been fetch.*/

//index.hbs
/*<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Home</title>
    <!--webstorm says it cannot resolve this but it is okay since we already set our file path to "../public" inside app.js so we do not need to append it to the link again bcos if we do, webstorm will see the file but it wont be accessible in the browser-->
    <link rel="stylesheet" href="/css/styles.css" />
    <!--favicon for our title page-->
    <link rel="icon" href="/img/weather.png" />
    <script src="/js/app.js"></script>
</head>
<body>
<div class="main-content">
<!--Rendering our header partial-->
{{>header}}
    <p>Use this site to get your weather!</p>
    <!--Our form where user type address and click button to get forecast-->
    <form>
        <input type="text" placeholder="Location">
        <button>Search</button>
    </form>
</div>
<!--Rendering our footer partial-->
{{>footer}}
</body>
</html>


Now that we have the form displayed in the browser, the next thing we need to do is : -
1-  Go back to app.js (client side)
2- Select the element we want to work with "document.querySelector("")
3-  Add an event listener to run a callbackfn when the form is submitted
4-  Move the linked js script in the html down to the body*/

//We select the form html element
const weatherForm = document.querySelector("form");
//The code to run when the form is submitted
//Here we add an event listener function which takes 2 args : - the type of event and callbackfn to run every time the event occurs
weatherForm.addEventListener("submit", () => {
  console.log("testing!");
});
/*index.hbs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Home</title>
    <!--webstorm says it cannot resolve this but it is okay since we already set our file path to "../public" inside app.js so we do not need to append it to the link again bcos if we do, webstorm will see the file but it wont be accessible in the browser-->
    <link rel="stylesheet" href="/css/styles.css" />
    <!--favicon for our title page-->
    <link rel="icon" href="/img/weather.png" />
</head>
<body>
<div class="main-content">
<!--Rendering our header partial-->
{{>header}}
    <p>Use this site to get your weather!</p>
    <!--Our form where user type address and click button to get forecast-->
    <form>
        <input type="text" placeholder="Location">
        <button>Search</button>
    </form>
</div>
<!--Rendering our footer partial-->
{{>footer}}
    <script src="/js/app.js"></script>
</body>
</html>

*/

/*Now if we run the app and click on the submit button. we get the "testing" message and it flashes and goes away because the browser refreshes immediately. This is the default behavior but we do not want this, we instead want to print our weather forecast and without refreshing the browser*/

/*PREVENTING THE BROWSER DEFAULT REFRESH BEHAVIOR*/
//We select the form html element
const weatherForm = document.querySelector("form");
//The code to run when the form is submitted
//Here we add an event listener function which takes 2 args : - the type of event and callbackfn to run every time the event occurs
weatherForm.addEventListener("submit", e => {
  //  this prevents the browser from refreshing
  e.preventDefault();
  console.log("testing!");
});

/*Now if we refresh the browser and click on the button again, we now see our "testing message printed and the browser did not refresh*/

/*Getting the value of user input and dumping it in the console*/
//We select the form html element
const weatherForm = document.querySelector("form");
//select the user input
const search = document.querySelector("input");
//The code to run when the form is submitted
//Here we add an event listener function which takes 2 args : - the type of event and callbackfn to run every time the event occurs
weatherForm.addEventListener("submit", e => {
  //  this prevents the browser from refreshing
  e.preventDefault();
  //getting the value of what user type in the input element
  const location = search.value;
  //we execute this code when the form is submitted (dumping the user input to the console)
  console.log(location);
});

/*If we run the app a type something in the input field and click submit, we get what we typed.*/

/*CHALLENGE : - Use input value to get weather
1-  Migrate fetch call into the submit callback
2-  Use the search text as the address query string value
3-  Submit the form with a valid and invalid value to test*/

//app.js
console.log("Client side javascript file is loaded!");

//We select the form html element
const weatherForm = document.querySelector("form");
//select the user input
const search = document.querySelector("input");
//The code to run when the form is submitted
//Here we add an event listener function which takes 2 args : - the type of event and callbackfn to run every time the event occurs
weatherForm.addEventListener("submit", e => {
  //  this prevents the browser from refreshing
  e.preventDefault();
  //getting the value of what user type in the input element
  const location = search.value;
  //  FETCHING WEATHER
  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      //  If we have an error, we print it from the "error" property inside "data" object
      if (data.error) {
        console.log(data.error);
      }
      //If all goes well, we print location and forecast from the data object
      else {
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});

/*
Running the app with no input : -
You must provide an address

Running the app : - We type "Ibadan" in the input box and click on submit

 Ibadan
Ibadan North, Oyo, Nigeria
Light rain until morning, starting again in the evening. It is currently 70.7. There is a 0.5% chance of rain

Running the app : - We type ! in the search box to test for invalid location
!
Unable to find location. Try another search.

Running the app without internet : -
Unable to connect to location services!*/
